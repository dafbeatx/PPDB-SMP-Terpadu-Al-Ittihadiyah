'use client'

import { useState } from 'react'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { studentSchema, type StudentFormData } from '@/lib/validations/student'

interface StudentFormProps {
    onSubmit: (data: StudentFormData) => void
    initialData: StudentFormData | null
}

export default function StudentForm({ onSubmit, initialData }: StudentFormProps) {
    const [formData, setFormData] = useState<StudentFormData>(
        initialData || {
            full_name: '',
            nisn: '',
            birth_place: '',
            birth_date: '',
            gender: 'Laki-laki',
            address: '',
            previous_school: '',
            phone_number: '',
        }
    )
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleChange = (field: keyof StudentFormData, value: string) => {
        setFormData({ ...formData, [field]: value })
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' })
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const result = studentSchema.safeParse(formData)

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
                Data Siswa
            </h2>
            <p className="text-sm md:text-lg text-gray-600 mb-6 md:mb-8">
                Lengkapi data calon siswa dengan benar. Semua field bertanda * wajib diisi.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 pb-10 md:pb-0">
                <Input
                    label="Nama Lengkap"
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => handleChange('full_name', e.target.value)}
                    error={errors.full_name}
                    placeholder="Contoh: Ahmad Rizki Maulana"
                    required
                />

                <Input
                    label="NISN"
                    type="text"
                    value={formData.nisn}
                    onChange={(e) => handleChange('nisn', e.target.value)}
                    error={errors.nisn}
                    helperText="Nomor Induk Siswa Nasional (10 digit angka)"
                    placeholder="Contoh: 0012345678"
                    maxLength={10}
                    required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Tempat Lahir"
                        type="text"
                        value={formData.birth_place}
                        onChange={(e) => handleChange('birth_place', e.target.value)}
                        error={errors.birth_place}
                        placeholder="Contoh: Jakarta"
                        required
                    />

                    <Input
                        label="Tanggal Lahir"
                        type="date"
                        value={formData.birth_date}
                        onChange={(e) => handleChange('birth_date', e.target.value)}
                        error={errors.birth_date}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Jenis Kelamin <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="gender"
                                value="Laki-laki"
                                checked={formData.gender === 'Laki-laki'}
                                onChange={(e) => handleChange('gender', e.target.value as any)}
                                className="w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500"
                            />
                            <span className="ml-2 text-base text-gray-700">Laki-laki</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="gender"
                                value="Perempuan"
                                checked={formData.gender === 'Perempuan'}
                                onChange={(e) => handleChange('gender', e.target.value as any)}
                                className="w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500"
                            />
                            <span className="ml-2 text-base text-gray-700">Perempuan</span>
                        </label>
                    </div>
                    {errors.gender && (
                        <p className="mt-2 text-sm text-red-600">{errors.gender}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Alamat Lengkap <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={formData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none text-base text-gray-900 placeholder:text-gray-400 transition-colors resize-none"
                        placeholder="Contoh: Jl. Merdeka No. 123, RT 01/RW 05, Kelurahan Suka Makmur, Kecamatan Medan Kota, Kota Medan, Sumatera Utara"
                    />
                    {errors.address && (
                        <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                    )}
                </div>

                <Input
                    label="Asal Sekolah"
                    type="text"
                    value={formData.previous_school}
                    onChange={(e) => handleChange('previous_school', e.target.value)}
                    error={errors.previous_school}
                    helperText="Sekolah terakhir (SD/MI)"
                    placeholder="Contoh: SD Negeri 01 Medan"
                    required
                />

                <Input
                    label="Nomor HP Siswa"
                    type="tel"
                    value={formData.phone_number}
                    onChange={(e) => handleChange('phone_number', e.target.value)}
                    error={errors.phone_number}
                    helperText="Format: 08xx (opsional)"
                    placeholder="Contoh: 081234567890"
                />

                <div className="flex justify-end pt-4">
                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                        Lanjut ke Data Orang Tua
                    </Button>
                </div>
            </form>
        </Card>
    )
}
