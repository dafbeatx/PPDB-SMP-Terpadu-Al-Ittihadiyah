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
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ content: data })
    } catch (error) {
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
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Get admin ID
        const { data: adminData } = await supabase
            .from('admin_users')
            .select('id')
            .eq('email', user.email)
            .single()

        if (!adminData) {
            return NextResponse.json({ error: 'Not an admin' }, { status: 403 })
        }

        // Update each content item
        const updates = content.map((item) =>
            supabase
                .from('page_contents')
                .update({
                    value: item.value,
                    updated_at: new Date().toISOString(),
                    updated_by: adminData.id,
                })
                .eq('id', item.id)
        )

        await Promise.all(updates)

        // Revalidate the homepage
        // Note: In production, you might want to use Next.js revalidatePath

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error updating content:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
