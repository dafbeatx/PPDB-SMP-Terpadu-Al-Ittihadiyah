'use client'

interface AutosaveIndicatorProps {
    isSaving: boolean
}

export default function AutosaveIndicator({ isSaving }: AutosaveIndicatorProps) {
    return (
        <div className="flex items-center gap-1.5 py-1 transition-all duration-300">
            {isSaving ? (
                <>
                    <div className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-medium text-gray-400 italic">Menyimpan...</span>
                </>
            ) : (
                <>
                    <div className="flex items-center justify-center text-green-500">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <span className="text-[11px] sm:text-xs font-medium text-gray-500">Tersimpan</span>
                </>
            )}
        </div>
    )
}
