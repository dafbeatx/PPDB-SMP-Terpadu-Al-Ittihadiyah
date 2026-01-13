import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                className={cn(
                    'inline-flex items-center justify-center rounded-lg font-semibold transition-all',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    'disabled:pointer-events-none disabled:opacity-50',
                    {
                        'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-600':
                            variant === 'primary',
                        'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600':
                            variant === 'secondary',
                        'border-2 border-green-600 text-green-600 hover:bg-green-50 focus-visible:ring-green-600':
                            variant === 'outline',
                        'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-400':
                            variant === 'ghost',
                    },
                    {
                        'px-4 py-2 text-sm': size === 'sm',
                        'px-6 py-3 text-base': size === 'md',
                        'px-8 py-4 text-lg': size === 'lg',
                    },
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)

Button.displayName = 'Button'

export default Button
