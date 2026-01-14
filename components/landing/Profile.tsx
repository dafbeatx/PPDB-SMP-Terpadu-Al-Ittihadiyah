import Card from '@/components/ui/Card'
import { School, Building2, Trophy } from 'lucide-react'
import { getContentMap } from '@/lib/content'
import ScrollReveal from '@/components/ScrollReveal'

export default async function Profile() {
    const content = await getContentMap('profile')

    // Profile section uses 'profile.key' format for main content
    const title = content['profile.title'] || 'Profil Sekolah'
    const subtitle = content['profile.subtitle'] || 'Mengenal lebih dekat SMP Terpadu Al-Ittihadiyah'
    const paragraph1 = content['profile.paragraph_1'] || ''
    const paragraph2 = content['profile.paragraph_2'] || ''

    return (
        <section id="profil" className="py-16 md:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <ScrollReveal direction="up">
                        <div className="text-center mb-12">
                            <div className="flex justify-center mb-4">
                                <div className="bg-green-100 p-4 rounded-full">
                                    <School className="w-12 h-12 text-green-600" />
                                </div>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                {title}
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                {subtitle}
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Description */}
                    {(paragraph1 || paragraph2) && (
                        <ScrollReveal direction="up" delay={0.2}>
                            <Card className="p-6 md:p-8 mb-8 bg-gradient-to-br from-green-50 to-blue-50 border-none shadow-md md:hover:shadow-lg md:hover:-translate-y-1 transition-all duration-300">
                                <div className="space-y-4">
                                    {paragraph1 && (
                                        <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                                            {paragraph1}
                                        </p>
                                    )}
                                    {paragraph2 && (
                                        <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                                            {paragraph2}
                                        </p>
                                    )}
                                </div>
                            </Card>
                        </ScrollReveal>
                    )}

                    {/* Fasilitas & Program Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Fasilitas Card */}
                        <ScrollReveal direction="right" delay={0.3}>
                            <Card className="p-6 md:p-8 border-2 border-green-100 md:hover:shadow-xl md:hover:-translate-y-2 transition-all duration-300 group h-full">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-green-100 p-3 rounded-lg group-hover:scale-110 transition-transform">
                                        <Building2 className="w-6 h-6 text-green-600" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                                        Fasilitas
                                    </h3>
                                </div>
                                <ul className="space-y-3">
                                    {[1, 2, 3, 4].map((num) => {
                                        const item = content[`fasilitas.item_${num}`]
                                        if (!item) return null
                                        return (
                                            <li
                                                key={num}
                                                className="flex items-start gap-3 text-gray-700 group/item"
                                            >
                                                <span className="text-green-600 font-bold mt-1 group-hover/item:scale-110 transition-transform">✓</span>
                                                <span className="flex-1 text-base leading-relaxed">{item}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </Card>
                        </ScrollReveal>

                        {/* Program Unggulan Card */}
                        <ScrollReveal direction="left" delay={0.3}>
                            <Card className="p-6 md:p-8 border-2 border-blue-100 md:hover:shadow-xl md:hover:-translate-y-2 transition-all duration-300 group h-full">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-blue-100 p-3 rounded-lg group-hover:scale-110 transition-transform">
                                        <Trophy className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                                        Program Unggulan
                                    </h3>
                                </div>
                                <ul className="space-y-3">
                                    {[1, 2, 3, 4].map((num) => {
                                        const item = content[`program.item_${num}`]
                                        if (!item) return null
                                        return (
                                            <li
                                                key={num}
                                                className="flex items-start gap-3 text-gray-700 group/item"
                                            >
                                                <span className="text-blue-600 font-bold mt-1 group-hover/item:scale-110 transition-transform">✓</span>
                                                <span className="flex-1 text-base leading-relaxed">{item}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </Card>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    )
}
