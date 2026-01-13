import MultiStepForm from '@/components/registration/MultiStepForm'

export default function DaftarPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Formulir Pendaftaran PPDB
                    </h1>
                    <p className="text-lg text-gray-600">
                        SMP Terpadu Al-Ittihadiyah - Tahun Ajaran 2026/2027
                    </p>
                </div>

                <MultiStepForm />
            </div>
        </main>
    )
}
