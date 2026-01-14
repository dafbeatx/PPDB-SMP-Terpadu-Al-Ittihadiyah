import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

// Force Node.js runtime (not Edge)
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    try {
        console.log('[UPLOAD] Starting logo upload...')

        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            console.log('[UPLOAD] No file provided')
            return NextResponse.json({ error: 'No file provided' }, { status: 400 })
        }

        console.log('[UPLOAD] File received:', {
            name: file.name,
            type: file.type,
            size: file.size
        })

        const supabase = await createClient()

        // Check auth
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError) {
            console.error('[UPLOAD] Auth error:', authError)
            return NextResponse.json({ error: 'Authentication failed' }, { status: 401 })
        }

        if (!user) {
            console.log('[UPLOAD] No user found')
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        console.log('[UPLOAD] User authenticated:', user.email)

        // Convert file to buffer
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        console.log('[UPLOAD] File converted to buffer, size:', buffer.length)

        // Generate unique filename
        const fileExt = file.name.split('.').pop() || 'png'
        const fileName = `logo-${Date.now()}.${fileExt}`

        // Ensure public directory exists
        const publicDir = path.join(process.cwd(), 'public')
        if (!existsSync(publicDir)) {
            console.log('[UPLOAD] Creating public directory...')
            await mkdir(publicDir, { recursive: true })
        }

        // Save to public folder
        const publicPath = path.join(publicDir, fileName)
        console.log('[UPLOAD] Saving file to:', publicPath)

        await writeFile(publicPath, buffer)
        console.log('[UPLOAD] File saved successfully')

        // Public URL (relative to domain)
        const publicUrl = `/${fileName}`

        // Update logo URL in page_contents
        console.log('[UPLOAD] Updating database...')
        const { error: updateError } = await supabase
            .from('page_contents')
            .update({ value: publicUrl })
            .eq('category', 'branding')
            .eq('key', 'logo_url')

        if (updateError) {
            console.error('[UPLOAD] Database update error:', updateError)
            // Don't fail the upload, logo is already saved
        } else {
            console.log('[UPLOAD] Database updated successfully')
        }

        console.log('[UPLOAD] Upload complete:', publicUrl)
        return NextResponse.json({
            success: true,
            url: publicUrl,
            path: fileName
        })
    } catch (error) {
        console.error('[UPLOAD] Unexpected error:', error)
        console.error('[UPLOAD] Error stack:', error instanceof Error ? error.stack : 'No stack trace')

        return NextResponse.json({
            error: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error',
            type: error instanceof Error ? error.constructor.name : typeof error
        }, { status: 500 })
    }
}
