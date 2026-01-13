'use client'

import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Upload, AlertCircle, CheckCircle, Image as ImageIcon } from 'lucide-react'

interface LogoUploaderProps {
    currentLogoUrl: string
    onUploadSuccess: (url: string) => void
}

export default function LogoUploader({ currentLogoUrl, onUploadSuccess }: LogoUploaderProps) {
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')
    const [preview, setPreview] = useState(currentLogoUrl)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file
        if (!file.type.startsWith('image/')) {
            setError('File harus berupa gambar (PNG, JPG, SVG)')
            return
        }

        if (file.size > 2 * 1024 * 1024) {
            setError('Ukuran file maksimal 2MB')
            return
        }

        setError('')
        setUploading(true)

        try {
            // Create FormData
            const formData = new FormData()
            formData.append('file', file)
            formData.append('folder', 'branding')

            // Upload to server
            const response = await fetch('/api/admin/upload-logo', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Upload gagal')
            }

            const { url } = await response.json()

            setPreview(url)
            onUploadSuccess(url)
        } catch (err) {
            console.error('Upload error:', err)
            setError('Gagal upload logo. Silakan coba lagi.')
        } finally {
            setUploading(false)
        }
    }

    return (
        <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-green-600" />
                Logo Sekolah
            </h3>

            <div className="space-y-4">
                {/* Current Logo Preview */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Logo Saat Ini:
                    </label>
                    <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50 flex items-center justify-center h-40">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Logo Sekolah"
                                className="max-h-32 max-w-full object-contain"
                                onError={() => setPreview('/logo-placeholder.png')}
                            />
                        ) : (
                            <div className="text-gray-400 text-center">
                                <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                                <p className="text-sm">Belum ada logo</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Upload New Logo */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Upload Logo Baru:
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={uploading}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none text-base"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                        Format: PNG, JPG, SVG. Maksimal 2MB. Rekomendasi: 200x200px atau rasio 1:1
                    </p>
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                        <AlertCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">{error}</span>
                    </div>
                )}

                {uploading && (
                    <div className="flex items-center gap-2 text-blue-600 bg-blue-50 p-3 rounded-lg">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                        <span className="text-sm font-medium">Mengupload...</span>
                    </div>
                )}
            </div>
        </Card>
    )
}
