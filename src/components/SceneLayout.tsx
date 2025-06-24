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

// 전역 캐시 및 전체 이미지 리스트
const imageCache = new Map<string, HTMLImageElement>()
const allImages = [
  '/title_bright.png',
  'https://dmfnb4l6be84v.cloudfront.net/start_%EC%9E%A5%EC%9B%90%EC%98%81.webp',
  'https://dmfnb4l6be84v.cloudfront.net/party/1_%EB%B0%95%EC%A0%95%EB%AF%BC.webp',
  'https://dmfnb4l6be84v.cloudfront.net/party/2_%EC%9E%A5%EC%9B%90%EC%98%81.webp',
  'https://dmfnb4l6be84v.cloudfront.net/party/3_%EC%9E%A5%EC%9B%90%EC%98%81.webp',
  'https://dmfnb4l6be84v.cloudfront.net/party/4_%EB%B0%95%EC%A0%95%EB%AF%BC.webp',
  'https://dmfnb4l6be84v.cloudfront.net/party/5_%EB%B0%95%EC%A0%95%EB%AF%BC.webp',
  'https://dmfnb4l6be84v.cloudfront.net/party/6_%EC%9E%A5%EC%9B%90%EC%98%81.webp',
  'https://dmfnb4l6be84v.cloudfront.net/party/7_%EC%9E%A5%EC%9B%90%EC%98%81.webp',
  'https://dmfnb4l6be84v.cloudfront.net/party/8_%EB%8B%A8%EC%B2%B4.webp',
  'https://dmfnb4l6be84v.cloudfront.net/hof/1_%EB%B0%95%EC%A0%95%EB%AF%BC.webp',
  'https://dmfnb4l6be84v.cloudfront.net/hof/2_%EC%9E%A5%EC%9B%90%EC%98%81.webp',
  'https://dmfnb4l6be84v.cloudfront.net/hof/3_%EC%9E%A5%EC%9B%90%EC%98%81.webp',
  'https://dmfnb4l6be84v.cloudfront.net/home/1_%EB%B0%95%EC%A0%95%EB%AF%BC.webp',
  'https://dmfnb4l6be84v.cloudfront.net/home/2_%EC%9E%A5%EC%9B%90%EC%98%81.webp',
  'https://dmfnb4l6be84v.cloudfront.net/home/3_%EC%9E%A5%EC%9B%90%EC%98%81.webp',
  'https://dmfnb4l6be84v.cloudfront.net/home/4_%EB%B0%95%EC%A0%95%EB%AF%BC.webp',
  'https://dmfnb4l6be84v.cloudfront.net/reward/%EB%B0%95%EC%A0%95%EB%AF%BC_%EC%A7%84%EC%A0%80.webp',
  'https://dmfnb4l6be84v.cloudfront.net/reward/%EB%B0%95%EC%A0%95%EB%AF%BC_%EB%A0%88%EB%AA%AC.webp',
  'https://dmfnb4l6be84v.cloudfront.net/reward/%EB%B0%95%EC%A0%95%EB%AF%BC_%EC%9E%90%EB%AA%BD.webp',
  'https://dmfnb4l6be84v.cloudfront.net/reward/%EB%B0%95%EC%A0%95%EB%AF%BC_%ED%94%8C%EB%A0%88%EC%9D%B8.webp',
  'https://dmfnb4l6be84v.cloudfront.net/reward/%EC%9E%A5%EC%9B%90%EC%98%81_%EB%A0%88%EB%AA%AC.webp',
  'https://dmfnb4l6be84v.cloudfront.net/reward/%EC%9E%A5%EC%9B%90%EC%98%81_%EC%9E%90%EB%AA%BD.webp',
  'https://dmfnb4l6be84v.cloudfront.net/reward/%EC%9E%A5%EC%9B%90%EC%98%81_%EC%A7%84%EC%A0%80.webp',
  'https://dmfnb4l6be84v.cloudfront.net/reward/%EC%9E%A5%EC%9B%90%EC%98%81_%ED%94%8C%EB%A0%88%EC%9D%B8.webp',
  'https://dmfnb4l6be84v.cloudfront.net/romance/1_%EB%B0%95%EC%A0%95%EB%AF%BC.webp',
  'https://dmfnb4l6be84v.cloudfront.net/romance/2_%EB%B0%95%EC%A0%95%EB%AF%BC.webp',
  'https://dmfnb4l6be84v.cloudfront.net/romance/3_%EB%B0%95%EC%A0%95%EB%AF%BC.webp',
  'https://dmfnb4l6be84v.cloudfront.net/romance/4_%EB%B0%95%EC%A0%95%EB%AF%BC.webp',
  'https://dmfnb4l6be84v.cloudfront.net/romance/5_%EB%B0%95%EC%A0%95%EB%AF%BC.webp',
  'https://dmfnb4l6be84v.cloudfront.net/romance/6_%EB%B0%95%EC%A0%95%EB%AF%BC.webp',
  'https://dmfnb4l6be84v.cloudfront.net/romance/7_%EB%B0%95%EC%A0%95%EB%AF%BC.webp',
  'https://dmfnb4l6be84v.cloudfront.net/romance/8_%EB%B0%95%EC%A0%95%EB%AF%BC.webp',
  'https://dmfnb4l6be84v.cloudfront.net/romance/9_%EB%B0%95%EC%A0%95%EB%AF%BC.webp',
  'https://dmfnb4l6be84v.cloudfront.net/romance/10_%EB%B0%95%EC%A0%95%EB%AF%BC.webp',
  'https://dmfnb4l6be84v.cloudfront.net/romance/11_%EB%B0%95%EC%A0%95%EB%AF%BC.webp',
  'https://dmfnb4l6be84v.cloudfront.net/romance/12_%EB%B0%95%EC%A0%95%EB%AF%BC.webp',
  'https://dmfnb4l6be84v.cloudfront.net/ending/1_%EC%9E%A5%EC%9B%90%EC%98%81.webp',
  'https://dmfnb4l6be84v.cloudfront.net/ending/2_%EA%B0%99%EC%9D%B4.webp',
  'https://dmfnb4l6be84v.cloudfront.net/ending/3_%EA%B0%99%EC%9D%B4.webp',
]

