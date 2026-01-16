import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { requireAuth } from '@/lib/auth'
import { sendStatusUpdateEmail } from '@/lib/mail'

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
            process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
            .update({ status: status as any })
            .eq('id', id)

        if (error) {
            console.error('Update status error detail:', {
                id,
                status,
                error,
                code: error.code,
                message: error.message,
                hint: error.hint
            })
            return NextResponse.json({
                error: 'Gagal memperbarui status di database',
                details: error.message,
                code: error.code
            }, { status: 500 })
        }

        // 3. Send Notification Email if status is accepted or rejected
        if (status === 'accepted' || status === 'rejected') {
            try {
                // Fetch email and student name
                const { data: details } = await supabase
                    .from('registrations')
                    .select(`
                        registration_number,
                        students (full_name),
                        parents (email)
                    `)
                    .eq('id', id)
                    .single()

                const typedDetails = details as any
                if (typedDetails?.parents?.email) {
                    await sendStatusUpdateEmail(
                        typedDetails.parents.email,
                        typedDetails.students.full_name,
                        typedDetails.registration_number,
                        status as 'accepted' | 'rejected'
                    )
                }
            } catch (err) {
                console.error('Failed to send status update email:', err)
                // We don't return error because status was already updated in DB
            }
        }

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Update status unexpected error:', error)
        return NextResponse.json({
            error: 'Terjadi kesalahan sistem',
            details: error.message
        }, { status: 500 })
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
