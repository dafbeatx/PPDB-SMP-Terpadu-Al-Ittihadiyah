import MultiStepForm from '@/components/registration/MultiStepForm'

export default function DaftarPage() {
    return (
        <main className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-gray-50 to-green-50 py-6 md:py-12">
            <div className="container mx-auto px-4 pb-24 md:pb-0">
                <div className="text-center mb-10 md:mb-12">
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-3">
                        Formulir Pendaftaran PPDB
                    </h1>
                    <p className="text-sm md:text-lg text-gray-600">
                        SMP Terpadu Al-Ittihadiyah - TA 2026/2027
                    </p>
                </div>

                <MultiStepForm />
            </div>
        </main>
    )
}
