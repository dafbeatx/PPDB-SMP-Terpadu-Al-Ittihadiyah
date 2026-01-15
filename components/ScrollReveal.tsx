'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ScrollRevealProps {
    children: ReactNode
    direction?: 'up' | 'down' | 'left' | 'right' | 'none'
    delay?: number
    duration?: number
    className?: string
    distance?: number
    once?: boolean
}

export default function ScrollReveal({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    className = '',
    distance = 20,
    once = true,
}: ScrollRevealProps) {
    const directions = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance },
        none: { x: 0, y: 0 },
    }

    return (
        <motion.div
            initial={{
                opacity: 0,
                ...directions[direction],
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
            }}
            viewport={{ once }}
            transition={{
                duration,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
