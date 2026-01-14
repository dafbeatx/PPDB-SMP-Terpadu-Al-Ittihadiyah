import Link from 'next/link'
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText, UserCheck, RefreshCcw } from 'lucide-react'

export default function PrivacyPolicyPage() {
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
                        <ShieldCheck className="w-6 h-6" />
                        <span className="font-bold hidden sm:inline">PPDB Online</span>
                    </div>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-green-600 px-8 py-10 text-white text-center">
                        <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                            <Lock className="w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Kebijakan Privasi</h1>
                        <p className="text-green-50 opacity-90">PPDB Online SMP Terpadu Al-Ittihadiyah</p>
                    </div>

                    <div className="p-8 md:p-12 space-y-10 leading-relaxed text-gray-700">
                        <section>
                            <p className="text-lg">
                                Website PPDB Online SMP Terpadu Al-Ittihadiyah dibuat untuk membantu proses pendaftaran peserta didik baru secara daring. Kami menghargai dan melindungi privasi setiap pengguna yang mengisi formulir pendaftaran melalui website ini.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-green-600 mb-2">
                                <FileText className="w-6 h-6" />
                                <h2 className="text-xl font-bold text-gray-900 underline decoration-green-500/30 decoration-4 underline-offset-4">1. Data yang Kami Kumpulkan</h2>
                            </div>
                            <p>Kami mengumpulkan data yang diisikan langsung oleh calon peserta didik dan/atau orang tua/wali, meliputi:</p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-4">
                                <li className="flex items-center gap-2 before:content-['•'] before:text-green-500 before:font-bold">Data identitas siswa</li>
                                <li className="flex items-center gap-2 before:content-['•'] before:text-green-500 before:font-bold">Data orang tua atau wali</li>
                                <li className="flex items-center gap-2 before:content-['•'] before:text-green-500 before:font-bold">Data alamat dan kontak</li>
                                <li className="flex items-center gap-2 before:content-['•'] before:text-green-500 before:font-bold">Dokumen pendukung pendaftaran</li>
                            </ul>
                            <p className="text-sm text-gray-500 italic bg-gray-50 p-3 rounded-lg border-l-4 border-green-500">
                                Dokumen pendukung meliputi: KTP orang tua, Kartu Keluarga, Ijazah atau Surat Keterangan Lulus (SKL).
                            </p>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-green-600 mb-2">
                                <RefreshCcw className="w-6 h-6" />
                                <h2 className="text-xl font-bold text-gray-900 underline decoration-green-500/30 decoration-4 underline-offset-4">2. Tujuan Penggunaan Data</h2>
                            </div>
                            <p>Data yang dikumpulkan digunakan untuk:</p>
                            <ul className="space-y-2 pl-4">
                                <li className="flex items-start gap-2 before:content-['✓'] before:text-green-500 before:font-bold">Keperluan proses seleksi dan administrasi PPDB</li>
                                <li className="flex items-start gap-2 before:content-['✓'] before:text-green-500 before:font-bold">Verifikasi data calon peserta didik</li>
                                <li className="flex items-start gap-2 before:content-['✓'] before:text-green-500 before:font-bold">Keperluan komunikasi terkait proses pendaftaran</li>
                                <li className="flex items-start gap-2 before:content-['✓'] before:text-green-500 before:font-bold">Arsip administrasi sekolah sesuai ketentuan yang berlaku</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-green-600 mb-2">
                                <ShieldCheck className="w-6 h-6" />
                                <h2 className="text-xl font-bold text-gray-900 underline decoration-green-500/30 decoration-4 underline-offset-4">3. Penyimpanan dan Keamanan Data</h2>
                            </div>
                            <p>
                                Data dan dokumen yang dikirimkan melalui website akan disimpan secara terbatas dan hanya dapat diakses oleh pihak sekolah yang berwenang. Kami berupaya menjaga keamanan data dengan sistem yang wajar dan sesuai kebutuhan layanan PPDB.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-green-600 mb-2">
                                <Eye className="w-6 h-6" />
                                <h2 className="text-xl font-bold text-gray-900 underline decoration-green-500/30 decoration-4 underline-offset-4">4. Kerahasiaan Data</h2>
                            </div>
                            <p>
                                Sekolah tidak akan membagikan, menjual, atau menyebarluaskan data pendaftar kepada pihak lain tanpa izin, kecuali jika diwajibkan oleh peraturan perundang-undangan.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-green-600 mb-2">
                                <UserCheck className="w-6 h-6" />
                                <h2 className="text-xl font-bold text-gray-900 underline decoration-green-500/30 decoration-4 underline-offset-4">5. Hak Pengguna</h2>
                            </div>
                            <p>Pengguna berhak untuk:</p>
                            <ul className="space-y-2 pl-4">
                                <li className="flex items-center gap-2 before:content-['•'] before:text-green-500 before:font-bold">Mengetahui informasi yang disimpan</li>
                                <li className="flex items-center gap-2 before:content-['•'] before:text-green-500 before:font-bold">Meminta perbaikan data jika terjadi kesalahan</li>
                                <li className="flex items-center gap-2 before:content-['•'] before:text-green-500 before:font-bold">Menghubungi pihak sekolah terkait penggunaan data</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-3 text-green-600 mb-2">
                                <RefreshCcw className="w-6 h-6" />
                                <h2 className="text-xl font-bold text-gray-900 underline decoration-green-500/30 decoration-4 underline-offset-4">6. Perubahan Kebijakan</h2>
                            </div>
                            <p>
                                Kebijakan privasi ini dapat diperbarui sewaktu-waktu sesuai kebutuhan operasional sekolah dan akan ditampilkan melalui website PPDB.
                            </p>
                        </section>

                        <div className="pt-8 border-t border-gray-100 flex justify-center">
                            <Link
                                href="/"
                                className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200"
                            >
                                Saya Mengerti
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
