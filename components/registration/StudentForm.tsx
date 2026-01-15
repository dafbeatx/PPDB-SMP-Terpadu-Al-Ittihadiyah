'use client'

import { useState } from 'react'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { studentSchema, type StudentFormData } from '@/lib/validations/student'

interface StudentFormProps {
    onSubmit: (data: StudentFormData) => void
    onUpdate?: (data: Partial<StudentFormData>) => void
    initialData: StudentFormData
}

export default function StudentForm({ onSubmit, onUpdate, initialData }: StudentFormProps) {
    const [formData, setFormData] = useState<StudentFormData>(initialData)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleChange = (field: keyof StudentFormData, value: string | number) => {
        const newData = { ...formData, [field]: value }
        setFormData(newData)
        onUpdate?.({ [field]: value })

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
                Data Siswa
            </h2>
            <p className="text-sm md:text-lg text-gray-600 mb-6 md:mb-8">
                Lengkapi data calon siswa dengan benar. Semua field bertanda * wajib diisi.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 pb-10 md:pb-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Nama Lengkap"
                        name="full_name"
                        type="text"
                        value={formData.full_name}
                        onChange={(e) => handleChange('full_name', e.target.value)}
                        error={errors.full_name}
                        placeholder="Contoh: Ahmad Rizki Maulana"
                        required
                    />

                    <Input
                        label="NIK Siswa"
                        name="nik_siswa"
                        type="text"
                        value={formData.nik_siswa}
                        onChange={(e) => handleChange('nik_siswa', e.target.value)}
                        error={errors.nik_siswa}
                        helperText="Sesuai Akta Kelahiran/KK (16 digit)"
                        placeholder="16 digit angka NIK"
                        maxLength={16}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="NISN"
                        name="nisn"
                        type="text"
                        value={formData.nisn}
                        onChange={(e) => handleChange('nisn', e.target.value)}
                        error={errors.nisn}
                        helperText="Nomor Induk Siswa Nasional (10 digit angka)"
                        placeholder="Contoh: 0012345678"
                        maxLength={10}
                        required
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Agama <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="agama"
                                value={formData.agama}
                                onChange={(e) => handleChange('agama', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none text-base text-gray-900 transition-colors"
                            >
                                <option value="">Pilih Agama</option>
                                <option value="Islam">Islam</option>
                                <option value="Kristen">Kristen</option>
                                <option value="Katolik">Katolik</option>
                                <option value="Hindu">Hindu</option>
                                <option value="Budha">Budha</option>
                                <option value="Konghucu">Konghucu</option>
                            </select>
                            {errors.agama && (
                                <p className="mt-1 text-xs text-red-600 font-medium">{errors.agama}</p>
                            )}
                        </div>
                        <Input
                            label="Anak Ke"
                            name="anak_ke"
                            type="number"
                            value={formData.anak_ke.toString()}
                            onChange={(e) => handleChange('anak_ke', e.target.value)}
                            error={errors.anak_ke}
                            min="1"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Tempat Lahir"
                        name="birth_place"
                        type="text"
                        value={formData.birth_place}
                        onChange={(e) => handleChange('birth_place', e.target.value)}
                        error={errors.birth_place}
                        placeholder="Contoh: Jakarta"
                        required
                    />

                    <Input
                        label="Tanggal Lahir"
                        name="birth_date"
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

                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Alamat Tinggal</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                            label="Kelurahan / Desa"
                            name="desa"
                            type="text"
                            value={formData.desa}
                            onChange={(e) => handleChange('desa', e.target.value)}
                            error={errors.desa}
                            placeholder="Contoh: Kel. Menteng"
                            required
                        />
                        <Input
                            label="Kecamatan"
                            name="kecamatan"
                            type="text"
                            value={formData.kecamatan}
                            onChange={(e) => handleChange('kecamatan', e.target.value)}
                            error={errors.kecamatan}
                            placeholder="Contoh: Kec. Menteng"
                            required
                        />
                        <Input
                            label="Kota / Kabupaten"
                            name="kabupaten"
                            type="text"
                            value={formData.kabupaten}
                            onChange={(e) => handleChange('kabupaten', e.target.value)}
                            error={errors.kabupaten}
                            placeholder="Contoh: Jakarta Pusat"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Alamat Lengkap <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={(e) => handleChange('address', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none text-base text-gray-900 placeholder:text-gray-400 transition-colors resize-none"
                            placeholder="Nama Jalan, No. Rumah, RT/RW"
                        />
                        {errors.address && (
                            <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Asal Sekolah"
                        name="previous_school"
                        type="text"
                        value={formData.previous_school}
                        onChange={(e) => handleChange('previous_school', e.target.value)}
                        error={errors.previous_school}
                        helperText="Sekolah terakhir (SD/MI)"
                        placeholder="Contoh: SD Negeri 01 Medan"
                        required
                    />

                    <Input
                        label="Tahun Lulus"
                        name="tahun_lulus"
                        type="text"
                        value={formData.tahun_lulus}
                        onChange={(e) => handleChange('tahun_lulus', e.target.value)}
                        error={errors.tahun_lulus}
                        placeholder="Contoh: 2026"
                        maxLength={4}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Nomor HP Siswa"
                        name="phone_number"
                        type="tel"
                        value={formData.phone_number}
                        onChange={(e) => handleChange('phone_number', e.target.value)}
                        error={errors.phone_number}
                        helperText="Format: 08xx (opsional)"
                        placeholder="Contoh: 081234567890"
                    />

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Status Tinggal <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="tinggal_dengan"
                            value={formData.tinggal_dengan}
                            onChange={(e) => handleChange('tinggal_dengan', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none text-base text-gray-900 transition-colors"
                        >
                            <option value="">Pilih Status Tinggal</option>
                            <option value="Orang Tua">Bersama Orang Tua</option>
                            <option value="Wali">Bersama Wali</option>
                            <option value="Asrama / Pondok">Asrama / Pondok</option>
                            <option value="Kost">Kost</option>
                            <option value="Lainnya">Lainnya</option>
                        </select>
                        {errors.tinggal_dengan && (
                            <p className="mt-1 text-xs text-red-600 font-medium">{errors.tinggal_dengan}</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                        Lanjut ke Data Orang Tua
                    </Button>
                </div>
            </form>
        </Card>
    )
}
