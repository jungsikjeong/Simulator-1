'use client'

import { AnimatePresence, motion, type TargetAndTransition, type Variants } from 'framer-motion'
import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'

export type TransitionEffect = 'fade' | 'shake' | 'zoom' | 'flash'

interface SceneLayoutProps extends PropsWithChildren {
    bg: string
    effect?: TransitionEffect
    onSkip?: () => void
}

/** 효과별 variant 정의 */
const variantMap: Record<TransitionEffect, Variants> = {
    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    },
    zoom: {
        initial: { opacity: 0, scale: 1.1 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
    },
    flash: {
        initial: { opacity: 0 },
        // as number[] : readonly → 가변 배열로 캐스팅
        animate: { opacity: [0, 1, 0.8, 1] as number[] },
        exit: { opacity: 0 },
    },
    shake: {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            x: [0, -4, 4, -4, 4, 0] as number[],
            y: [0, 2, -2, 2, -2, 0] as number[],
            transition: { duration: 0.6 },
        },
        exit: { opacity: 0 },
    },
}

export default function SceneLayout({
    bg,
    effect = 'fade',
    onSkip,
    children,
}: SceneLayoutProps) {
    /* Esc 스킵 */
    useEffect(() => {
        const h = (e: KeyboardEvent) => e.key === 'Escape' && onSkip?.()
        window.addEventListener('keydown', h)
        return () => window.removeEventListener('keydown', h)
    }, [onSkip])

    const { initial, animate, exit, transition } = variantMap[effect]

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={`${bg}-${effect}`}
                className="relative w-full h-screen bg-cover bg-center overflow-hidden"
                style={{ backgroundImage: `url(${bg})` }}
                initial={initial as TargetAndTransition}
                animate={animate as TargetAndTransition}
                exit={exit as TargetAndTransition}
                transition={transition ?? { duration: effect === 'flash' ? 0.4 : 0.6 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}