// 이미지 프리로드 유틸
async function preloadImage(
  src: string,
  priority: boolean = false
): Promise<void> {
  if (imageCache.has(src)) return Promise.resolve()

  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => {
      imageCache.set(src, img)
      resolve()
    }
    img.onerror = () => resolve()
    img.src = src
    img.fetchPriority = priority ? 'high' : 'low'
  })
}

// 우선순위 기반 이미지 프리로드
async function preloadImagesWithPriority(images: string[], currentBg: string) {
  const highPriority = images.filter(img => img === currentBg)
  const mediumPriority = images.filter(img => img !== currentBg)

  // 현재 배경 이미지 즉시 로드
  await Promise.all(highPriority.map(img => preloadImage(img, true)))

  // 나머지 이미지들은 requestIdleCallback을 사용하여 백그라운드에서 로드
  if ('requestIdleCallback' in window) {
    ;(window as any).requestIdleCallback(() => {
      mediumPriority.forEach(img => preloadImage(img, false))
    })
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

  // 1) 현재 배경과 다음 배경 우선 로드
  useEffect(() => {
    const imagesToLoad = [bg, ...nextBgList]
    preloadImagesWithPriority(imagesToLoad, bg)
  }, [bg, nextBgList])

  // 2) 나머지 이미지들은 idle 시간에 로드
  useEffect(() => {
    const remainingImages = allImages.filter(
      img => img !== bg && !nextBgList.includes(img)
    )

    if ('requestIdleCallback' in window) {
      const id = (window as any).requestIdleCallback(() => {
        remainingImages.forEach(src => preloadImage(src, false))
      })
      return () => (window as any).cancelIdleCallback(id)
    }

    const timer = setTimeout(() => {
      remainingImages.forEach(src => preloadImage(src, false))
    }, 1000)
    return () => clearTimeout(timer)
  }, [bg, nextBgList])

  // 사운드 재생
  useEffect(() => {
    if (!soundEffect) return
    new Audio(`/sounds/${soundEffect}.mp3`).play().catch(() => {})
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
          // backgroundImage: `url(https://dmfnb4l6be84v.cloudfront.net${bg.replace('.png', '.webp').replace('.jpg', '.webp')})`,
          filter: 'none',
          WebkitFilter: 'none',
          imageRendering: 'crisp-edges',
          backgroundSize: 'cover',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
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
          />
        )}

        {children}
      </motion.div>
    </AnimatePresence>
  )
}
