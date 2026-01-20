'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GraduationCap, Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const NAV_LINKS = [
    { name: 'Beranda', href: '/#hero' },
    { name: 'Profil', href: '/#profil' },
    { name: 'Visi & Misi', href: '/#visi-misi' },
    { name: 'Keunggulan', href: '/#keunggulan' },
    { name: 'Testimoni', href: '/#testimoni' },
    { name: 'Alur', href: '/#alur' },
]

export default function Navbar() {
    const pathname = usePathname()
    const isDaftarPage = pathname === '/daftar'
    const [activeSection, setActiveSection] = useState('hero')
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0,
        }

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id)
                }
            })
        }

        const observer = new IntersectionObserver(observerCallback, observerOptions)
        const sections = document.querySelectorAll('section[id]')
        sections.forEach((section) => observer.observe(section))

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            sections.forEach((section) => observer.unobserve(section))
        }
    }, [])

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-none shadow-none",
                isScrolled
                    ? "bg-green-700/95 backdrop-blur-md py-1.5 shadow-lg"
                    : "bg-transparent py-4"
            )}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 md:gap-3 group">
                        <div className="relative overflow-hidden rounded-lg">
                            <Image
                                src="/logo.png"
                                alt="Logo SMP Al-Ittihadiyah"
                                width={48}
                                height={48}
                                className="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform duration-500 group-hover:scale-110"
                                priority
                            />
                        </div>
                        <div className="hidden sm:block">
                            <div className={cn(
                                "font-bold text-sm md:text-base leading-tight transition-colors",
                                isScrolled ? "text-white" : "text-white"
                            )}>SMP Terpadu Al-Ittihadiyah</div>
                            <div className="text-[10px] md:text-xs text-green-300 font-semibold uppercase tracking-wider">PPDB Online 2026/2027</div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                                    activeSection === link.href.slice(1)
                                        ? "bg-white/20 text-white"
                                        : "text-white/90 hover:text-white hover:bg-white/10"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 md:gap-3">
                        <Link href="/login" className="hidden sm:block">
                            <Button variant="ghost" size="sm" className="font-bold text-white hover:bg-white/10">
                                Login
                            </Button>
                        </Link>
                        {!isDaftarPage && (
                            <Link href="/daftar">
                                <Button size="sm" className="shadow-lg shadow-green-600/20 font-bold px-5">
                                    Daftar
                                </Button>
                            </Link>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-6 space-y-1">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                        "block px-4 py-3 rounded-xl text-base font-medium transition-all",
                                        activeSection === link.href.slice(1)
                                            ? "bg-green-50 text-green-700 font-bold"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-green-600"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 text-gray-600 font-medium hover:bg-gray-50"
                            >
                                Login Admin
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

import { AnimatePresence, motion } from 'framer-motion'
