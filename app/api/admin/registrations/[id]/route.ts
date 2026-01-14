import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { requireAuth } from '@/lib/auth'

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAuth()
        const { id } = await params
        const { status } = await request.json()

        const cookieStore = await cookies()
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll()
                    },
                },
            }
        )

        const { error } = await supabase
            .from('registrations')
            .update({ status })
            .eq('id', id)

        if (error) {
            console.error('Update status error:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Update status unexpected error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAuth()
        const { id } = await params

        const cookieStore = await cookies()
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll()
                    },
                },
            }
        )

        // 1. Get documents to delete from storage as well
        const { data: docs } = await supabase
            .from('documents')
            .select('file_path')
            .eq('registration_id', id)

        if (docs && docs.length > 0) {
            const paths = docs.map(d => d.file_path)
            await supabase.storage.from('documents').remove(paths)
        }

        // 2. Delete registration (cascade will handle students, parents, and docs metadata in DB)
        const { error } = await supabase
            .from('registrations')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('Delete registration error:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Delete registration unexpected error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
