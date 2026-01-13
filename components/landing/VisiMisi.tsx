import Card from '@/components/ui/Card'
import { Target, Eye } from 'lucide-react'

export default function VisiMisi() {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Visi & Misi
                        </h2>
                        <p className="text-lg text-gray-600">
                            Arah dan tujuan pendidikan kami
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="p-8 border-l-4 border-green-600">
                            <div className="flex items-center mb-4">
                                <div className="bg-green-100 p-3 rounded-lg mr-4">
                                    <Eye className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Visi</h3>
                            </div>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                Menjadi lembaga pendidikan Islam terpadu yang unggul dalam prestasi, berakhlak mulia,
                                dan berjiwa pemimpin berdasarkan nilai-nilai Al-Quran dan As-Sunnah.
                            </p>
                        </Card>

                        <Card className="p-8 border-l-4 border-blue-600">
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                    <Target className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Misi</h3>
                            </div>
                            <ul className="space-y-3 text-gray-700 text-lg">
                                <li className="flex items-start">
                                    <span className="text-blue-600 font-bold mr-2">1.</span>
                                    <span>Menyelenggarakan pendidikan berkualitas dengan kurikulum terpadu</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 font-bold mr-2">2.</span>
                                    <span>Membentuk karakter Islami yang kuat</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 font-bold mr-2">3.</span>
                                    <span>Mengembangkan potensi siswa secara maksimal</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 font-bold mr-2">4.</span>
                                    <span>Menciptakan lingkungan belajar yang kondusif</span>
                                </li>
                            </ul>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
