'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'

interface CounterProps {
    value: number
    duration?: number
    delay?: number
    className?: string
    suffix?: string
}

export default function Counter({
    value,
    duration = 2,
    delay = 0,
    className = '',
    suffix = '',
}: CounterProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })
    const count = useMotionValue(0)
    const rounded = useTransform(count, (latest) => Math.round(latest))

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, value, {
                duration,
                delay,
                ease: 'easeOut',
            })
            return controls.stop
        }
    }, [isInView, value, duration, delay, count])

    return (
        <span ref={ref} className={className}>
            <AnimatedText value={rounded} />
            {suffix}
        </span>
    )
}

function AnimatedText({ value }: { value: any }) {
    const ref = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        return value.on('change', (latest: number) => {
            if (ref.current) {
                ref.current.textContent = latest.toString()
            }
        })
    }, [value])

    return <span ref={ref}>0</span>
}
