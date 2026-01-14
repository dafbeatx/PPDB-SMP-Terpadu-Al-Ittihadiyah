import Card from '@/components/ui/Card'
import { Trophy, Users, BookOpen, Star } from 'lucide-react'
import { getContentMap } from '@/lib/content'

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
        <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-green-50">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Keunggulan Sekolah
                        </h2>
                        <p className="text-lg text-gray-600">
                            Mengapa memilih SMP Terpadu Al-Ittihadiyah?
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {keunggulanList.map((item, index) => {
                            const Icon = item.icon
                            return (
                                <Card
                                    key={index}
                                    className="p-6 hover:shadow-lg transition-shadow duration-300 text-center"
                                >
                                    <div className="flex justify-center mb-4">
                                        <div className={`p-4 rounded-full ${item.color}`}>
                                            <Icon className="w-8 h-8" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {item.description}
                                    </p>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
