import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateSafeFileName } from '@/lib/validations/file'

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const registrationId = formData.get('registrationId') as string
        const documentType = formData.get('documentType') as string

        if (!file || !registrationId || !documentType) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const supabase = await createClient()

        // Generate safe filename
        const safeFileName = generateSafeFileName(registrationId, documentType, file.name)

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('documents')
            .upload(`${registrationId}/${safeFileName}`, file, {
                contentType: file.type,
                upsert: false,
            })

        if (uploadError) {
            console.error('Upload error:', uploadError)
            return NextResponse.json(
                { error: 'Gagal upload file' },
                { status: 500 }
            )
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('documents')
            .getPublicUrl(uploadData.path)

        // Save document metadata to database
        const { error: dbError } = await supabase
            .from('documents')
            .insert({
                registration_id: registrationId,
                document_type: documentType,
                file_path: uploadData.path,
                file_name: file.name,
                file_size: file.size,
            })

        if (dbError) {
            console.error('Database error:', dbError)
            // Clean up uploaded file
            await supabase.storage.from('documents').remove([uploadData.path])
            return NextResponse.json(
                { error: 'Gagal menyimpan metadata dokumen' },
                { status: 500 }
            )
        }

        return NextResponse.json({
            success: true,
            url: publicUrl,
            path: uploadData.path,
        })
    } catch (error) {
        console.error('Unexpected error:', error)
        return NextResponse.json(
            { error: 'Terjadi kesalahan server' },
            { status: 500 }
        )
    }
}
