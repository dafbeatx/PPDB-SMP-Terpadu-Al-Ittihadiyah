'use client'

import { useEffect, useState } from 'react'
import { HardDrive, AlertTriangle, CheckCircle } from 'lucide-react'

interface StorageInfo {
    totalMB: number
    limitMB: number
    usagePercentage: number
    status: 'healthy' | 'warning' | 'critical'
    message: string
    fileCount: number
    oldFiles: {
        count: number
        sizeMB: number
    }
}

export default function StorageWidget() {
    const [storage, setStorage] = useState<StorageInfo | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStorageInfo()
    }, [])

    const fetchStorageInfo = async () => {
        try {
            const response = await fetch('/api/admin/storage-info')
            if (response.ok) {
                const data = await response.json()
                setStorage(data)
            }
        } catch (error) {
            console.error('Failed to fetch storage info:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading || !storage) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>
            </div>
        )
    }

    const statusColors = {
        healthy: {
            bg: 'bg-green-100',
            text: 'text-green-800',
            icon: 'text-green-600',
            bar: 'bg-green-500',
        },
        warning: {
            bg: 'bg-yellow-100',
            text: 'text-yellow-800',
            icon: 'text-yellow-600',
            bar: 'bg-yellow-500',
        },
        critical: {
            bg: 'bg-red-100',
            text: 'text-red-800',
            icon: 'text-red-600',
            bar: 'bg-red-500',
        },
    }

    const colors = statusColors[storage.status]

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${colors.bg}`}>
                        <HardDrive className={`w-6 h-6 ${colors.icon}`} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Storage Usage</h3>
                        <p className="text-sm text-gray-600">{storage.fileCount} files</p>
                    </div>
                </div>
            </div>

            {/* Usage Stats */}
            <div className="mb-4">
                <div className="flex justify-between items-baseline mb-2">
                    <span className="text-2xl font-bold text-gray-900">
                        {storage.totalMB.toFixed(1)} MB
                    </span>
                    <span className="text-sm text-gray-600">
                        / {storage.limitMB} MB
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <div
                        className={`h-4 rounded-full ${colors.bar} transition-all duration-500`}
                        style={{ width: `${Math.min(storage.usagePercentage, 100)}%` }}
                    />
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{storage.usagePercentage}% used</span>
                    <span className="text-gray-600">{(storage.limitMB - storage.totalMB).toFixed(1)} MB free</span>
                </div>
            </div>

            {/* Status Message */}
            <div className={`${colors.bg} ${colors.text} rounded-lg p-3 flex items-start gap-2`}>
                {storage.status === 'healthy' ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                ) : (
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                    <p className="font-medium">{storage.message}</p>
                    {storage.oldFiles.count > 0 && (
                        <p className="text-sm mt-1">
                            {storage.oldFiles.count} files &gt; 30 hari ({storage.oldFiles.sizeMB.toFixed(1)} MB)
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
