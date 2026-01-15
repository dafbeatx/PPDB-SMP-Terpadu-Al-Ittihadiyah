import Card from '@/components/ui/Card'
import { Trophy, Users, BookOpen, Star } from 'lucide-react'
import { getContentMap } from '@/lib/content'
import ScrollReveal from '@/components/ScrollReveal'

export default async function Keunggulan() {
    // Fetch content from CMS
    const content = await getContentMap('keunggulan')

    // Build keunggulan list with CMS data and hardcoded icons/colors
    const keunggulanList = [
        {
            icon: Trophy,
            title: content['item_1.title'] || 'Prestasi Akademik',
            description: content['item_1.description'] || 'Siswa kami konsisten meraih prestasi di berbagai kompetisi lokal dan nasional',
            color: 'bg-yellow-100 text-yellow-600',
        },
        {
            icon: BookOpen,
            title: content['item_2.title'] || 'Kurikulum Terpadu',
            description: content['item_2.description'] || 'Menggabungkan kurikulum nasional dengan pendidikan agama Islam yang komprehensif',
            color: 'bg-blue-100 text-blue-600',
        },
        {
            icon: Users,
            title: content['item_3.title'] || 'Guru Profesional',
            description: content['item_3.description'] || 'Tenaga pendidik berpengalaman, berkompeten, dan penuh dedikasi',
            color: 'bg-green-100 text-green-600',
        },
        {
            icon: Star,
            title: content['item_4.title'] || 'Fasilitas Lengkap',
            description: content['item_4.description'] || 'Sarana prasarana modern untuk mendukung kegiatan belajar mengajar',
            color: 'bg-purple-100 text-purple-600',
        },
    ]

    return (
        <section id="keunggulan" className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-green-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal direction="up">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                {content['keunggulan.title'] || 'Keunggulan Sekolah'}
                            </h2>
                            <p className="text-lg text-gray-600">
                                {content['keunggulan.subtitle'] || 'Mengapa memilih SMP Terpadu Al-Ittihadiyah?'}
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {keunggulanList.map((item, index) => {
                            const Icon = item.icon
                            return (
                                <ScrollReveal
                                    key={index}
                                    direction="up"
                                    delay={0.1 * index}
                                >
                                    <Card
                                        className="p-6 md:hover:shadow-xl md:hover:-translate-y-2 transition-all duration-300 text-center h-full group border-none shadow-sm"
                                    >
                                        <div className="flex justify-center mb-4 text-center">
                                            <div className={`p-4 rounded-full ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                                                <Icon className="w-8 h-8" />
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed text-sm">
                                            {item.description}
                                        </p>
                                    </Card>
                                </ScrollReveal>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
