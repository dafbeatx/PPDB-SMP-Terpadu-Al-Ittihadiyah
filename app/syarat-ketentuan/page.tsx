import Link from 'next/link'
import { ArrowLeft, ScrollText, CheckSquare, ClipboardCheck, UserX, ShieldAlert, BookOpen, Headset } from 'lucide-react'

export default function TermsAndConditionsPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Kembali ke Beranda</span>
                    </Link>
                    <div className="flex items-center gap-2 text-green-600">
                        <ScrollText className="w-6 h-6" />
                        <span className="font-bold hidden sm:inline">PPDB Online</span>
                    </div>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-blue-600 px-8 py-10 text-white text-center">
                        <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                            <ClipboardCheck className="w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Syarat dan Ketentuan</h1>
                        <p className="text-blue-50 opacity-90">PPDB Online SMP Terpadu Al-Ittihadiyah</p>
                    </div>

                    <div className="p-8 md:p-12 space-y-10 leading-relaxed text-gray-700">
                        <section>
                            <p className="text-lg">
                                Dengan menggunakan layanan PPDB Online melalui website ini, pengguna dianggap telah memahami dan menyetujui syarat dan ketentuan berikut:
                            </p>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-blue-600 mb-2">
                                <CheckSquare className="w-6 h-6" />
                                <h2 className="text-xl font-bold text-gray-900 underline decoration-blue-500/30 decoration-4 underline-offset-4">1. Keabsahan Data</h2>
                            </div>
                            <p>
                                Pengguna wajib mengisi data pendaftaran dengan benar, jujur, dan sesuai dokumen resmi. Pihak sekolah berhak membatalkan pendaftaran apabila ditemukan data yang tidak sesuai atau tidak valid.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-blue-600 mb-2">
                                < ClipboardCheck className="w-6 h-6" />
                                <h2 className="text-xl font-bold text-gray-900 underline decoration-blue-500/30 decoration-4 underline-offset-4">2. Kelengkapan Berkas</h2>
                            </div>
                            <p>
                                Calon peserta didik wajib mengunggah seluruh dokumen yang dipersyaratkan sesuai ketentuan PPDB. Pendaftaran dianggap belum lengkap apabila berkas tidak sesuai atau tidak dapat dibaca dengan jelas.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-blue-600 mb-2">
                                <UserX className="w-6 h-6" />
                                <h2 className="text-xl font-bold text-gray-900 underline decoration-blue-500/30 decoration-4 underline-offset-4">3. Proses Seleksi</h2>
                            </div>
                            <p>
                                Seluruh proses seleksi dan penerimaan peserta didik sepenuhnya menjadi kewenangan pihak sekolah sesuai dengan kebijakan yang berlaku.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-blue-600 mb-2">
                                <ShieldAlert className="w-6 h-6" />
                                <h2 className="text-xl font-bold text-gray-900 underline decoration-blue-500/30 decoration-4 underline-offset-4">4. Status Pendaftaran</h2>
                            </div>
                            <p>
                                Pengisian formulir online tidak otomatis menjamin diterimanya calon peserta didik. Status pendaftaran akan ditentukan setelah proses verifikasi dan seleksi oleh pihak sekolah.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-blue-600 mb-2">
                                <BookOpen className="w-6 h-6" />
                                <h2 className="text-xl font-bold text-gray-900 underline decoration-blue-500/30 decoration-4 underline-offset-4">5. Penggunaan Website</h2>
                            </div>
                            <p>
                                Website ini hanya digunakan untuk keperluan pendaftaran PPDB. Pengguna dilarang menggunakan website untuk tujuan lain yang dapat mengganggu sistem atau layanan.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-blue-600 mb-2">
                                <RefreshCcw className="w-6 h-6" />
                                <h2 className="text-xl font-bold text-gray-900 underline decoration-blue-500/30 decoration-4 underline-offset-4">6. Perubahan Ketentuan</h2>
                            </div>
                            <p>
                                Sekolah berhak mengubah syarat dan ketentuan sewaktu-waktu jika diperlukan, dan perubahan tersebut akan diumumkan melalui website.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-blue-600 mb-2">
                                <Headset className="w-6 h-6" />
                                <h2 className="text-xl font-bold text-gray-900 underline decoration-blue-500/30 decoration-4 underline-offset-4">7. Kontak Resmi</h2>
                            </div>
                            <p>
                                Untuk informasi lebih lanjut terkait PPDB, pengguna diharapkan menghubungi pihak sekolah melalui kontak resmi yang tercantum di website.
                            </p>
                        </section>

                        <div className="pt-8 border-t border-gray-100 flex justify-center">
                            <Link
                                href="/"
                                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                            >
                                Saya Setuju
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-white border-t py-8 text-center text-gray-500 text-sm">
                <div className="container mx-auto px-4">
                    <p>&copy; {new Date().getFullYear()} SMP Terpadu Al-Ittihadiyah. Semua hak dilindungi.</p>
                </div>
            </footer>
        </div>
    )
}

// Re-using the same icon component for simplicity
function RefreshCcw(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M16 16h5v5" />
        </svg>
    )
}
