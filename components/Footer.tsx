import { getContentMap } from '@/lib/content'
import { GraduationCap, MapPin, Phone, Mail, Instagram, Github, Clock } from 'lucide-react'

export default async function Footer() {
    // Fetch footer content from CMS
    const footer = await getContentMap('footer')

    const address = footer['footer.address'] || 'Kp. Pasar Selasa RT 03/01, Desa Ciampea Udik, Kecamatan Ciampea, Kabupaten Bogor, Jawa Barat 16620, Indonesia.'
    const phone = footer['footer.phone'] || '(+62) 895-3512-51395'
    const email = footer['footer.email'] || 'smptalittihadiyah@gmail.com'

    // Sanitize phone for WhatsApp link
    const waPhone = phone.replace(/\D/g, '')
    const waLink = `https://wa.me/${waPhone.startsWith('0') ? '62' + waPhone.slice(1) : waPhone}`
    const mapsLink = 'https://share.google/4gGhSkEPrRiBHSBB5'
    const igLink = 'https://www.instagram.com/smpterpadu_alittihadiyah/'
    const githubLink = 'https://github.com/dafbeatx/PPDB-SMP-Terpadu-Al-Ittihadiyah'

    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
                    {/* Brand & Description */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
                        <div className="flex flex-col items-center md:flex-row md:items-center gap-3">
                            <div className="p-2 bg-green-600 rounded-lg shrink-0">
                                <GraduationCap className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-bold text-xl leading-tight">
                                SMP Terpadu <br className="hidden md:block" />
                                <span className="text-green-500 text-lg">Al-Ittihadiyah</span>
                            </h3>
                        </div>
                        <p className="text-gray-400 leading-relaxed max-w-sm mx-auto md:mx-0">
                            {footer['footer.school_desc'] || 'Terwujudnya SMP Terpadu Al-Ittihadiyah yang Aktif, Kreatif, Bersih, Antusias, dan Religius (AKBAR).'}
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                            <a
                                href={igLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-pink-600 transition-all duration-300 group"
                                title="Instagram"
                            >
                                <Instagram className="w-5 h-5 text-gray-300 group-hover:text-white" />
                            </a>
                            <a
                                href={githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 group"
                                title="GitHub"
                            >
                                <Github className="w-5 h-5 text-gray-300 group-hover:text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
                        <h4 className="text-lg font-semibold relative inline-block pb-2">
                            Kontak Kami
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-12 h-1 bg-green-500 rounded-full"></span>
                        </h4>
                        <ul className="w-full space-y-4">
                            <li>
                                <a
                                    href={mapsLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center md:flex-row md:items-start gap-3 md:gap-4 text-gray-400 hover:text-green-400 transition-colors group"
                                >
                                    <div className="p-2 bg-gray-800 rounded-lg md:bg-transparent md:p-0 shrink-0 group-hover:bg-gray-700 md:group-hover:bg-transparent transition-colors">
                                        <MapPin className="w-5 h-5 text-green-500 md:mt-1 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <span className="text-sm leading-relaxed max-w-xs md:max-w-none">{address}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center md:flex-row md:items-center gap-3 md:gap-4 text-gray-400 hover:text-green-400 transition-colors group"
                                >
                                    <div className="p-2 bg-gray-800 rounded-lg md:bg-transparent md:p-0 shrink-0 group-hover:bg-gray-700 md:group-hover:bg-transparent transition-colors">
                                        <Phone className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <span className="text-sm font-medium">{phone}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${email}`}
                                    className="flex flex-col items-center md:flex-row md:items-center gap-3 md:gap-4 text-gray-400 hover:text-green-400 transition-colors group"
                                >
                                    <div className="p-2 bg-gray-800 rounded-lg md:bg-transparent md:p-0 shrink-0 group-hover:bg-gray-700 md:group-hover:bg-transparent transition-colors">
                                        <Mail className="w-5 h-5 text-green-500 shrink-0 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <span className="text-sm font-medium break-all">{email}</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Operation Hours */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 w-full lg:w-auto">
                        <h4 className="text-lg font-semibold relative inline-block pb-2">
                            Jam Operasional
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-12 h-1 bg-green-500 rounded-full"></span>
                        </h4>
                        <div className="w-full bg-gray-800/50 p-6 rounded-2xl space-y-4 border border-gray-700/50">
                            <div className="flex items-center justify-center md:justify-start gap-3">
                                <Clock className="w-5 h-5 text-green-500" />
                                <span className="text-gray-300 text-sm font-medium">Waktu Kerja</span>
                            </div>
                            <ul className="space-y-3 text-sm">
                                <li className="flex flex-col sm:flex-row justify-between text-gray-400 gap-1">
                                    <span>Senin - Jumat</span>
                                    <span className="text-white font-medium">{footer['footer.hours_weekday'] || '07:30 - 13:00'}</span>
                                </li>
                                <li className="flex flex-col sm:flex-row justify-between text-gray-400 gap-1">
                                    <span>Sabtu</span>
                                    <span className="text-white font-medium">{footer['footer.hours_saturday'] || '07:30 - 12:00'}</span>
                                </li>
                                <li className="flex flex-col sm:flex-row justify-between text-gray-400 gap-1">
                                    <span>Minggu</span>
                                    <span className="text-gray-500">{footer['footer.hours_sunday'] || 'Libur'}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-gray-500 text-sm text-center md:text-left">
                    <p>&copy; {new Date().getFullYear()} SMP Terpadu Al-Ittihadiyah. All rights reserved.</p>
                    <div className="flex items-center justify-center gap-6">
                        <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
                        <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
