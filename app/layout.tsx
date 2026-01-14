import type { Metadata } from 'next'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import './globals.css'
import { GraduationCap } from 'lucide-react'
import Footer from '@/components/Footer'

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
            <div className="flex items-center justify-between h-16 md:h-20">
              <Link href="/" className="flex items-center gap-2 md:gap-3">
                <GraduationCap className="w-7 h-7 md:w-8 md:h-8 text-green-600 flex-shrink-0" />
                <div className="hidden sm:block">
                  <div className="font-bold text-sm md:text-lg text-gray-900">SMP Terpadu Al-Ittihadiyah</div>
                  <div className="text-xs md:text-sm text-gray-600">PPDB 2026/2027</div>
                </div>
              </Link>

              <div className="flex items-center gap-2 md:gap-3">
                <Link
                  href="/login"
                  className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-3 py-1.5 md:px-6 md:py-3 rounded-lg font-semibold transition-colors text-xs md:text-base whitespace-nowrap"
                >
                  <span className="hidden sm:inline">Login Admin</span>
                  <span className="sm:hidden">Login</span>
                </Link>
                <Link
                  href="/daftar"
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 md:px-6 md:py-3 rounded-lg font-semibold transition-colors text-xs md:text-base whitespace-nowrap"
                >
                  <span className="hidden sm:inline">Daftar Sekarang</span>
                  <span className="sm:hidden">Daftar</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {children}

        <Footer />
      </body>
    </html>
  )
}
