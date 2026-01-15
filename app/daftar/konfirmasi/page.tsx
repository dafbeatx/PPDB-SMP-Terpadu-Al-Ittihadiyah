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

    console.log('Fetching registration data for ID:', id)

    // Fetch registration data
    const { data: registration, error } = await supabase
        .from('registrations')
        .select(`
            *,
            students (*),
            parents (*)
        `)
        .eq('id', id)
        .maybeSingle()

    console.log('Query result:', {
        id,
        hasRegistration: !!registration,
        hasStudent: !!registration?.students,
        hasParent: !!registration?.parents,
        studentCount: Array.isArray(registration?.students) ? registration.students.length : 'not an array',
        parentCount: Array.isArray(registration?.parents) ? registration.parents.length : 'not an array'
    })

    if (error) {
        console.error('Supabase fetch error:', error)
        // Check if it's a 404-like error or something else
        return (
            <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <Card className="max-w-md w-full p-8 text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Terjadi Kesalahan</h2>
                    <p className="text-gray-600 mb-6">
                        Gagal mengambil data pendaftaran. Silakan coba muat ulang halaman.
                    </p>
                    <Link href="/daftar">
                        <Button className="w-full">Kembali ke Pendaftaran</Button>
                    </Link>
                </Card>
            </main>
        )
    }

    if (!registration) {
        console.warn('No registration found for ID:', id)
        return (
            <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <Card className="max-w-md w-full p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Tidak Ditemukan</h2>
                    <p className="text-gray-600 mb-6">
                        Maaf, data pendaftaran dengan ID tersebut tidak dapat ditemukan.
                    </p>
                    <Link href="/daftar">
                        <Button className="w-full">Kembali ke Pendaftaran</Button>
                    </Link>
                </Card>
            </main>
        )
    }

    // Supabase .select('*, students(*)') returns an array for joins, even if it's 1-to-1 logically
    const student = Array.isArray(registration.students) ? registration.students[0] : registration.students
    const parent = Array.isArray(registration.parents) ? registration.parents[0] : registration.parents

    const fallback = <span className="text-gray-400 italic">Data tidak tersedia</span>

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

                <Card className="p-8 md:p-12 mb-6 shadow-xl border-t-4 border-t-green-600">
                    <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-6 mb-8 text-center">
                        <p className="text-sm text-gray-600 mb-2 font-medium uppercase tracking-wider">Nomor Pendaftaran Anda:</p>
                        <p className="text-3xl md:text-5xl font-extrabold text-green-700 tracking-tight">
                            {registration.registration_number || fallback}
                        </p>
                        <p className="text-sm text-gray-700 mt-4 bg-white/50 inline-block px-4 py-1 rounded-full border border-green-200">
                            Harap simpan nomor ini untuk keperluan verifikasi
                        </p>
                    </div>

                    <div className="space-y-10">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-8 w-1 bg-green-600 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-gray-900">Ringkasan Data Pendaftaran</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                                    <h3 className="font-bold text-green-800 mb-4 text-lg border-b border-green-100 pb-2">Data Siswa</h3>
                                    <dl className="space-y-4 text-sm">
                                        <div>
                                            <dt className="text-gray-500 mb-0.5">Nama Lengkap:</dt>
                                            <dd className="font-semibold text-gray-900 text-base">{student?.full_name || fallback}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-500 mb-0.5">NISN:</dt>
                                            <dd className="font-mono text-gray-900 bg-white px-2 py-0.5 rounded border border-gray-200 inline-block">{student?.nisn || fallback}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-500 mb-0.5">Tempat, Tanggal Lahir:</dt>
                                            <dd className="font-medium text-gray-900">
                                                {student ? `${student.birth_place}, ${formatDate(student.birth_date)}` : fallback}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-500 mb-0.5">Jenis Kelamin:</dt>
                                            <dd className="font-medium text-gray-900">{student?.gender || fallback}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-500 mb-0.5">Asal Sekolah:</dt>
                                            <dd className="font-medium text-gray-900">{student?.previous_school || fallback}</dd>
                                        </div>
                                    </dl>
                                </div>

                                <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                                    <h3 className="font-bold text-green-800 mb-4 text-lg border-b border-green-100 pb-2">Data Orang Tua</h3>
                                    <dl className="space-y-4 text-sm">
                                        <div>
                                            <dt className="text-gray-500 mb-0.5">Nama Ayah / Ibu:</dt>
                                            <dd className="font-semibold text-gray-900 text-base">
                                                {parent?.father_name || fallback} / {parent?.mother_name || fallback}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-500 mb-0.5">Pekerjaan Ayah:</dt>
                                            <dd className="font-medium text-gray-900">{parent?.father_occupation || fallback}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-500 mb-0.5">Pekerjaan Ibu:</dt>
                                            <dd className="font-medium text-gray-900">{parent?.mother_occupation || fallback}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-500 mb-0.5">Nomor HP:</dt>
                                            <dd className="font-bold text-green-700 text-base">{parent?.phone_number || fallback}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 text-lg">Status Pendaftaran</h3>
                            <div className="flex flex-wrap items-center gap-4">
                                <span className={`px-6 py-2.5 rounded-full text-sm font-bold shadow-sm ${registration.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        registration.status === 'verified' ? 'bg-blue-100 text-blue-800' :
                                            registration.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                                'bg-red-100 text-red-800'
                                    }`}>
                                    {getStatusLabel(registration.status || 'pending')}
                                </span>
                                <div className="text-gray-500 text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                                    Tanggal Daftar: {formatDate(registration.created_at)}
                                </div>
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
