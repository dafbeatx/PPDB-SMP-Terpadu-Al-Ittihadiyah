'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxHeroBg() {
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 150])

    return (
        <motion.div
            style={{ y }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 z-0"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/hero-bg.jpg')" }}
            />
        </motion.div>
    )
}
