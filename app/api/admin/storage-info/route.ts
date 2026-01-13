import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
    try {
        const supabase = await createClient()

        // Verify admin
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
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

        // Get all documents metadata
        const { data: documents, error: docsError } = await supabase
            .from('documents')
            .select('file_size, uploaded_at')

        if (docsError) {
            console.error('Error fetching documents:', docsError)
            return NextResponse.json({ error: 'Failed to fetch storage info' }, { status: 500 })
        }

        // Calculate total size
        const totalBytes = documents.reduce((sum, doc) => sum + (doc.file_size || 0), 0)
        const totalMB = totalBytes / (1024 * 1024)
        const totalGB = totalMB / 1024

        // Storage limits (Supabase free tier: 1GB)
        const limitGB = 1
        const limitMB = limitGB * 1024
        const usagePercentage = (totalMB / limitMB) * 100

        // Determine status
        let status: 'healthy' | 'warning' | 'critical'
        let message: string

        if (usagePercentage < 80) {
            status = 'healthy'
            message = 'Storage sehat'
        } else if (usagePercentage < 95) {
            status = 'warning'
            message = 'Storage hampir penuh! Backup data sekarang.'
        } else {
            status = 'critical'
            message = 'Storage hampir penuh! Segera backup dan cleanup.'
        }

        // Count old files (> 30 days)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const oldFiles = documents.filter(doc =>
            new Date(doc.uploaded_at) < thirtyDaysAgo
        )
        const oldFilesSize = oldFiles.reduce((sum, doc) => sum + (doc.file_size || 0), 0) / (1024 * 1024)

        return NextResponse.json({
            totalBytes,
            totalMB: Math.round(totalMB * 100) / 100,
            totalGB: Math.round(totalGB * 1000) / 1000,
            limitMB,
            limitGB,
            usagePercentage: Math.round(usagePercentage * 10) / 10,
            status,
            message,
            fileCount: documents.length,
            oldFiles: {
                count: oldFiles.length,
                sizeMB: Math.round(oldFilesSize * 100) / 100,
            },
        })
    } catch (error) {
        console.error('Storage info error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
