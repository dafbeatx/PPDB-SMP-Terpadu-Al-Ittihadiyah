'use client'

import Image from 'next/image'
import Card from '@/components/ui/Card'
import ScrollReveal from '@/components/ScrollReveal'

export default function PrincipalWelcome() {
    return (
        <section className="py-16 md:py-24 bg-[#f4f9f6]">
            <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal direction="up">
                        <div className="flex flex-col md:flex-row items-center md:items-center gap-10 md:gap-16">
                            {/* Photo Column */}
                            <div className="w-full md:w-[280px] flex justify-center flex-shrink-0">
                                <Card className="overflow-hidden rounded-2xl border-none shadow-xl bg-white p-2 w-[240px] md:w-full">
                                    <div className="relative rounded-xl overflow-hidden aspect-[3/4]">
                                        <Image
                                            src="/kepala-sekolah.webp"
                                            alt="Kepala Sekolah SMP Terpadu Al-Ittihadiyah"
                                            fill
                                            sizes="(max-width: 768px) 240px, 280px"
                                            className="object-cover"
                                            priority
                                        />
                                    </div>
                                    <div className="p-4 text-center">
                                        <h3 className="text-lg font-bold text-gray-900 leading-tight">Farhan Sopian Sahid, S.Pd.I</h3>
                                        <p className="text-sm text-green-700 font-semibold mt-1">Kepala Sekolah</p>
                                    </div>
                                </Card>
                            </div>

                            {/* Text Column */}
                            <div className="w-full flex-1">
                                <div className="space-y-6 text-center md:text-left">
                                    <div className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest mb-2">
                                        Sambutan Kepala Sekolah
                                    </div>

                                    <h2 className="text-3xl md:text-4xl font-bold text-green-700 leading-tight">
                                        Mencetak Generasi <span className="text-gray-900">Unggul & Berakhlak</span>
                                    </h2>

                                    <div className="space-y-5 text-[#333333] text-base md:text-lg leading-[1.7] md:leading-[1.8]">
                                        <p className="font-semibold text-gray-900">
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
                                        <p className="font-bold text-gray-900 mt-6 pt-4 border-t border-green-100 md:border-none">
                                            Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh.
                                        </p>
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
