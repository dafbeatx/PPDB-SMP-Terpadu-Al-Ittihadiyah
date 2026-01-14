import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateSafeFileName } from '@/lib/validations/file'
import sharp from 'sharp'

/**
 * Compress image to reduce file size
 * Quality: 70% (mild compression, save ~30% size)
 */
async function compressImage(file: File): Promise<Buffer> {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Compress with sharp: 70% quality, progressive JPEG
    const compressed = await sharp(buffer)
        .jpeg({
            quality: 70,
            progressive: true,
            mozjpeg: true, // Better compression
        })
        .toBuffer()

    return compressed
}

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

        // Compress image before upload
        console.log(`Original size: ${(file.size / 1024).toFixed(2)} KB`)
        const compressedBuffer = await compressImage(file)
        const compressedSize = compressedBuffer.length
        console.log(`Compressed size: ${(compressedSize / 1024).toFixed(2)} KB`)
        console.log(`Saved: ${(((file.size - compressedSize) / file.size) * 100).toFixed(1)}%`)

        // Generate safe filename
        const safeFileName = generateSafeFileName(registrationId, documentType, file.name)

        // Upload compressed image to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('documents')
            .upload(`${registrationId}/${safeFileName}`, compressedBuffer, {
                contentType: 'image/jpeg',
                upsert: false,
            })

        if (uploadError) {
            console.error('Upload error details:', uploadError)
            return NextResponse.json(
                {
                    error: 'Gagal upload file',
                    details: uploadError.message || JSON.stringify(uploadError)
                },
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
                file_size: compressedSize, // Save compressed size
            })

        if (dbError) {
            console.error('Database error details:', dbError)
            // Clean up uploaded file
            await supabase.storage.from('documents').remove([uploadData.path])
            return NextResponse.json(
                {
                    error: 'Gagal menyimpan metadata dokumen',
                    details: dbError.message
                },
                { status: 500 }
            )
        }

        return NextResponse.json({
            success: true,
            url: publicUrl,
            path: uploadData.path,
            originalSize: file.size,
            compressedSize: compressedSize,
            savedPercentage: (((file.size - compressedSize) / file.size) * 100).toFixed(1),
        })
    } catch (error: any) {
        console.error('Unexpected error in /api/upload:', error)
        return NextResponse.json(
            { error: 'Terjadi kesalahan server', details: error.message },
            { status: 500 }
        )
    }
}
