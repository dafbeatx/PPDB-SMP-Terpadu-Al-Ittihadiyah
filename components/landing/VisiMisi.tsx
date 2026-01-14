import Card from '@/components/ui/Card'
import { Target, Eye } from 'lucide-react'
import { getContentMap } from '@/lib/content'
import ScrollReveal from '@/components/ScrollReveal'

export default async function VisiMisi() {
    const content = await getContentMap('visi_misi')

    const title = content['visi_misi.title'] || 'Visi & Misi'
    const subtitle = content['visi_misi.subtitle'] || 'Arah dan tujuan pendidikan kami'
    const visi = content['visi_misi.visi'] || 'Menjadi lembaga pendidikan Islam terpadu yang unggul dalam prestasi, berakhlak mulia, dan berjiwa pemimpin berdasarkan nilai-nilai Al-Quran dan As-Sunnah.'

    const misiItems = [
        content['visi_misi.misi_1'],
        content['visi_misi.misi_2'],
        content['visi_misi.misi_3'],
        content['visi_misi.misi_4'],
    ].filter(Boolean)

    return (
        <section className="py-16 md:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal direction="up">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                {title}
                            </h2>
                            <p className="text-lg text-gray-600">
                                {subtitle}
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ScrollReveal direction="right" delay={0.2}>
                            <Card className="p-8 border-l-4 border-green-600 md:hover:shadow-xl md:hover:border-l-8 transition-all duration-300 h-full">
                                <div className="flex items-center mb-6">
                                    <div className="bg-green-100 p-3 rounded-lg mr-4">
                                        <Eye className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">Visi</h3>
                                </div>
                                <p className="text-gray-700 leading-relaxed text-lg italic">
                                    "{visi}"
                                </p>
                            </Card>
                        </ScrollReveal>

                        <ScrollReveal direction="left" delay={0.2}>
                            <Card className="p-8 border-l-4 border-blue-600 md:hover:shadow-xl md:hover:border-l-8 transition-all duration-300 h-full">
                                <div className="flex items-center mb-6">
                                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                        <Target className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">Misi</h3>
                                </div>
                                <ul className="space-y-4 text-gray-700 text-lg">
                                    {misiItems.length > 0 ? (
                                        misiItems.map((item, index) => (
                                            <li key={index} className="flex items-start group">
                                                <span className="text-blue-600 font-bold mr-3 bg-blue-50 w-8 h-8 rounded-full flex items-center justify-center text-sm group-hover:scale-110 transition-transform">{index + 1}</span>
                                                <span className="flex-1">{item}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <>
                                            <li className="flex items-start">
                                                <span className="text-blue-600 font-bold mr-2">1.</span>
                                                <span>Menyelenggarakan pendidikan berkualitas dengan kurikulum terpadu</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-blue-600 font-bold mr-2">2.</span>
                                                <span>Membentuk karakter Islami yang kuat</span>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </Card>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    )
}
