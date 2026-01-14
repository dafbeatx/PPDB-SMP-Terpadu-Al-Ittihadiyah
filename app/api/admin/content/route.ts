import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

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
    console.log('📝 PUT /api/admin/content - Starting...')

    try {
        const { content } = await request.json()
        console.log('📦 Received content items:', content?.length || 0)

        if (!content || !Array.isArray(content)) {
            console.error('❌ Invalid content data:', content)
            return NextResponse.json({ error: 'Invalid content data' }, { status: 400 })
        }

        const supabase = await createClient()

        // Get current user
        console.log('🔐 Checking authentication...')
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
            console.error('❌ Auth error:', userError)
            return NextResponse.json({
                error: 'Unauthorized',
                details: userError?.message
            }, { status: 401 })
        }

        console.log('✅ User authenticated:', user.email)

        // Check admin status
        console.log('👤 Checking admin status for:', user.email)
        const { data: adminData, error: adminError } = await supabase
            .from('admin_users')
            .select('id, email')
            .eq('email', user.email)
            .single()

        if (adminError || !adminData) {
            console.error('❌ Admin check failed:', adminError)
            return NextResponse.json({
                error: 'Not an admin',
                details: adminError?.message,
                userEmail: user.email
            }, { status: 403 })
        }

        console.log('✅ Admin verified:', adminData.email)

        // Update each content item individually with error checking
        console.log('💾 Starting to update', content.length, 'items...')
        const results = []

        for (const item of content) {
            console.log(`  🔄 Updating item ${item.id} (${item.label})...`)

            const { data, error } = await supabase
                .from('page_contents')
                .update({
                    value: item.value,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', item.id)
                .select()

            if (error) {
                console.error(`  ❌ Error updating item ${item.id}:`, error)
                results.push({
                    id: item.id,
                    label: item.label,
                    success: false,
                    error: error.message,
                    code: error.code,
                    details: error.details
                })
            } else if (!data || data.length === 0) {
                console.warn(`  ⚠️  No rows updated for item ${item.id}`)
                results.push({
                    id: item.id,
                    label: item.label,
                    success: false,
                    error: 'No rows updated - item may not exist or RLS blocked it'
                })
            } else {
                console.log(`  ✅ Successfully updated item ${item.id}`)
                results.push({ id: item.id, label: item.label, success: true })
            }
        }

        // Check if any failed
        const failed = results.filter(r => !r.success)
        const succeeded = results.filter(r => r.success)

        console.log(`📊 Update complete: ${succeeded.length} succeeded, ${failed.length} failed`)

        if (failed.length > 0) {
            console.error('❌ Some updates failed:', failed)
            return NextResponse.json({
                success: false,
                message: `${failed.length} of ${content.length} items failed to update`,
                results,
                failed
            }, { status: 500 })
        }

        console.log('✅ All updates successful!')

        // Revalidate all pages to clear Next.js cache
        console.log('🔄 Revalidating cache for all pages...')
        try {
            revalidatePath('/', 'layout')  // Revalidate entire site including all nested paths
            console.log('✅ Cache revalidated successfully')
        } catch (revalidateError) {
            console.error('⚠️  Cache revalidation warning:', revalidateError)
            // Don't fail the request if revalidation fails
        }

        return NextResponse.json({
            success: true,
            message: `Successfully updated ${succeeded.length} items`,
            results
        })
    } catch (error: any) {
        console.error('💥 Unexpected error:', error)
        return NextResponse.json({
            error: 'Internal server error',
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 })
    }
}
