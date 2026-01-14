'use client'

import { useState, useEffect, useRef } from 'react'
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
    const [isTyping, setIsTyping] = useState(false)
    const [messages, setMessages] = useState<{ type: 'bot' | 'user', content: string }[]>([
        { type: 'bot', content: 'Halo! Ada yang bisa kami bantu terkait pendaftaran (PPDB)?' }
    ])
    const [showScrollTop, setShowScrollTop] = useState(false)
    const chatContainerRef = useRef<HTMLDivElement>(null)

    // Auto-scroll to bottom of chat area only
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            })
        }
    }, [messages, isTyping])

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleQuestionClick = (q: string, a: string) => {
        if (isTyping) return

        setMessages(prev => [...prev, { type: 'user', content: q }])
        setIsTyping(true)

        // Simulate bot thinking delay
        setTimeout(() => {
            setMessages(prev => [...prev, { type: 'bot', content: a }])
            setIsTyping(false)
        }, 1000)
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 md:gap-4 sm:bottom-6 bottom-20">
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
                        className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-[300px] sm:w-[380px] overflow-hidden flex flex-col h-[70vh] sm:h-[500px] max-h-[80vh] sm:max-h-[600px] mb-2"
                    >
                        {/* Header: Fixed at top */}
                        <div className="bg-green-600 p-4 text-white flex justify-between items-center shrink-0">
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

                        {/* Body: Scrollable area including chat and options */}
                        <div className="flex-1 overflow-hidden flex flex-col bg-gray-50">
                            {/* Chat Content: Auto-scrollable internally */}
                            <div
                                ref={chatContainerRef}
                                className="flex-1 overflow-y-auto p-4 space-y-4 pt-6 scroll-smooth"
                            >
                                {messages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.type === 'user'
                                                ? 'bg-green-600 text-white rounded-tr-none'
                                                : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-none'
                                                }`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-white text-gray-400 p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-xs">
                                            <span className="flex gap-1">
                                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Separated area for Quick Replies & WA */}
                            <div className="p-4 border-t bg-white shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Ketuk untuk bertanya</p>
                                <div className="max-h-[120px] overflow-y-auto pr-1 -mr-1 custom-scrollbar">
                                    <div className="flex flex-wrap gap-2">
                                        {FAQ_DATA.map((item, i) => (
                                            <button
                                                key={i}
                                                disabled={isTyping}
                                                onClick={() => handleQuestionClick(item.q, item.a)}
                                                className={`text-[11px] px-3 py-2 rounded-xl border transition-all text-left leading-snug ${isTyping
                                                        ? 'bg-gray-50 text-gray-400 border-gray-100'
                                                        : 'bg-white hover:bg-green-50 hover:text-green-700 hover:border-green-200 text-gray-600 border-gray-200 shadow-sm active:scale-95'
                                                    }`}
                                            >
                                                {item.q}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <a
                                        href="https://wa.me/628123456789"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-all text-xs sm:text-sm shadow-md shadow-green-100 active:scale-95"
                                    >
                                        <Phone className="w-4 h-4" />
                                        WhatsApp Admin
                                    </a>
                                </div>
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
