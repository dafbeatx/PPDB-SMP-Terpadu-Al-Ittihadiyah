import Link from 'next/link'
import Button from '@/components/ui/Button'
import { getContentMap } from '@/lib/content'
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'
import Counter from '@/components/Counter'
import ParallaxHeroBg from '@/components/landing/ParallaxHeroBg'

export default async function Hero() {
    const content = await getContentMap('hero')

    // Basic fallbacks for CMS content
    const schoolName = content['hero.school_name'] || 'SMP Terpadu Al-Ittihadiyah'
    const tagline = content['hero.tagline'] || 'Unggul dalam Prestasi, Berakhlak Mulia, Berjiwa Pemimpin'
    const year = content['hero.year'] || 'Tahun Ajaran 2026/2027'

    // Stats fallbacks
    const statExperience = parseInt(content['hero.stat_experience']) || 15
    const statGraduate = parseInt(content['hero.stat_graduate']) || 98
    const statAccreditation = content['hero.stat_accreditation'] || 'A'

    return (
        <section id="hero" className="relative bg-gradient-to-br from-green-600 via-green-700 to-blue-800 text-white pt-28 pb-20 md:py-32 overflow-hidden">
            <ParallaxHeroBg />

            <div className="container mx-auto px-4 relative z-10">
                <ScrollReveal direction="up" distance={40}>
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex justify-center mb-4 md:mb-8">
                            <div className="bg-white/10 backdrop-blur-md p-3 md:p-4 rounded-3xl border border-white/20 hover:scale-110 transition-transform duration-300 shadow-2xl">
                                <Image
                                    src="/logo.png"
                                    alt="Logo SMP Terpadu Al-Ittihadiyah"
                                    width={80}
                                    height={80}
                                    className="w-16 h-16 md:w-20 md:h-20 object-contain"
                                    priority
                                />
                            </div>
                        </div>

                        <h1 className="text-[32px] md:text-6xl font-extrabold mb-4 leading-[1.15] md:leading-tight tracking-tight">
                            <span className="block md:inline">SMP Terpadu</span>
                            <span className="hidden md:inline"> </span>
                            <span className="block md:inline text-green-300 md:text-white mt-1 md:mt-0">Al-Ittihadiyah</span>
                        </h1>

                        <p className="text-lg md:text-2xl mb-6 md:mb-8 text-green-50 font-medium max-w-2xl mx-auto leading-relaxed">
                            {tagline}
                        </p>

                        <div className="bg-white/10 backdrop-blur-sm inline-block px-4 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest text-white/90 border border-white/10 mb-10">
                            {year}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/daftar" className="w-full sm:w-auto">
                                <Button size="lg" className="w-full sm:w-80 bg-white text-green-700 hover:bg-gray-100 shadow-xl shadow-green-900/40 text-lg py-7">
                                    Daftar Sekarang
                                </Button>
                            </Link>
                            <a href="#alur" className="w-full sm:w-auto">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 shadow-lg px-8">
                                    Lihat Alur
                                </Button>
                            </a>
                        </div>

                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <ScrollReveal direction="up" delay={0.2} distance={20} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/20 transition-colors">
                                <div className="text-3xl font-bold mb-2">
                                    <Counter value={statExperience} suffix="+" />
                                </div>
                                <div className="text-white/90 text-sm font-medium">Tahun Berpengalaman</div>
                            </ScrollReveal>
                            <ScrollReveal direction="up" delay={0.3} distance={20} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/20 transition-colors">
                                <div className="text-3xl font-bold mb-2">
                                    <Counter value={statGraduate} suffix="%" />
                                </div>
                                <div className="text-white/90 text-sm font-medium">Lulusan Melanjutkan ke SMA</div>
                            </ScrollReveal>
                            <ScrollReveal direction="up" delay={0.4} distance={20} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/20 transition-colors">
                                <div className="text-3xl font-bold mb-2">{statAccreditation}</div>
                                <div className="text-white/90 text-sm font-medium">Akreditasi Sekolah</div>
                            </ScrollReveal>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}
