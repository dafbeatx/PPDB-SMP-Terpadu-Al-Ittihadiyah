import Link from 'next/link'
import { redirect } from 'next/navigation'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { formatDate, getStatusLabel } from '@/lib/utils'

export default async function KonfirmasiPage({
    searchParams,
}: {
    searchParams: Promise<{ id?: string }>
}) {
    const params = await searchParams
    const id = params.id

    if (!id) {
        redirect('/daftar')
    }

    const supabase = await createClient()

    // Fetch registration data
    const { data: registration, error } = await supabase
        .from('registrations')
        .select(`
      *,
      students (*),
      parents (*)
    `)
        .eq('id', id)
        .single()

    if (error || !registration) {
        redirect('/daftar')
    }

    const student = (registration as any).students
    const parent = (registration as any).parents

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-green-600 p-6 rounded-full">
                            <CheckCircle className="w-16 h-16 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Pendaftaran Berhasil!
                    </h1>
                    <p className="text-lg text-gray-600">
                        Terima kasih telah mendaftar di SMP Terpadu Al-Ittihadiyah
                    </p>
                </div>

                <Card className="p-8 md:p-12 mb-6">
                    <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 mb-8 text-center">
                        <p className="text-sm text-gray-600 mb-2">Nomor Pendaftaran Anda:</p>
                        <p className="text-3xl md:text-4xl font-bold text-green-700">
                            {registration.registration_number}
                        </p>
                        <p className="text-sm text-gray-600 mt-3">
                            Harap simpan nomor ini untuk keperluan verifikasi
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Ringkasan Data Pendaftaran</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-3 text-lg">Data Siswa</h3>
                                    <dl className="space-y-2 text-sm">
                                        <div>
                                            <dt className="text-gray-600">Nama Lengkap:</dt>
                                            <dd className="font-medium text-gray-900">{student.full_name}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-600">NISN:</dt>
                                            <dd className="font-medium text-gray-900">{student.nisn}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-600">Tempat, Tanggal Lahir:</dt>
                                            <dd className="font-medium text-gray-900">
                                                {student.birth_place}, {formatDate(student.birth_date)}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-600">Jenis Kelamin:</dt>
                                            <dd className="font-medium text-gray-900">{student.gender}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-600">Asal Sekolah:</dt>
                                            <dd className="font-medium text-gray-900">{student.previous_school}</dd>
                                        </div>
                                    </dl>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-3 text-lg">Data Orang Tua</h3>
                                    <dl className="space-y-2 text-sm">
                                        <div>
                                            <dt className="text-gray-600">Nama Ayah:</dt>
                                            <dd className="font-medium text-gray-900">{parent.father_name}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-600">Nama Ibu:</dt>
                                            <dd className="font-medium text-gray-900">{parent.mother_name}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-600">Pekerjaan Ayah:</dt>
                                            <dd className="font-medium text-gray-900">{parent.father_occupation}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-600">Pekerjaan Ibu:</dt>
                                            <dd className="font-medium text-gray-900">{parent.mother_occupation}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-600">Nomor HP:</dt>
                                            <dd className="font-medium text-gray-900">{parent.phone_number}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t">
                            <h3 className="font-semibold text-gray-700 mb-3 text-lg">Status Pendaftaran</h3>
                            <div className="flex items-center gap-3">
                                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${registration.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                    }`}>
                                    {getStatusLabel(registration.status)}
                                </span>
                                <span className="text-gray-600 text-sm">
                                    Tanggal Daftar: {formatDate(registration.created_at)}
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-blue-50 border-blue-200">
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">Langkah Selanjutnya:</h3>
                    <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                        <li>Tim kami akan memverifikasi data dan dokumen Anda dalam 1-3 hari kerja</li>
                        <li>Anda akan dihubungi melalui nomor HP yang terdaftar</li>
                        <li>Jika diterima, Anda akan mendapatkan informasi lebih lanjut tentang daftar ulang</li>
                    </ol>
                    <p className="mt-4 text-sm text-gray-600">
                        <strong>Catatan:</strong> Pastikan nomor HP yang terdaftar aktif dan dapat dihubungi.
                    </p>
                </Card>

                <div className="text-center mt-8">
                    <Link href="/">
                        <Button size="lg">
                            Kembali ke Beranda
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    )
}
