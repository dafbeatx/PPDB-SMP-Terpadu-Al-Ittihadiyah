import type { Metadata } from 'next'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import './globals.css'
import { GraduationCap } from 'lucide-react'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})


export const metadata: Metadata = {
  title: 'PPDB SMP Terpadu Al-Ittihadiyah - Pendaftaran Siswa Baru',
  description: 'Pendaftaran Peserta Didik Baru (PPDB) SMP Terpadu Al-Ittihadiyah Tahun Ajaran 2026/2027. Daftar sekarang dengan mudah dan cepat!',
  keywords: 'PPDB, Pendaftaran, SMP Al-Ittihadiyah, Sekolah Islam, Pendidikan',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              <Link href="/" className="flex items-center gap-3">
                <GraduationCap className="w-8 h-8 text-green-600" />
                <div>
                  <div className="font-bold text-lg text-gray-900">SMP Terpadu Al-Ittihadiyah</div>
                  <div className="text-sm text-gray-600">PPDB 2026/2027</div>
                </div>
              </Link>

              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base"
                >
                  Login Admin
                </Link>
                <Link
                  href="/daftar"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base"
                >
                  Daftar Sekarang
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {children}

        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-8 h-8" />
                  <h3 className="font-bold text-xl">SMP Terpadu Al-Ittihadiyah</h3>
                </div>
                <p className="text-gray-400">
                  Lembaga pendidikan Islam terpadu yang berkomitmen mencetak generasi unggul dan berakhlak mulia.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Kontak</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>📍 Jl. Pendidikan No. 123, Medan</li>
                  <li>📞 (061) 1234-5678</li>
                  <li>✉️ info@smptalittihadiyah.sch.id</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Jam Operasional</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Senin - Jumat: 07:30 - 16:00</li>
                  <li>Sabtu: 07:30 - 12:00</li>
                  <li>Minggu: Libur</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
              <p>&copy; 2026 SMP Terpadu Al-Ittihadiyah. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
