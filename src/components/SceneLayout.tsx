'use client'

import {
  AnimatePresence,
  motion,
  type TargetAndTransition,
  type Variants,
} from 'framer-motion'
import { useEffect } from 'react'
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
  nextBgList?: string[] // 다음 씬 배경 이미지 리스트
  bgClassName?: string
}

// variantMap: 기존 그대로 유지
const variantMap: Record<TransitionEffect, Variants> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8, ease: 'easeInOut' } },
    exit: { opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
  },
  zoom: {
    initial: { opacity: 0, scale: 1.1 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
  flash: {
    initial: { opacity: 0 },
    animate: { opacity: [0, 1, 0.8, 1] as number[] },
    exit: { opacity: 0 },
  },
  shake: {
    initial: {
      opacity: 0,
      transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] },
    },
    animate: {
      opacity: 1,
      x: [0, -4, 4, -4, 4, 0] as number[],
      y: [0, 2, -2, 2, -2, 0] as number[],
      transition: { duration: 0.6 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
  slide: {
    initial: { x: '100%', opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeInOut' },
    },
    exit: {
      x: '-100%',
      opacity: 0,
      transition: { duration: 0.6, ease: 'easeInOut' },
    },
  },
  crossFade: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 1.2, ease: [0.4, 0, 0.2, 1] },
    },
    exit: { opacity: 0, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } },
  },
  smoothFade: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
  trueBlend: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.8, ease: [0.32, 0, 0.67, 0] },
    },
  },
}

// 이미지 캐시를 위한 Map
const imageCache = new Map<string, HTMLImageElement>()

// 이미지 프리로드 함수 개선
async function preloadImage(src: string, highPriority: boolean = false): Promise<void> {
  if (imageCache.has(src)) return

  return new Promise((resolve) => {
    const img = new Image()

    if (highPriority) {
      img.fetchPriority = 'high'
    }

    img.onload = () => {
      imageCache.set(src, img)
      resolve()
    }

    img.onerror = () => {
      console.warn(`Failed to load image: ${src}`)
      resolve()
    }

    img.src = src
  })
}

// 우선순위 기반 이미지 프리로드 개선
async function preloadImagesWithPriority(images: string[], currentBg: string) {
  const highPriority = images.filter(img => img === currentBg)
  const mediumPriority = images.filter(img => img !== currentBg)

  // 현재 배경 이미지 즉시 로드
  await Promise.all(highPriority.map(img => preloadImage(img, true)))

  // 나머지 이미지들은 requestIdleCallback을 사용하여 백그라운드에서 로드
  if ('requestIdleCallback' in window) {
    ; (window as any).requestIdleCallback(() => {
      mediumPriority.forEach(img => preloadImage(img, false))
    }, { timeout: 2000 }) // 2초 타임아웃 설정
  } else {
    setTimeout(() => {
      mediumPriority.forEach(img => preloadImage(img, false))
    }, 100)
  }
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
  bgClassName = 'relative h-screen w-full overflow-hidden bg-cover bg-center',
}: SceneLayoutProps) {
  const isMobile = useIsMobile()

  // 이미지 프리로딩 최적화
  useEffect(() => {
    const imagesToLoad = [bg, ...nextBgList]
    preloadImagesWithPriority(imagesToLoad, bg)
  }, [bg, nextBgList])

  // 사운드 재생
  useEffect(() => {
    if (!soundEffect) return
    new Audio(`/sounds/${soundEffect}.mp3`).play().catch(() => { })
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
        className={`${bgClassName}`}
        style={{
          backgroundImage: `url(${bg})`,
          filter: 'none',
          WebkitFilter: 'none',
          imageRendering: 'crisp-edges',
          backgroundSize: 'cover',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          willChange: 'transform', // 성능 최적화
        }}
        initial={initial as TargetAndTransition}
        animate={animate as TargetAndTransition}
        exit={exit as TargetAndTransition}
      >
        {!hideTitle && (
          <img
            src={`/logo-${logoColor}.png`}
            alt="Game Logo"
            className={`${isMobile ? 'w-20' : 'w-26'} absolute top-2 right-2 z-50`}
            loading="eager" // 로고는 즉시 로드
          />
        )}

        {children}
      </motion.div>
    </AnimatePresence>
  )
}
