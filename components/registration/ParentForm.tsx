'use client'

import { useState } from 'react'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'
import { parentSchema, type ParentFormData } from '@/lib/validations/parent'

interface ParentFormProps {
    onSubmit: (data: ParentFormData) => void
    onBack: () => void
    initialData: ParentFormData | null
}

const commonOccupations = [
    'PNS',
    'TNI/POLRI',
    'Pegawai Swasta',
    'Wiraswasta',
    'Pedagang',
    'Petani',
    'Buruh',
    'Guru/Dosen',
    'Dokter/Tenaga Medis',
    'Ibu Rumah Tangga',
    'Lainnya',
]

export default function ParentForm({ onSubmit, onBack, initialData }: ParentFormProps) {
    const [formData, setFormData] = useState<ParentFormData>(
        initialData || {
            father_name: '',
            mother_name: '',
            father_occupation: '',
            mother_occupation: '',
            phone_number: '',
            address: '',
        }
    )
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleChange = (field: keyof ParentFormData, value: string) => {
        setFormData({ ...formData, [field]: value })
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' })
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const result = parentSchema.safeParse(formData)

        if (!result.success) {
            const newErrors: Record<string, string> = {}
            result.error.issues.forEach((err) => {
                if (err.path[0]) {
                    newErrors[err.path[0] as string] = err.message
                }
            })
            setErrors(newErrors)
            return
        }

        onSubmit(result.data)
    }

    return (
        <Card className="p-5 md:p-8">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">
                Data Orang Tua / Wali
            </h2>
            <p className="text-sm md:text-lg text-gray-600 mb-6 md:mb-8">
                Lengkapi data orang tua atau wali yang bertanggung jawab. Semua field bertanda * wajib diisi.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 pb-32 md:pb-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Nama Ayah"
                        type="text"
                        value={formData.father_name}
                        onChange={(e) => handleChange('father_name', e.target.value)}
                        error={errors.father_name}
                        placeholder="Nama lengkap ayah"
                        required
                    />

                    <Input
                        label="Nama Ibu"
                        type="text"
                        value={formData.mother_name}
                        onChange={(e) => handleChange('mother_name', e.target.value)}
                        error={errors.mother_name}
                        placeholder="Nama lengkap ibu"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Pekerjaan Ayah <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.father_occupation}
                            onChange={(e) => handleChange('father_occupation', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none text-base text-gray-900 transition-colors"
                        >
                            <option value="">Pilih pekerjaan</option>
                            {commonOccupations.map((occupation) => (
                                <option key={occupation} value={occupation}>
                                    {occupation}
                                </option>
                            ))}
                        </select>
                        {errors.father_occupation && (
                            <p className="mt-2 text-sm text-red-600">{errors.father_occupation}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Pekerjaan Ibu <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.mother_occupation}
                            onChange={(e) => handleChange('mother_occupation', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none text-base text-gray-900 transition-colors"
                        >
                            <option value="">Pilih pekerjaan</option>
                            {commonOccupations.map((occupation) => (
                                <option key={occupation} value={occupation}>
                                    {occupation}
                                </option>
                            ))}
                        </select>
                        {errors.mother_occupation && (
                            <p className="mt-2 text-sm text-red-600">{errors.mother_occupation}</p>
                        )}
                    </div>
                </div>

                <Input
                    label="Nomor HP Aktif Orang Tua"
                    type="tel"
                    value={formData.phone_number}
                    onChange={(e) => handleChange('phone_number', e.target.value)}
                    error={errors.phone_number}
                    helperText="Nomor HP yang dapat dihubungi (Format: 08xx)"
                    placeholder="Contoh: 081234567890"
                    required
                />

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Alamat Orang Tua
                    </label>
                    <textarea
                        value={formData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none text-base text-gray-900 placeholder:text-gray-400 transition-colors resize-none"
                        placeholder="Kosongkan jika sama dengan alamat siswa"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                        Opsional: Isi jika berbeda dengan alamat siswa
                    </p>
                </div>

                <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-4">
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
