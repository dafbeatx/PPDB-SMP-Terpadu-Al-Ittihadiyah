'use client'

import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { ArrowLeft, Upload, X, CheckCircle, AlertCircle } from 'lucide-react'
import { validateFile, DOCUMENT_TYPES } from '@/lib/validations/file'
import { getDocumentTypeLabel } from '@/lib/utils'
import { compressImageClient, formatFileSize } from '@/lib/utils/imageCompression'
import type { DocumentData } from './MultiStepForm'

interface DocumentUploadProps {
    onSubmit: (documents: DocumentData) => void
    onBack: () => void
    initialDocuments: DocumentData
    isSubmitting: boolean
}

interface FileState {
    file: File | null
    preview: string | null
    error: string | null
    uploading: boolean
    compressing: boolean
    compressionProgress: number
    originalSize?: number
    compressedSize?: number
}

export default function DocumentUpload({
    onSubmit,
    onBack,
    initialDocuments,
    isSubmitting
}: DocumentUploadProps) {
    const [files, setFiles] = useState<Record<string, FileState>>({
        ktp: {
            file: initialDocuments.ktp || null,
            preview: null,
            error: null,
            uploading: false,
            compressing: false,
            compressionProgress: 0,
        },
        kartu_keluarga: {
            file: initialDocuments.kartu_keluarga || null,
            preview: null,
            error: null,
            uploading: false,
            compressing: false,
            compressionProgress: 0,
        },
        ijazah: {
            file: initialDocuments.ijazah || null,
            preview: null,
            error: null,
            uploading: false,
            compressing: false,
            compressionProgress: 0,
        },
    })

    const handleFileChange = async (type: string, file: File | null) => {
        if (!file) {
            setFiles((prev) => ({
                ...prev,
                [type]: {
                    file: null,
                    preview: null,
                    error: null,
                    uploading: false,
                    compressing: false,
                    compressionProgress: 0,
                },
            }))
            return
        }

        // Set compressing state
        setFiles((prev) => ({
            ...prev,
            [type]: {
                ...prev[type],
                compressing: true,
                compressionProgress: 0,
                error: null,
            },
        }))

        try {
            // Compress image
            const compressionResult = await compressImageClient(file, {
                onProgress: (progress) => {
                    setFiles((prev) => ({
                        ...prev,
                        [type]: {
                            ...prev[type],
                            compressionProgress: progress,
                        },
                    }))
                },
            })

            // Validate compressed file
            const validation = await validateFile(compressionResult.file)

            if (!validation.valid) {
                setFiles((prev) => ({
                    ...prev,
                    [type]: {
                        ...prev[type],
                        error: validation.error || 'File tidak valid',
                        compressing: false,
                        compressionProgress: 0,
                    },
                }))
                return
            }

            // Create preview
            const preview = URL.createObjectURL(compressionResult.file)

            setFiles((prev) => ({
                ...prev,
                [type]: {
                    file: compressionResult.file,
                    preview,
                    error: null,
                    uploading: false,
                    compressing: false,
                    compressionProgress: 100,
                    originalSize: compressionResult.originalSize,
                    compressedSize: compressionResult.compressedSize,
                },
            }))

            // Log compression stats
            console.log(`${type} compressed:`, {
                original: formatFileSize(compressionResult.originalSize),
                compressed: formatFileSize(compressionResult.compressedSize),
                saved: `${compressionResult.savedPercentage}%`,
            })
        } catch (error) {
            console.error('Compression error:', error)
            setFiles((prev) => ({
                ...prev,
                [type]: {
                    ...prev[type],
                    error: 'Gagal mengkompres file. Silakan coba lagi.',
                    compressing: false,
                    compressionProgress: 0,
                },
            }))
        }
    }

    const handleDrop = (e: React.DragEvent, type: string) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        if (file) {
            handleFileChange(type, file)
        }
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    const removeFile = (type: string) => {
        if (files[type].preview) {
            URL.revokeObjectURL(files[type].preview!)
        }
        setFiles((prev) => ({
            ...prev,
            [type]: {
                file: null,
                preview: null,
                error: null,
                uploading: false,
                compressing: false,
                compressionProgress: 0,
            },
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Check if all required documents are uploaded
        const missingDocs = DOCUMENT_TYPES.filter(
            (doc) => !files[doc.value].file
        )

        if (missingDocs.length > 0) {
            alert(`Harap upload semua dokumen yang diperlukan:\n${missingDocs.map(d => `- ${d.label}`).join('\n')}`)
            return
        }

        // Check for errors
        const hasErrors = Object.values(files).some((f) => f.error)
        if (hasErrors) {
            alert('Mohon perbaiki kesalahan pada file yang diupload')
            return
        }

        // Prepare document data
        const documents: DocumentData = {
            ktp: files.ktp.file || undefined,
            kartu_keluarga: files.kartu_keluarga.file || undefined,
            ijazah: files.ijazah.file || undefined,
        }

        onSubmit(documents)
    }

    return (
        <Card className="p-5 md:p-8">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">
                Upload Dokumen
            </h2>
            <p className="text-sm md:text-lg text-gray-600 mb-4 md:mb-6">
                Upload dokumen yang diperlukan dalam format JPG/JPEG.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Persyaratan File:
                </h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                    <li>✓ Format file: <strong>JPG atau JPEG saja</strong> (PNG dan PDF tidak diterima)</li>
                    <li>✓ Ukuran maksimal: 5MB per file (akan dikompres otomatis)</li>
                    <li>✓ Gambar harus jelas, tidak buram, tidak gelap</li>
                    <li>✓ Pastikan semua teks pada dokumen dapat terbaca</li>
                    <li>✨ <strong>File akan dikompres otomatis</strong> untuk menghemat penyimpanan</li>
                </ul>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 pb-10 md:pb-0">
                {DOCUMENT_TYPES.map((docType) => {
                    const fileState = files[docType.value]

                    return (
                        <div key={docType.value}>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                {docType.label} <span className="text-red-500">*</span>
                            </label>

                            {!fileState.file && !fileState.compressing ? (
                                <div
                                    onDrop={(e) => handleDrop(e, docType.value)}
                                    onDragOver={handleDragOver}
                                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer bg-gray-50"
                                >
                                    <input
                                        type="file"
                                        id={`file-${docType.value}`}
                                        accept="image/jpeg,image/jpg"
                                        onChange={(e) => handleFileChange(docType.value, e.target.files?.[0] || null)}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor={`file-${docType.value}`}
                                        className="cursor-pointer flex flex-col items-center"
                                    >
                                        <Upload className="w-12 h-12 text-gray-400 mb-3" />
                                        <p className="text-base text-gray-700 font-medium mb-1">
                                            Klik untuk upload atau drag & drop
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Format JPG/JPEG, maksimal 5MB
                                        </p>
                                    </label>
                                </div>
                            ) : fileState.compressing ? (
                                <div className="border-2 border-blue-300 rounded-lg p-8 text-center bg-blue-50">
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-3"></div>
                                        <p className="text-base text-blue-700 font-medium mb-2">
                                            Mengompres gambar...
                                        </p>
                                        <div className="w-full max-w-xs bg-blue-200 rounded-full h-2 mb-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${fileState.compressionProgress}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-sm text-blue-600">
                                            {Math.round(fileState.compressionProgress)}%
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="border-2 border-green-500 rounded-lg p-4 bg-green-50">
                                    <div className="flex items-start gap-4">
                                        {fileState.preview && (
                                            <img
                                                src={fileState.preview}
                                                alt={docType.label}
                                                className="w-32 h-32 object-cover rounded-lg border-2 border-green-300"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="font-semibold text-gray-900 flex items-center gap-2">
                                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                                        {fileState.file?.name}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {formatFileSize(fileState.file?.size || 0)}
                                                        {fileState.originalSize && fileState.compressedSize && (
                                                            <span className="ml-2 text-green-700 font-medium">
                                                                (Hemat {(((fileState.originalSize - fileState.compressedSize) / fileState.originalSize) * 100).toFixed(0)}% dari {formatFileSize(fileState.originalSize)})
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile(docType.value)}
                                                    className="text-red-600 hover:text-red-700 p-1"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {fileState.error && (
                                <div className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                                    {fileState.error}
                                </div>
                            )}
                        </div>
                    )
                })}

                <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-6 border-t">
                    <Button
                        type="button"
                        onClick={onBack}
                        variant="outline"
                        size="lg"
                        disabled={isSubmitting}
                        className="gap-2 w-full sm:w-auto"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Kembali
                    </Button>
                    <Button
                        type="submit"
                        size="lg"
                        className="flex-1"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Mengirim Data...' : 'Kirim Pendaftaran'}
                    </Button>
                </div>
            </form>
        </Card>
    )
}
