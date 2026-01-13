import Card from '@/components/ui/Card'
import { School } from 'lucide-react'
import { getContentMap } from '@/lib/content'

export default async function Profile() {
    const content = await getContentMap('profile')

    const title = content.title || 'Profil Sekolah'
    const subtitle = content.subtitle || 'Mengenal lebih dekat SMP Terpadu Al-Ittihadiyah'
    const paragraph1 = content.paragraph_1 || ''
    const paragraph2 = content.paragraph_2 || ''

    return (
        <section className="py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="flex justify-center mb-4">
                            <School className="w-12 h-12 text-green-600" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {title}
                        </h2>
                        <p className="text-lg text-gray-600">
                            {subtitle}
                        </p>
                    </div>

                    <Card className="p-8 md:p-12">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-700 leading-relaxed mb-6">
                                {paragraph1}
                            </p>

                            <p className="text-gray-700 leading-relaxed mb-6">
                                {paragraph2}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                                <div>
                                    <h3 className="font-semibold text-green-700 text-lg mb-2">🏫 Fasilitas</h3>
                                    <ul className="text-gray-700 space-y-2 list-none">
                                        <li>✓ Ruang kelas ber-AC</li>
                                        <li>✓ Laboratorium Komputer & Sains</li>
                                        <li>✓ Perpustakaan Digital</li>
                                        <li>✓ Lapangan Olahraga</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-green-700 text-lg mb-2">👨‍🏫 Program Unggulan</h3>
                                    <ul className="text-gray-700 space-y-2 list-none">
                                        <li>✓ Tahfidz Al-Quran</li>
                                        <li>✓ Bahasa Arab & Inggris</li>
                                        <li>✓ Olimpiade Sains</li>
                                        <li>✓ Ekstrakurikuler Beragam</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    )
}
