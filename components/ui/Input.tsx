import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, helperText, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm md:text-base font-semibold text-gray-700 mb-1.5 md:mb-2">
                        {label}
                        {props.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}
                <input
                    className={cn(
                        'w-full px-4 py-3 rounded-lg border-2 border-gray-300',
                        'focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none',
                        'text-base text-gray-900 placeholder:text-gray-400',
                        'transition-colors',
                        error && 'border-red-500 focus:border-red-500 focus:ring-red-200',
                        props.disabled && 'bg-gray-100 cursor-not-allowed',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-2 text-sm text-gray-500">{helperText}</p>
                )}
            </div>
        )
    }
)

Input.displayName = 'Input'

export default Input
