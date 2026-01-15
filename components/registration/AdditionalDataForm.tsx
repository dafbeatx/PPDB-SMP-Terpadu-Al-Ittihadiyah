'use client'

import { useState } from 'react'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'
import { StudentFormData } from '@/lib/validations/student'

interface AdditionalDataFormProps {
    onSubmit: (data: Partial<StudentFormData>) => void
    onUpdate?: (data: Partial<StudentFormData>) => void
    onBack: () => void
    initialData: StudentFormData
}

export default function AdditionalDataForm({ onSubmit, onUpdate, onBack, initialData }: AdditionalDataFormProps) {
    const [formData, setFormData] = useState({
        prestasi: initialData.prestasi || '',
        hafalan_quran: initialData.hafalan_quran || '',
    })

    const handleChange = (field: 'prestasi' | 'hafalan_quran', value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        onUpdate?.({ [field]: value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <Card className="p-5 md:p-8">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">
                Data Tambahan
            </h2>
            <p className="text-sm md:text-lg text-gray-600 mb-6 md:mb-8">
                Informasi tambahan mengenai prestasi dan hafalan Al-Qur'an (opsional).
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 pb-10 md:pb-0">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Prestasi yang Pernah Diraih
                    </label>
                    <textarea
                        value={formData.prestasi}
                        onChange={(e) => handleChange('prestasi', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none text-base text-gray-900 placeholder:text-gray-400 transition-colors resize-none"
                        placeholder="Contoh: Juara 1 Lomba Adzan Tingkat Kecamatan, Harapan 2 Pencak Silat, dll."
                    />
                    <p className="mt-2 text-sm text-gray-500">
                        Sebutkan prestasi akademik maupun non-akademik jika ada.
                    </p>
                </div>

                <Input
                    label="Hafalan Al-Qur'an"
                    type="text"
                    value={formData.hafalan_quran}
                    onChange={(e) => handleChange('hafalan_quran', e.target.value)}
                    placeholder="Contoh: Juz 30, 2 Juz, dll."
                    helperText="Isi jika calon siswa memiliki hafalan Al-Qur'an"
                />

                <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-4 border-t">
                    <Button
                        type="button"
                        onClick={onBack}
                        variant="outline"
                        size="lg"
                        className="gap-2 w-full sm:w-auto"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Kembali
                    </Button>
                    <Button type="submit" size="lg" className="flex-1">
                        Lanjut ke Upload Dokumen
                    </Button>
                </div>
            </form>
        </Card>
    )
}
