import Link from 'next/link'
import Button from '@/components/ui/Button'
import { getContentMap } from '@/lib/content'
import Image from 'next/image'

export default async function Hero() {
    const content = await getContentMap('hero')

    const schoolName = content.school_name || 'SMP Terpadu Al-Ittihadiyah'
    const tagline = content.tagline || 'Pendaftaran Peserta Didik Baru (PPDB)'
    const year = content.year || 'Tahun Ajaran 2026/2027'
    const statExperience = content.stat_experience || '20'
    const statGraduate = content.stat_graduate || '95'
    const statAccreditation = content.stat_accreditation || 'A'

    return (
        <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-blue-800 text-white py-20 md:py-32">
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex justify-center mb-6">
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full">
                            <Image
                                src="/logo.png"
                                alt="Logo SMP Terpadu Al-Ittihadiyah"
                                width={64}
                                height={64}
                                className="w-16 h-16 object-contain"
                            />
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                        {schoolName}
                    </h1>

                    <p className="text-xl md:text-2xl mb-4 text-green-50">
                        {tagline}
                    </p>

                    <p className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl mx-auto">
                        {year}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/daftar">
                            <Button size="lg" className="w-full sm:w-auto bg-white text-green-700 hover:bg-gray-100">
                                Daftar Sekarang
                            </Button>
                        </Link>
                        <a href="#alur">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                                Lihat Alur Pendaftaran
                            </Button>
                        </a>
                    </div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                            <div className="text-3xl font-bold mb-2">{statExperience}+</div>
                            <div className="text-white/90">Tahun Berpengalaman</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                            <div className="text-3xl font-bold mb-2">{statGraduate}%</div>
                            <div className="text-white/90">Lulusan Melanjutkan ke SMA</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                            <div className="text-3xl font-bold mb-2">{statAccreditation}</div>
                            <div className="text-white/90">Akreditasi Sekolah</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
