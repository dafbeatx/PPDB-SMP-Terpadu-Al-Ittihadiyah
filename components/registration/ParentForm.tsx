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
    'Tidak Bekerja',
    'Lainnya',
]

const educationLevels = [
    'SD / Sederajat',
    'SMP / Sederajat',
    'SMA / SMK / Sederajat',
    'D1 / D2 / D3',
    'S1 / D4',
    'S2',
    'S3',
    'Tidak Sekolah',
]

export default function ParentForm({ onSubmit, onBack, initialData }: ParentFormProps) {
    const [formData, setFormData] = useState<ParentFormData>(
        initialData || {
            father_name: '',
            father_occupation: '',
            pendidikan_ayah: '',
            mother_name: '',
            mother_occupation: '',
            pendidikan_ibu: '',
            phone_number: '',
            address: '',
            nama_wali: '',
            hubungan_wali: '',
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

            // Scroll to the first error
            const firstErrorField = Object.keys(newErrors)[0]
            const errorElement = document.querySelector(`[name="${firstErrorField}"]`)
            if (errorElement) {
                errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }

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

            <form onSubmit={handleSubmit} className="space-y-8 pb-10 md:pb-0">
                {/* Data Ayah */}
                <div className="space-y-6">
                    <h3 className="text-lg font-bold text-green-700 border-b-2 border-green-100 pb-2 flex items-center gap-2">
                        <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                        Data Ayah Kandung
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Nama Lengkap Ayah"
                            name="father_name"
                            type="text"
                            value={formData.father_name}
                            onChange={(e) => handleChange('father_name', e.target.value)}
                            error={errors.father_name}
                            placeholder="Sesuai KTP"
                            required
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Pekerjaan <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="father_occupation"
                                    value={formData.father_occupation}
                                    onChange={(e) => handleChange('father_occupation', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none text-base text-gray-900 transition-colors"
                                >
                                    <option value="">Pilih</option>
                                    {commonOccupations.map((occupation) => (
                                        <option key={occupation} value={occupation}>{occupation}</option>
                                    ))}
                                </select>
                                {errors.father_occupation && (
                                    <p className="mt-1 text-xs text-red-600 font-medium">{errors.father_occupation}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Pendidikan <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="pendidikan_ayah"
                                    value={formData.pendidikan_ayah}
                                    onChange={(e) => handleChange('pendidikan_ayah', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none text-base text-gray-900 transition-colors"
                                >
                                    <option value="">Pilih</option>
                                    {educationLevels.map((level) => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                                {errors.pendidikan_ayah && (
                                    <p className="mt-1 text-xs text-red-600 font-medium">{errors.pendidikan_ayah}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Ibu */}
                <div className="space-y-6">
                    <h3 className="text-lg font-bold text-green-700 border-b-2 border-green-100 pb-2 flex items-center gap-2">
                        <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                        Data Ibu Kandung
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Nama Lengkap Ibu"
                            name="mother_name"
                            type="text"
                            value={formData.mother_name}
                            onChange={(e) => handleChange('mother_name', e.target.value)}
                            error={errors.mother_name}
                            placeholder="Sesuai KTP"
                            required
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Pekerjaan <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="mother_occupation"
                                    value={formData.mother_occupation}
                                    onChange={(e) => handleChange('mother_occupation', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none text-base text-gray-900 transition-colors"
                                >
                                    <option value="">Pilih</option>
                                    {commonOccupations.map((occupation) => (
                                        <option key={occupation} value={occupation}>{occupation}</option>
                                    ))}
                                </select>
                                {errors.mother_occupation && (
                                    <p className="mt-1 text-xs text-red-600 font-medium">{errors.mother_occupation}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Pendidikan <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="pendidikan_ibu"
                                    value={formData.pendidikan_ibu}
                                    onChange={(e) => handleChange('pendidikan_ibu', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none text-base text-gray-900 transition-colors"
                                >
                                    <option value="">Pilih</option>
                                    {educationLevels.map((level) => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                                {errors.pendidikan_ibu && (
                                    <p className="mt-1 text-xs text-red-600 font-medium">{errors.pendidikan_ibu}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Kontak & Alamat */}
                <div className="space-y-6">
                    <h3 className="text-lg font-bold text-green-700 border-b-2 border-green-100 pb-2 flex items-center gap-2">
                        <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                        Kontak & Alamat
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Nomor HP Aktif (WhatsApp)"
                            name="phone_number"
                            type="tel"
                            value={formData.phone_number}
                            onChange={(e) => handleChange('phone_number', e.target.value)}
                            error={errors.phone_number}
                            helperText="Contoh: 081234567890"
                            required
                        />

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Alamat Orang Tua
                            </label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={(e) => handleChange('address', e.target.value)}
                                rows={2}
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none text-base text-gray-900 placeholder:text-gray-400 transition-colors resize-none"
                                placeholder="Kosongkan jika sama dengan alamat siswa"
                            />
                        </div>
                    </div>
                </div>

                {/* Data Wali (Optional) */}
                <div className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-700 border-b-2 border-gray-100 pb-2 flex items-center gap-2">
                        <span className="bg-gray-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">4</span>
                        Data Wali (Opsional)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Nama Lengkap Wali"
                            name="nama_wali"
                            type="text"
                            value={formData.nama_wali || ''}
                            onChange={(e) => handleChange('nama_wali', e.target.value)}
                            error={errors.nama_wali}
                            placeholder="Isi jika siswa tinggal dengan wali"
                        />
                        <Input
                            label="Hubungan dengan Siswa"
                            name="hubungan_wali"
                            type="text"
                            value={formData.hubungan_wali || ''}
                            onChange={(e) => handleChange('hubungan_wali', e.target.value)}
                            error={errors.hubungan_wali}
                            placeholder="Contoh: Paman, Bibi, Kakak"
                        />
                    </div>
                </div>

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
                        Lanjut ke Data Tambahan
                    </Button>
                </div>
            </form>
        </Card>
    )
}
