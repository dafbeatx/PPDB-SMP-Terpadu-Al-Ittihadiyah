import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import JSZip from 'jszip'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const supabase = await createClient()

        // 1. Verify admin session
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { data: adminData } = await supabase
            .from('admin_users')
            .select('id')
            .eq('email', user.email)
            .single()

        if (!adminData) {
            return NextResponse.json({ error: 'Not an admin' }, { status: 403 })
        }

        // 2. Fetch registration details (for filename) and document paths
        const { data: reg, error: regError } = await supabase
            .from('registrations')
            .select(`
                registration_number,
                students (full_name),
                documents (file_path, document_type)
            `)
            .eq('id', id)
            .single()

        if (regError || !reg) {
            return NextResponse.json({ error: 'Registration not found' }, { status: 404 })
        }

        if (!reg.documents || reg.documents.length === 0) {
            return NextResponse.json({ error: 'Tidak ada dokumen untuk pendaftar ini' }, { status: 404 })
        }

        // 3. Prepare ZIP
        const zip = new JSZip()
        const studentName = reg.students?.[0]?.full_name || 'TanpaNama'
        const regNum = reg.registration_number

        // Download each file from storage and add to zip
        for (const doc of reg.documents) {
            const { data, error } = await supabase.storage
                .from('documents')
                .download(doc.file_path)

            if (!error && data) {
                const arrayBuffer = await data.arrayBuffer()
                const extension = doc.file_path.split('.').pop() || 'jpg'
                zip.file(`${doc.document_type}.${extension}`, arrayBuffer)
            }
        }

        // 4. Generate ZIP buffer
        const zipBuffer = await zip.generateAsync({ type: 'blob' })
        const zipName = `${studentName.replace(/\s+/g, '_')}-${regNum}.zip`

        return new Response(zipBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': `attachment; filename="${zipName}"`,
            },
        })

    } catch (error: any) {
        console.error('ZIP Error:', error)
        return NextResponse.json({ error: 'Gagal membuat file ZIP', details: error.message }, { status: 500 })
    }
}
