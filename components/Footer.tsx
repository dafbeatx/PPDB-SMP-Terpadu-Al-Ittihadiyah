import { getContentMap } from '@/lib/content'
import { GraduationCap } from 'lucide-react'

export default async function Footer() {
    // Fetch footer content from CMS
    const footer = await getContentMap('footer')

    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <GraduationCap className="w-8 h-8" />
                            <h3 className="font-bold text-xl">SMP Terpadu Al-Ittihadiyah</h3>
                        </div>
                        <p className="text-gray-400">
                            {footer['footer.school_desc'] || 'Lembaga pendidikan Islam terpadu yang berkomitmen mencetak generasi unggul dan berakhlak mulia.'}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Kontak</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>📍 {footer['footer.address'] || 'Alamat belum diatur'}</li>
                            <li>📞 {footer['footer.phone'] || 'Telepon belum diatur'}</li>
                            <li>✉️ {footer['footer.email'] || 'Email belum diatur'}</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Jam Operasional</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>{footer['footer.hours_weekday'] || 'Senin - Jumat: Belum diatur'}</li>
                            <li>{footer['footer.hours_saturday'] || 'Sabtu: Belum diatur'}</li>
                            <li>{footer['footer.hours_sunday'] || 'Minggu: Libur'}</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                    <p>&copy; 2026 SMP Terpadu Al-Ittihadiyah. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
