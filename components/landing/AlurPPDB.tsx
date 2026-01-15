import Link from 'next/link'
import Button from '@/components/ui/Button'
import { FileText, Upload, CheckCircle, UserCheck } from 'lucide-react'
import { getContentMap } from '@/lib/content'
import Card from '@/components/ui/Card'
import ScrollReveal from '@/components/ScrollReveal'

export default async function AlurPPDB() {
    const content = await getContentMap('alur')

    const title = content['alur.title'] || 'Alur Pendaftaran PPDB'
    const subtitle = content['alur.subtitle'] || 'Proses pendaftaran yang mudah dan cepat'
    const ctaTitle = content['alur.cta_title'] || 'Siap Mendaftar?'
    const ctaText = content['alur.cta_text'] || 'Proses pendaftaran online hanya membutuhkan waktu sekitar 10-15 menit'

    const steps = [
        {
            number: '1',
            icon: FileText,
            title: content['alur.step_1_title'] || 'Isi Formulir',
            description: content['alur.step_1_desc'] || 'Lengkapi data siswa dan orang tua dengan benar',
        },
        {
            number: '2',
            icon: Upload,
            title: content['alur.step_2_title'] || 'Upload Dokumen',
            description: content['alur.step_2_desc'] || 'Unggah KTP, Kartu Keluarga, dan Ijazah (format JPG)',
        },
        {
            number: '3',
            icon: UserCheck,
            title: content['alur.step_3_title'] || 'Verifikasi Admin',
            description: content['alur.step_3_desc'] || 'Tim kami akan memverifikasi data Anda (1-3 hari kerja)',
        },
        {
            number: '4',
            icon: CheckCircle,
            title: content['alur.step_4_title'] || 'Konfirmasi Diterima',
            description: content['alur.step_4_desc'] || 'Anda akan dihubungi untuk proses selanjutnya',
        },
    ]

    return (
        <section id="alur" className="py-16 lg:py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal direction="up">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                                {title}
                            </h2>
                            <p className="text-lg text-gray-600 mb-8">
                                {subtitle}
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 xl:gap-8 mb-16">
                        {steps.map((step, index) => {
                            const Icon = step.icon
                            const isLast = index === steps.length - 1

                            return (
                                <ScrollReveal
                                    key={index}
                                    direction="up"
                                    delay={index * 0.1}
                                    distance={20}
                                >
                                    <Card className="p-8 text-center h-full group hover:shadow-xl transition-all duration-300 border-none bg-green-50/30">
                                        <div className="relative inline-block mb-6">
                                            <div className="bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold mb-0 mx-auto group-hover:scale-110 transition-transform shadow-lg shadow-green-100">
                                                {step.number}
                                            </div>
                                        </div>

                                        <div className="bg-white w-20 h-20 rounded-2xl mb-6 mx-auto flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                                            <Icon className="w-10 h-10 text-green-600" />
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed text-sm">
                                            {step.description}
                                        </p>
                                    </Card>
                                </ScrollReveal>
                            )
                        })}
                    </div>

                    <ScrollReveal direction="up" delay={0.4}>
                        <div className="text-center bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 md:p-12 lg:p-16 border border-green-100 shadow-sm md:hover:shadow-md transition-shadow max-w-5xl mx-auto">
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                                {ctaTitle}
                            </h3>
                            <p className="text-gray-600 mb-10 text-lg lg:text-xl max-w-2xl mx-auto">
                                {ctaText}
                            </p>
                            <Link href="/daftar">
                                <Button size="lg" className="px-8 py-6 text-lg rounded-xl shadow-lg shadow-green-200">
                                    Mulai Pendaftaran Sekarang
                                </Button>
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    )
}
