import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 })
        }

        const supabase = await createClient()

        // Check auth
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Generate unique filename
        const fileExt = file.name.split('.').pop()
        const fileName = `logo-${Date.now()}.${fileExt}`

        // Save to public folder
        const publicPath = path.join(process.cwd(), 'public', fileName)
        await writeFile(publicPath, buffer)

        // Public URL (relative to domain)
        const publicUrl = `/${fileName}`

        // Update logo URL in page_contents
        const { error: updateError } = await supabase
            .from('page_contents')
            .update({ value: publicUrl })
            .eq('category', 'branding')
            .eq('key', 'logo_url')

        if (updateError) {
            console.error('Database update error:', updateError)
            // Don't fail the upload, logo is already saved
        }

        return NextResponse.json({
            success: true,
            url: publicUrl,
            path: fileName
        })
    } catch (error) {
        console.error('Unexpected error:', error)
        return NextResponse.json({
            error: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}
