import type { Metadata } from 'next'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import './globals.css'
import { GraduationCap } from 'lucide-react'
import Footer from '@/components/Footer'
import FloatingFAQBot from '@/components/FloatingFAQBot'
import Navbar from '@/components/Navbar'

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
        <Navbar />

        {children}
        <FloatingFAQBot />
        <Footer />
      </body>
    </html>
  )
}
