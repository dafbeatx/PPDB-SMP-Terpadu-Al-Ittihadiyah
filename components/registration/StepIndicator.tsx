interface StepIndicatorProps {
    currentStep: number
    totalSteps: number
}

const steps = [
    { number: 1, label: 'Data Siswa' },
    { number: 2, label: 'Data Orang Tua' },
    { number: 3, label: 'Upload Dokumen' },
]

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
    return (
        <div className="w-full">
            <div className="flex justify-between items-center">
                {steps.map((step, index) => {
                    const isActive = step.number === currentStep
                    const isCompleted = step.number < currentStep
                    const isLast = index === steps.length - 1

                    return (
                        <div key={step.number} className="flex items-center flex-1">
                            <div className="flex flex-col items-center flex-1">
                                <div className={`
                  w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-lg
                  transition-all duration-300
                  ${isCompleted ? 'bg-green-600 text-white' : ''}
                  ${isActive ? 'bg-blue-600 text-white ring-4 ring-blue-200' : ''}
                  ${!isActive && !isCompleted ? 'bg-gray-200 text-gray-500' : ''}
                `}>
                                    {isCompleted ? '✓' : step.number}
                                </div>
                                <div className={`
                  mt-2 text-xs md:text-sm font-semibold text-center
                  ${isActive ? 'text-blue-600' : ''}
                  ${isCompleted ? 'text-green-600' : ''}
                  ${!isActive && !isCompleted ? 'text-gray-500' : ''}
                `}>
                                    {step.label}
                                </div>
                            </div>

                            {!isLast && (
                                <div className={`
                  h-1 flex-1 mx-2 md:mx-4 transition-all duration-300
                  ${isCompleted ? 'bg-green-600' : 'bg-gray-200'}
                `}></div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
