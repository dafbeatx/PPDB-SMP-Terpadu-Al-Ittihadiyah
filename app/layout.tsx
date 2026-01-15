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
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon-180x180.png"
  },
  openGraph: {
    title: "PPDB SMP Terpadu Al-Ittihadiyah 2026/2027",
    description: "Pendaftaran Peserta Didik Baru SMP Terpadu Al-Ittihadiyah Bogor",
    url: 'https://ppdb-smp-al-ittihadiyah.vercel.app',
    siteName: 'PPDB SMP Terpadu Al-Ittihadiyah',
    images: [
      {
        url: "/og-ppdb-hero.png",
        width: 1200,
        height: 630,
        alt: "PPDB SMP Terpadu Al-Ittihadiyah"
      }
    ],
    type: "website",
    locale: 'id_ID',
  },
  twitter: {
    card: "summary_large_image",
    title: "PPDB SMP Terpadu Al-Ittihadiyah 2026/2027",
    description: "Pendaftaran Peserta Didik Baru SMP Terpadu Al-Ittihadiyah Bogor",
    images: ["/og-ppdb-hero.png"]
  }
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

        <main className="pt-16 md:pt-20">
          {children}
        </main>

        <FloatingFAQBot />
        <Footer />
      </body>
    </html>
  )
}
