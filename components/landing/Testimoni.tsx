'use client'

import { Star, Quote } from 'lucide-react'
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'
import Card from '@/components/ui/Card'

const TESTIMONIALS = [
    {
        name: "Hj. Siti Aminah",
        role: "Orang Tua Siswa",
        content: "Alhamdulillah, anak saya mengalami perkembangan pesat baik secara akademik maupun karakter sejak sekolah di sini. Lingkungan yang Islami sangat membantu.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siti",
        rating: 5
    },
    {
        name: "Bpk. Rahmat Hidayat",
        role: "Orang Tua Alumni",
        content: "Kurikulum terpadu di SMP Al-Ittihadiyah sangat luar biasa. Anak saya lulus dengan hafalan Al-Quran yang baik dan bisa bersaing di SMA favorit.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahmat",
        rating: 5
    },
    {
        name: "Nabila Putri",
        role: "Alumni 2023",
        content: "Banyak kenangan indah di sini. Guru-gurunya sangat sabar dan suportif. Fasilitasnya juga lengkap untuk mendukung hobi basket saya.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nabila",
        rating: 5
    }
]

export default function Testimoni() {
    return (
        <section id="testimoni" className="py-16 md:py-24 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <ScrollReveal direction="up">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Apa Kata Mereka?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Testimoni dari orang tua wali siswa dan alumni SMP Terpadu Al-Ittihadiyah
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((t, i) => (
                        <ScrollReveal key={i} direction="up" delay={i * 0.2}>
                            <Card className="p-8 h-full flex flex-col relative group hover:shadow-2xl transition-all duration-500 border-none bg-white">
                                <div className="absolute top-6 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Quote className="w-12 h-12 text-green-600" />
                                </div>

                                <div className="flex gap-1 mb-6">
                                    {[...Array(t.rating)].map((_, idx) => (
                                        <Star key={idx} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>

                                <p className="text-gray-700 italic mb-8 flex-1 leading-relaxed">
                                    "{t.content}"
                                </p>

                                <div className="flex items-center gap-4">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-green-100 group-hover:border-green-500 transition-colors">
                                        <Image
                                            src={t.avatar}
                                            alt={t.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{t.name}</h4>
                                        <p className="text-xs text-gray-500 font-medium">{t.role}</p>
                                    </div>
                                </div>
                            </Card>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
