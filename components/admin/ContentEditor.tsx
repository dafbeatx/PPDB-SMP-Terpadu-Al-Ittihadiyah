'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Save, AlertCircle, CheckCircle } from 'lucide-react'
import type { PageContent } from '@/types/content.types'

interface ContentEditorProps {
    initialContent: PageContent[]
}

const categories = [
    { id: 'branding', label: 'Logo & Branding' },
    { id: 'hero', label: 'Hero Section' },
    { id: 'profile', label: 'Profil Sekolah' },
    { id: 'visi_misi', label: 'Visi & Misi' },
    { id: 'keunggulan', label: 'Keunggulan' },
    { id: 'alur', label: 'Alur PPDB' },
    { id: 'footer', label: 'Footer' },
]

export default function ContentEditor({ initialContent }: ContentEditorProps) {
    const [activeTab, setActiveTab] = useState('branding')
    const [content, setContent] = useState<PageContent[]>(initialContent)
    const [isSaving, setIsSaving] = useState(false)
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const currentContent = content.filter((c) => c.category === activeTab)

    const handleChange = (id: string, newValue: string) => {
        setContent((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, value: newValue } : item
            )
        )
        setSaveStatus('idle')
    }

    const handleSave = async () => {
        setIsSaving(true)
        setSaveStatus('idle')
        setErrorMessage('')

        console.log('🔵 Starting save...', {
            totalItems: content.length,
            content: content.slice(0, 3), // Log first 3 items for debugging
        })

        try {
            const response = await fetch('/api/admin/content', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content }),
            })

            console.log('🔵 Response status:', response.status)

            const data = await response.json()
            console.log('🔵 Response data:', data)

            if (!response.ok) {
                throw new Error(data.error || `HTTP ${response.status}: Failed to save`)
            }

            if (!data.success) {
                throw new Error(data.message || 'Save failed')
            }

            console.log('✅ Save successful!')
            setSaveStatus('success')

            // Refresh page after 2 seconds to show updated content
            setTimeout(() => {
                window.location.reload()
            }, 2000)

        } catch (error: any) {
            console.error('❌ Error saving content:', error)
            setSaveStatus('error')
            setErrorMessage(error.message || 'Unknown error')
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div>
            {/* Tabs */}
            <div className="bg-white border-b border-gray-200 mb-6">
                <div className="flex gap-1 overflow-x-auto">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={`px-6 py-4 font-semibold text-sm transition-colors whitespace-nowrap ${activeTab === cat.id
                                ? 'text-green-600 border-b-2 border-green-600'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Logo is now static at /logo.png */}

            {/* Content Form */}
            <Card className="p-6">
                <div className="space-y-6">
                    {currentContent.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            Tidak ada konten untuk kategori ini
                        </div>
                    )}

                    {currentContent.map((item) => (
                        <div key={item.id}>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                {item.label}
                            </label>

                            {item.value_type === 'textarea' ? (
                                <textarea
                                    value={item.value}
                                    onChange={(e) => handleChange(item.id, e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none text-base text-gray-900 font-medium resize-none"
                                />
                            ) : item.value_type === 'number' ? (
                                <input
                                    type="number"
                                    value={item.value}
                                    onChange={(e) => handleChange(item.id, e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none text-base text-gray-900 font-medium"
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={item.value}
                                    onChange={(e) => handleChange(item.id, e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none text-base text-gray-900 font-medium"
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Save Button */}
                <div className="mt-8 flex flex-col gap-4">
                    <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        size="lg"
                        className="gap-2"
                    >
                        <Save className="w-5 h-5" />
                        {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </Button>

                    {saveStatus === 'success' && (
                        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">Berhasil disimpan! Halaman akan di-refresh...</span>
                        </div>
                    )}

                    {saveStatus === 'error' && (
                        <div className="flex flex-col gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                <span className="font-medium">Gagal menyimpan</span>
                            </div>
                            {errorMessage && (
                                <span className="text-sm">{errorMessage}</span>
                            )}
                            <span className="text-sm">Coba lagi atau refresh halaman</span>
                        </div>
                    )}
                </div>
            </Card>

            {/* Info Box */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">💡 Tips</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Perubahan akan langsung terlihat di website setelah disimpan</li>
                    <li>• Pastikan teks yang diinput jelas dan mudah dipahami</li>
                    <li>• Gunakan Bahasa Indonesia yang formal dan profesional</li>
                    {activeTab === 'branding' && <li>• Logo akan otomatis tersimpan saat upload berhasil</li>}
                    <li>• Jika gagal save, buka Console (F12) dan screenshot errornya</li>
                </ul>
            </div>
        </div>
    )
}
