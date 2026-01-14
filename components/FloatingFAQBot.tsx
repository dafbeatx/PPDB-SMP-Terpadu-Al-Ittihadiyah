'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X, Send, Phone, ArrowUpCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQ_DATA = [
    {
        q: "Cara daftar bagaimana?",
        a: "Anda bisa mendaftar dengan menekan tombol 'Daftar Sekarang' di beranda, lalu lengkapi formulir pendaftaran 4 tahap (Data Siswa, Ortu, Rumah, & Dokumen)."
    },
    {
        q: "Dokumen apa saja yang dibutuhkan?",
        a: "Siapkan foto/scan KTP orang tua, Kartu Keluarga (KK), dan Ijazah atau Surat Keterangan Lulus (SKL) dalam format JPG/PNG/WEBP."
    },
    {
        q: "Berapa lama verifikasi?",
        a: "Tim Admin kami biasanya memverifikasi data Anda dalam 1-3 hari kerja. Status akan diperbarui di dashboard Anda."
    },
    {
        q: "Bisa daftar lewat HP?",
        a: "Tentu! Website ini sudah dioptimalkan untuk semua jenis HP, termasuk seri Infinix, Samsung, Oppo, dan iPhone."
    }
]

export default function FloatingFAQBot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<{ type: 'bot' | 'user', content: string }[]>([
        { type: 'bot', content: 'Halo! Ada yang bisa kami bantu terkait pendaftaran (PPDB)?' }
    ])
    const [showScrollTop, setShowScrollTop] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleQuestionClick = (q: string, a: string) => {
        setMessages(prev => [
            ...prev,
            { type: 'user', content: q },
            { type: 'bot', content: a }
        ])
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            {/* Scroll to Top Button */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        onClick={scrollToTop}
                        className="bg-white text-green-600 p-3 rounded-full shadow-lg border border-green-100 hover:bg-green-50 transition-colors"
                    >
                        <ArrowUpCircle className="w-6 h-6" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-[320px] sm:w-[380px] overflow-hidden flex flex-col max-h-[500px]"
                    >
                        {/* Header */}
                        <div className="bg-green-600 p-4 text-white flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-lg">
                                    <MessageCircle className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Bantuan PPDB</h3>
                                    <p className="text-[10px] opacity-80">Online • Balas otomatis</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-white/10 p-1 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chat Content */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 min-h-[250px]">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.type === 'user'
                                                ? 'bg-green-600 text-white rounded-tr-none'
                                                : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-none'
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Questions area */}
                        <div className="p-4 border-t bg-white space-y-3">
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Pertanyaan Populer</p>
                            <div className="flex flex-wrap gap-2">
                                {FAQ_DATA.map((item, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleQuestionClick(item.q, item.a)}
                                        className="text-xs bg-gray-100 hover:bg-green-50 hover:text-green-700 text-gray-600 px-3 py-2 rounded-full border border-gray-200 transition-colors text-left"
                                    >
                                        {item.q}
                                    </button>
                                ))}
                            </div>

                            <div className="pt-2">
                                <a
                                    href="https://wa.me/628123456789" // Dummy WA
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full bg-green-100 hover:bg-green-200 text-green-700 font-bold py-3 rounded-xl transition-colors text-sm"
                                >
                                    <Phone className="w-4 h-4" />
                                    Hubungi Admin via WhatsApp
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group relative ${isOpen ? 'rotate-90' : ''}`}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
                    </span>
                )}
            </button>
        </div>
    )
}
