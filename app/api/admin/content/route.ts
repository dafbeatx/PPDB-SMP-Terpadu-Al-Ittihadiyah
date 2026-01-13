import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const category = searchParams.get('category')

        const supabase = await createClient()

        let query = supabase
            .from('page_contents')
            .select('*')
            .order('display_order', { ascending: true })

        if (category) {
            query = query.eq('category', category)
        }

        const { data, error } = await query

        if (error) {
            console.error('GET error:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ content: data })
    } catch (error) {
        console.error('GET error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const { content } = await request.json()

        if (!content || !Array.isArray(content)) {
            return NextResponse.json({ error: 'Invalid content data' }, { status: 400 })
        }

        const supabase = await createClient()

        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
            console.error('Auth error:', userError)
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Check admin status
        const { data: adminData, error: adminError } = await supabase
            .from('admin_users')
            .select('id, email')
            .eq('email', user.email)
            .single()

        if (adminError || !adminData) {
            console.error('Admin check error:', adminError)
            return NextResponse.json({ error: 'Not an admin' }, { status: 403 })
        }

        // Update each content item individually with error checking
        const results = []
        for (const item of content) {
            const { data, error } = await supabase
                .from('page_contents')
                .update({
                    value: item.value,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', item.id)
                .select()

            if (error) {
                console.error(`Error updating item ${item.id}:`, error)
                results.push({ id: item.id, success: false, error: error.message })
            } else {
                results.push({ id: item.id, success: true })
            }
        }

        // Check if any failed
        const failed = results.filter(r => !r.success)
        if (failed.length > 0) {
            console.error('Some updates failed:', failed)
            return NextResponse.json({
                success: false,
                message: 'Some content items failed to update',
                results
            }, { status: 500 })
        }

        return NextResponse.json({ success: true, results })
    } catch (error) {
        console.error('Unexpected error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
