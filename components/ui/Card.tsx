import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> { }

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, ...props }, ref) => {
        return (
            <div
                className={cn(
                    'rounded-xl border border-gray-200 bg-white shadow-sm',
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)

Card.displayName = 'Card'

export default Card
