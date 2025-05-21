'use client'

import { AnimatePresence, motion, type TargetAndTransition, type Variants } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'

export type TransitionEffect =
    | 'fade'
    | 'shake'
    | 'zoom'
    | 'flash'
    | 'slide'
    | 'crossFade'
    | 'smoothFade'
    | 'trueBlend'
export type SoundEffect = 'shalala' | '뾰로롱' | '또로롱' | null

interface SceneLayoutProps extends PropsWithChildren {
    bg: string
    effect?: TransitionEffect
    onSkip?: () => void
    soundEffect?: SoundEffect
    hideTitle?: boolean
    logoColor?: 'white' | 'black'
    nextBgList?: string[]  // 다음 씬의 배경 이미지 리스트
}

const variantMap: Record<TransitionEffect, Variants> = {
    // ... 기존 variantMap 그대로 유지
    fade: { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.8, ease: 'easeInOut' } }, exit: { opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } } },
    zoom: { initial: { opacity: 0, scale: 1.1 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 } },
    flash: { initial: { opacity: 0 }, animate: { opacity: [0, 1, 0.8, 1] as number[] }, exit: { opacity: 0 } },
    shake: { initial: { opacity: 0, transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] } }, animate: { opacity: 1, x: [0, -4, 4, -4, 4, 0] as number[], y: [0, 2, -2, 2, -2, 0] as number[], transition: { duration: 0.6 } }, exit: { opacity: 0, transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] } } },
    slide: { initial: { x: '100%', opacity: 0 }, animate: { x: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeInOut' } }, exit: { x: '-100%', opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } } },
    crossFade: { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 1.2, ease: [0.4, 0, 0.2, 1] } }, exit: { opacity: 0, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } } },
    smoothFade: { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] } }, exit: { opacity: 0, transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] } } },
    trueBlend: { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }, exit: { opacity: 0, transition: { duration: 0.8, ease: [0.32, 0, 0.67, 0] } } },
}

// 전역 캐시
const imageCache = new Map<string, HTMLImageElement>()
// 모든 씬 이미지 리스트 (fallback 용)
const allImages = [
    '/start_장원영.png',
    '/party/1_박정민.png',
    '/party/2_장원영.png',
    '/party/3_장원영.png',
    '/party/4_박정민.png',
    '/party/5_박정민.png',
    '/party/6_장원영.png',
    '/party/7_장원영.png',
    '/party/8_단체.png',
    '/hof/1_박정민.png',
    '/hof/2_장원영.png',
    '/hof/3_장원영.png',
    '/hof/4_장원영.png',
    '/home/1_박정민.png',
    '/home/2_장원영.png',
    '/home/3_장원영.png',
    '/home/4_박정민.png',
    '/reward/박정민_진저.png',
    '/reward/박정민_레몬.png',
    '/reward/박정민_자몽.png',
    '/reward/박정민_플레인.png',
    '/reward/장원영_레몬.png',
    '/reward/장원영_자몽.png',
    '/reward/장원영_진저.png',
    '/reward/장원영_플레인.png',
    '/romance/1_박정민.png',
    '/romance/2_박정민.png',
    '/romance/3_박정민.png',
    '/romance/4_박정민.png',
    '/romance/5_박정민.png',
    '/romance/6_박정민.png',
    '/romance/7_박정민.png',
    '/romance/8_박정민.png',
    '/romance/9_박정민.png',
    '/romance/10_박정민.png',
    '/romance/11_박정민.png',
    '/romance/12_박정민.png',
    '/ending/1_장원영.png',
    '/ending/2_같이.png',
    '/ending/3_같이.png',
];

// 이미지 프리로드 유틸
async function preloadImage(src: string): Promise<void> {
    return new Promise(resolve => {
        if (imageCache.has(src)) return resolve()
        const img = new Image()
        img.onload = () => { imageCache.set(src, img); resolve() }
        img.onerror = () => resolve()
        img.src = src
    })
}

export default function SceneLayout({
    bg,
    effect = 'trueBlend',
    onSkip,
    children,
    soundEffect = null,
    hideTitle = false,
    logoColor = 'white',
    nextBgList = [],
}: SceneLayoutProps) {
    const isMobile = useIsMobile()
    const [initialLoading, setInitialLoading] = useState(true)
    const [loadingState, setLoadingState] = useState({ total: 0, loaded: 0, progress: 0 })

    // 1) 처음 마운트 시: bg + nextBgList(최대2장) 초기 로드 및 프로그레스
    useEffect(() => {
        const critical = [bg, ...nextBgList.slice(0, 2)]
        const total = critical.length
        setLoadingState({ total, loaded: 0, progress: 0 })
        Promise.all(
            critical.map(src =>
                preloadImage(src).then(() => {
                    setLoadingState(prev => ({
                        total,
                        loaded: prev.loaded + 1,
                        progress: Math.round(((prev.loaded + 1) / total) * 100),
                    }))
                })
            )
        ).then(() => setInitialLoading(false))
    }, [])

    // 2) idle 콜백으로 나머지 이미지 백그라운드 로드
    useEffect(() => {
        if (initialLoading) return
        if ('requestIdleCallback' in window) {
            const id = (window as any).requestIdleCallback(() => {
                allImages.forEach(src => { if (!imageCache.has(src)) preloadImage(src) })
            })
            return () => (window as any).cancelIdleCallback(id)
        }
        const timer = setTimeout(() => {
            allImages.forEach(src => { if (!imageCache.has(src)) preloadImage(src) })
        }, 3000)
        return () => clearTimeout(timer)
    }, [initialLoading])

    // 3) bg 변경될 때마다 nextBgList 이미지만 프리로드
    useEffect(() => {
        nextBgList.forEach(src => { if (!imageCache.has(src)) preloadImage(src) })
    }, [bg, nextBgList])

    // 사운드 재생
    useEffect(() => {
        if (!soundEffect) return
        const audio = new Audio(`/sounds/${soundEffect}.mp3`)
        audio.play().catch(() => { })
    }, [soundEffect])

    // Esc 스킵
    useEffect(() => {
        const handler = (e: KeyboardEvent) => e.key === 'Escape' && onSkip?.()
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [onSkip])

    // bg 캐시
    useEffect(() => {
        if (imageCache.has(bg)) return
        const img = new Image()
        img.onload = () => imageCache.set(bg, img)
        img.src = bg
    }, [bg])

    const { initial, animate, exit } = variantMap[effect]

    return (
        <AnimatePresence mode="sync">
            <motion.div
                key={`${bg}-${effect}`}
                className="relative h-screen w-full overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${bg})` }}
                initial={initial as TargetAndTransition}
                animate={animate as TargetAndTransition}
                exit={exit as TargetAndTransition}
            >
                {initialLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="text-white text-center">
                            <div className="text-xl mb-2">로딩 중...</div>
                            <div className="w-48 h-2 bg-gray-700 rounded-full">
                                <div
                                    className="h-full bg-white rounded-full transition-all duration-300"
                                    style={{ width: `${loadingState.progress}%` }}
                                />
                            </div>
                            <div className="mt-2">{loadingState.progress}%</div>
                        </div>
                    </div>
                )}

                {!hideTitle && (
                    <img
                        src={`/logo-${logoColor}.png`}
                        alt="Greatest Marketer of Jim Beam"
                        className={`${isMobile ? 'w-20' : 'w-26'} absolute top-2 right-2 z-50`}
                    />
                )}

                {children}
            </motion.div>
        </AnimatePresence>
    )
}
