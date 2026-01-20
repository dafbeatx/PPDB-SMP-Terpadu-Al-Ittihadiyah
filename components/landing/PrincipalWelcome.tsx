'use client'

import Image from 'next/image'
import Card from '@/components/ui/Card'
import ScrollReveal from '@/components/ScrollReveal'
import { Quote } from 'lucide-react'

export default function PrincipalWelcome() {
    return (
        <section className="py-16 md:py-24 bg-green-50/50">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal direction="up">
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                            {/* Photo Column */}
                            <div className="w-full md:w-2/5 lg:w-1/3">
                                <div className="relative group">
                                    <div className="absolute -inset-4 bg-green-200/50 rounded-3xl blur-2xl group-hover:bg-green-300/50 transition-colors duration-500"></div>
                                    <Card className="relative overflow-hidden rounded-2xl border-none shadow-2xl">
                                        <Image
                                            src="/kepala-sekolah.webp"
                                            alt="Kepala Sekolah SMP Terpadu Al-Ittihadiyah"
                                            width={600}
                                            height={800}
                                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                            priority
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-900/90 to-transparent p-6 text-white">
                                            <h3 className="text-xl font-bold">H. Ahmad Syaifuddin, S.Th.I</h3>
                                            <p className="text-sm text-green-200 font-medium">Kepala Sekolah</p>
                                        </div>
                                    </Card>
                                </div>
                            </div>

                            {/* Text Column */}
                            <div className="w-full md:w-3/5 lg:w-2/3">
                                <div className="relative">
                                    <div className="absolute -top-10 -left-6 opacity-10">
                                        <Quote className="w-20 h-20 text-green-600" />
                                    </div>

                                    <div className="relative space-y-6">
                                        <div className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-bold uppercase tracking-wider mb-2">
                                            Sambutan Kepala Sekolah
                                        </div>

                                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                                            Mencetak Generasi <span className="text-green-600">Unggul & Berakhlak</span>
                                        </h2>

                                        <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                                            <p>
                                                Assalamu&apos;alaikum Warahmatullahi Wabarakatuh.
                                            </p>
                                            <p>
                                                Puji syukur kehadirat Allah SWT atas segala limpahan rahmat-Nya. Selamat datang di portal PPDB Online SMP Terpadu Al-Ittihadiyah. Kami sangat bangga dan antusias menyambut Bapak/Ibu serta calon peserta didik baru untuk bergabung dalam keluarga besar kami pada Tahun Ajaran 2026/2027.
                                            </p>
                                            <p>
                                                Di SMP Terpadu Al-Ittihadiyah, kami berkomitmen tidak hanya untuk memberikan pendidikan akademik yang berkualitas, tetapi juga membentuk karakter siswa yang berlandaskan nilai-nilai keislaman, disiplin, dan jiwa kepemimpinan. Kami percaya bahwa setiap anak memiliki potensi unik yang harus diasah dengan pendekatan yang tepat.
                                            </p>
                                            <p>
                                                Mari bersama-sama kita wujudkan masa depan putra-putri kita menjadi generasi yang tidak hanya cerdas secara intelektual, namun juga kokoh dalam akhlak dan iman. Terima kasih atas kepercayaan Bapak/Ibu kepada institusi kami.
                                            </p>
                                            <p className="font-bold text-gray-900">
                                                Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    )
}
