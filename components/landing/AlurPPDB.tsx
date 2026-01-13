import Link from 'next/link'
import Button from '@/components/ui/Button'
import { FileText, Upload, CheckCircle, UserCheck } from 'lucide-react'

const steps = [
    {
        number: '1',
        icon: FileText,
        title: 'Isi Formulir',
        description: 'Lengkapi data siswa dan orang tua dengan benar',
    },
    {
        number: '2',
        icon: Upload,
        title: 'Upload Dokumen',
        description: 'Unggah KTP, Kartu Keluarga, dan Ijazah (format JPG)',
    },
    {
        number: '3',
        icon: UserCheck,
        title: 'Verifikasi Admin',
        description: 'Tim kami akan memverifikasi data Anda (1-3 hari kerja)',
    },
    {
        number: '4',
        icon: CheckCircle,
        title: 'Konfirmasi Diterima',
        description: 'Anda akan dihubungi untuk proses selanjutnya',
    },
]

export default function AlurPPDB() {
    return (
        <section id="alur" className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Alur Pendaftaran PPDB
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Proses pendaftaran yang mudah dan cepat
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {steps.map((step, index) => {
                            const Icon = step.icon
                            const isLast = index === steps.length - 1

                            return (
                                <div key={index} className="relative">
                                    <div className="text-center">
                                        <div className="relative inline-block mb-4">
                                            <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-2 mx-auto">
                                                {step.number}
                                            </div>
                                            {!isLast && (
                                                <div className="hidden lg:block absolute top-8 left-full w-24 h-0.5 bg-green-200"></div>
                                            )}
                                        </div>

                                        <div className="bg-green-50 p-4 rounded-lg mb-3">
                                            <Icon className="w-10 h-10 text-green-600 mx-auto" />
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="text-center bg-green-50 rounded-xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Siap Mendaftar?
                        </h3>
                        <p className="text-gray-600 mb-6 text-lg">
                            Proses pendaftaran online hanya membutuhkan waktu sekitar 10-15 menit
                        </p>
                        <Link href="/daftar">
                            <Button size="lg">
                                Mulai Pendaftaran Sekarang
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
