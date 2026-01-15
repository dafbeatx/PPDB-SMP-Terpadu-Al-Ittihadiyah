interface StepIndicatorProps {
    currentStep: number
    totalSteps: number
    className?: string
}

const steps = [
    { number: 1, label: 'Data Siswa' },
    { number: 2, label: 'Data Orang Tua' },
    { number: 3, label: 'Data Tambahan' },
    { number: 4, label: 'Upload Dokumen' },
]

export default function StepIndicator({ currentStep, totalSteps, className = '' }: StepIndicatorProps) {
    return (
        <div className={`w-full mb-8 ${className}`}>
            {/* Desktop and Tablet View */}
            <div className="hidden sm:block">
                <div className="flex items-start justify-between relative">
                    {/* Progress Bar Background */}
                    <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200" style={{ marginLeft: '10%', marginRight: '10%', zIndex: 0 }}></div>

                    {steps.map((step) => {
                        const isActive = step.number === currentStep
                        const isCompleted = step.number < currentStep
                        const progress = ((currentStep - 1) / (totalSteps - 1)) * 100

                        return (
                            <div key={step.number} className="flex-1 flex flex-col items-center relative z-10">
                                {/* Circle */}
                                <div className={`
                                    w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                                    transition-all duration-300 shadow-md
                                    ${isCompleted ? 'bg-green-600 text-white' : ''}
                                    ${isActive ? 'bg-blue-600 text-white ring-4 ring-blue-200 scale-110' : ''}
                                    ${!isActive && !isCompleted ? 'bg-white border-2 border-gray-300 text-gray-500' : ''}
                                `}>
                                    {isCompleted ? '✓' : step.number}
                                </div>

                                {/* Label */}
                                <div className={`
                                    mt-3 text-sm font-semibold text-center whitespace-nowrap
                                    transition-colors duration-300
                                    ${isActive ? 'text-blue-600' : ''}
                                    ${isCompleted ? 'text-green-600' : ''}
                                    ${!isActive && !isCompleted ? 'text-gray-500' : ''}
                                `}>
                                    {step.label}
                                </div>
                            </div>
                        )
                    })}

                    {/* Active Progress Bar */}
                    <div
                        className="absolute top-6 left-0 h-1 bg-green-600 transition-all duration-500"
                        style={{
                            marginLeft: '10%',
                            width: `${Math.max(0, Math.min(100, ((currentStep - 1) / (totalSteps - 1)) * 80))}%`,
                            zIndex: 1
                        }}
                    ></div>
                </div>
            </div>

            {/* Mobile View */}
            <div className="sm:hidden">
                <div className="flex items-center justify-center gap-0.5 mb-4">
                    {steps.map((step) => {
                        const isActive = step.number === currentStep
                        const isCompleted = step.number < currentStep

                        return (
                            <div key={step.number} className="flex items-center">
                                <div className={`
                                    w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs
                                    transition-all duration-300
                                    ${isCompleted ? 'bg-green-600 text-white' : ''}
                                    ${isActive ? 'bg-blue-600 text-white ring-2 ring-blue-100' : ''}
                                    ${!isActive && !isCompleted ? 'bg-white border-2 border-gray-300 text-gray-500' : ''}
                                `}>
                                    {isCompleted ? (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : step.number}
                                </div>
                                {step.number < totalSteps && (
                                    <div className={`
                                        w-4 h-0.5 mx-0.5 rounded-full
                                        ${step.number < currentStep ? 'bg-green-600' : 'bg-gray-200'}
                                    `}></div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Current Step Label for Mobile - Professional Badge Style */}
                <div className="flex justify-center">
                    <div className="bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-xs font-bold border border-blue-100 uppercase tracking-wider">
                        Step {currentStep}: {steps[currentStep - 1].label}
                    </div>
                </div>
            </div>
        </div>
    )
}
