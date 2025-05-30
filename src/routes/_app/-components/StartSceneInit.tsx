'use client'

import { useEffect, useState } from 'react'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '@/hooks/use-mobile'

const initialImages = ['/start_장원영.png', '/title_bright.png']

const backgroundImages = [
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
]

async function preloadImage(src: string): Promise<void> {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => {
      console.warn(`Failed to load image: ${src}`)
      resolve() // 에러가 발생해도 resolve
    }
    img.src = src
  })
}

export default function StartSceneInit({
  onSceneChange,
}: {
  onSceneChange: (scene: SceneKey) => void
}) {
  const isMobile = useIsMobile()
  const [progress, setProgress] = useState(0)
  const [loaded, setLoaded] = useState(0)
  const total = initialImages.length
  const [ready, setReady] = useState(false)
  const [loadTimeout, setLoadTimeout] = useState<NodeJS.Timeout | null>(null)

  // 초기 프리로드
  useEffect(() => {
    // 타임아웃 설정 - 5초 후에는 강제로 로딩 완료
    const timeout = setTimeout(() => {
      setReady(true)
    }, 5000)
    setLoadTimeout(timeout)

    // 시작 화면에 필요한 이미지만 먼저 로드
    const loadInitialImages = async () => {
      for (const src of initialImages) {
        try {
          await Promise.race([
            preloadImage(src),
            new Promise(resolve => setTimeout(resolve, 1000)) // 각 이미지당 1초 타임아웃
          ])
        } catch (error) {
          console.warn(`Error loading image ${src}:`, error)
        }

        setLoaded(prev => {
          const next = prev + 1
          const newProgress = Math.min(Math.round((next / total) * 100), 100)
          setProgress(newProgress)
          // 100%가 되면 바로 ready 상태로 변경
          if (newProgress === 100) {
            setReady(true)
          }
          return next
        })
      }
    }

    loadInitialImages()

    // 백그라운드에서 나머지 이미지 로드
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        backgroundImages.forEach(src => {
          preloadImage(src).catch(error => {
            console.warn(`Error loading background image ${src}:`, error)
          })
        })
      })
    } else {
      setTimeout(() => {
        backgroundImages.forEach(src => {
          preloadImage(src).catch(error => {
            console.warn(`Error loading background image ${src}:`, error)
          })
        })
      }, 1000)
    }

    return () => {
      if (loadTimeout) {
        clearTimeout(loadTimeout)
      }
    }
  }, [])

  if (!ready) {
    // 게임 시작 전 로딩 스크린
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
        <div className="mb-4 text-2xl">로딩 중...</div>
        <div className="h-2 w-64 overflow-hidden rounded-full bg-gray-700">
          <div
            className="h-full bg-white transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2">{progress}%</div>
      </div>
    )
  }

  // 준비 완료 시 실제 Start 씬으로 넘어감
  return (
    <SceneLayout bg="/start_장원영.png" effect="trueBlend" hideTitle={false}>
      {/* 클릭 시 다음 씬으로 */}
      <div
        className="absolute inset-0 z-10 cursor-pointer"
        onClick={() => onSceneChange('start')}
      />
      {/* 타이틀 */}
      <motion.div
        className="absolute bottom-26 w-full text-center md:bottom-26"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 1, 0, -1, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: 'easeInOut',
          }}
        >
          <div className="flex flex-col items-center">
            <img
              src="/title_bright.png"
              alt="짐빔 위대한 마케터"
              className={`${isMobile ? 'w-60' : 'w-80'}`}
            />
          </div>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        <motion.div
          className="absolute right-4 bottom-2 flex items-center justify-end text-sm text-white opacity-70"
          animate={{
            opacity: [0.7, 0.4, 0.7],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <span className="mr-1">▶︎</span> touch
        </motion.div>
      </AnimatePresence>

      {/* 음주 경고 메시지 */}
      <div className="absolute right-0 bottom-2.5 sm:bottom-0 left-0 mb-8 px-2 py-1 text-center text-xs text-white">
        <span className="text tracking-tighter">
          *경고 : 지나친 음주는 뇌졸중, 기억력 손상이나 치매를 유발합니다.
        </span>
        <br />
        임신 중 음주는 기형아 출생 위험을 높입니다
      </div>
    </SceneLayout>
  )
}
