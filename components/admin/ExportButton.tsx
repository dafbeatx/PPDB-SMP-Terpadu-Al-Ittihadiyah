'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'

interface ExportButtonProps {
    variant?: 'primary' | 'secondary'
    size?: 'sm' | 'md' | 'lg'
}

export default function ExportButton({ variant = 'primary', size = 'md' }: ExportButtonProps) {
    const [isExporting, setIsExporting] = useState(false)

    const handleExport = async () => {
        setIsExporting(true)

        try {
            const response = await fetch('/api/export/registrations')

            if (!response.ok) {
                throw new Error('Export failed')
            }

            // Get filename from header
            const contentDisposition = response.headers.get('Content-Disposition')
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1].replace(/"/g, '')
                : `PPDB-Data-${new Date().toISOString().split('T')[0]}.xlsx`

            // Download file
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = filename
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
        } catch (error) {
            console.error('Export error:', error)
            alert('Gagal export data. Silakan coba lagi.')
        } finally {
            setIsExporting(false)
        }
    }

    const baseClasses = 'flex items-center gap-2 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

    const variantClasses = {
        primary: 'bg-green-600 hover:bg-green-700 text-white',
        secondary: 'bg-white border-2 border-green-600 text-green-600 hover:bg-green-50',
    }

    const sizeClasses = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-6 py-4 text-lg',
    }

    return (
        <button
            onClick={handleExport}
            disabled={isExporting}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
        >
            <Download className={size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'} />
            {isExporting ? 'Mengexport...' : 'Download Excel'}
        </button>
    )
}
