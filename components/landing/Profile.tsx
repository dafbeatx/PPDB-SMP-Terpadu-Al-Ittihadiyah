import Card from '@/components/ui/Card'
import { School } from 'lucide-react'

export default function Profile() {
    return (
        <section className="py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="flex justify-center mb-4">
                            <School className="w-12 h-12 text-green-600" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Profil Sekolah
                        </h2>
                        <p className="text-lg text-gray-600">
                            Mengenal lebih dekat SMP Terpadu Al-Ittihadiyah
                        </p>
                    </div>

                    <Card className="p-8 md:p-12">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-700 leading-relaxed mb-6">
                                SMP Terpadu Al-Ittihadiyah adalah lembaga pendidikan Islam yang berkomitmen untuk
                                mencetak generasi unggul dalam prestasi akademik dan berakhlak mulia. Dengan
                                pengalaman lebih dari 20 tahun, kami telah melahirkan ribuan alumni yang sukses
                                di berbagai bidang.
                            </p>

                            <p className="text-gray-700 leading-relaxed mb-6">
                                Sekolah kami menggabungkan kurikulum nasional dengan pendidikan karakter Islami,
                                menciptakan lingkungan belajar yang kondusif dan menyenangkan. Didukung oleh tenaga
                                pendidik yang profesional dan berpengalaman, serta fasilitas yang lengkap dan modern.
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
