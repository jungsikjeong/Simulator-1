'use client'

import { useEffect, useState } from 'react'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '@/hooks/use-mobile'

const initialImages = ['/start_장원영.png', '/title_bright.png']

const backgroundImages = [
  '/party/1_박정민.jpg',
  '/party/2_장원영.png',
  '/party/3_장원영.png',
  '/party/4_박정민.png',
  '/party/5_박정민.png',
  '/party/6_장원영.jpg',
  '/party/7_장원영.png',
  '/party/8_단체.jpg',
  '/hof/1_박정민.jpg',
  '/hof/2_장원영.png',
  '/hof/3_장원영.png',
  '/home/1_박정민.jpg',
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
  '/romance/5_박정민.jpg',
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

async function preloadImage(src: string): Promise<boolean> {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => {
      console.warn(`Failed to load image: ${src}`)
      resolve(false)
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
  const [_loaded, setLoaded] = useState(0)
  const total = initialImages.length
  const [ready, setReady] = useState(false)
  const [isLoadingComplete, setIsLoadingComplete] = useState(false)

  // 초기 프리로드
  useEffect(() => {
    let isMounted = true
    let retryCount = 0
    const MAX_RETRIES = 3

    const loadInitialImages = async () => {
      try {
        // 모바일에서는 한 번에 하나씩 로드
        if (isMobile) {
          for (let i = 0; i < initialImages.length; i++) {
            if (!isMounted) return

            const success = await preloadImage(initialImages[i])
            if (success) {
              setLoaded(prev => prev + 1)
              setProgress(Math.min(Math.round(((i + 1) / total) * 100), 100))
            }

            // 모바일에서는 각 이미지 로드 사이에 약간의 딜레이를 줌
            await new Promise(resolve => setTimeout(resolve, 50))
          }
        } else {
          // PC에서는 병렬 로드
          const results = await Promise.all(
            initialImages.map(src => preloadImage(src))
          )

          if (!isMounted) return

          const successCount = results.filter(Boolean).length
          setLoaded(successCount)
          setProgress(Math.min(Math.round((successCount / total) * 100), 100))
        }

        if (isMounted) {
          setIsLoadingComplete(true)
        }
      } catch (error) {
        console.error('이미지 로딩 실패:', error)
        if (retryCount < MAX_RETRIES) {
          retryCount++
          console.log(`재시도 ${retryCount}/${MAX_RETRIES}`)
          setTimeout(loadInitialImages, 1000)
        }
      }
    }

    loadInitialImages()

    // 백그라운드에서 나머지 이미지 로드
    const loadBackgroundImages = async () => {
      const chunkSize = isMobile ? 2 : 5 // 모바일에서는 더 작은 청크 사이즈 사용
      for (let i = 0; i < backgroundImages.length; i += chunkSize) {
        if (!isMounted) return

        const chunk = backgroundImages.slice(i, i + chunkSize)
        await Promise.all(chunk.map(src => preloadImage(src)))

        // 모바일에서는 청크 사이에 약간의 딜레이를 줌
        if (isMobile) {
          await new Promise(resolve => setTimeout(resolve, 100))
        }
      }
    }

    loadBackgroundImages()

    return () => {
      isMounted = false
    }
  }, [isMobile])

  // 모두 로드되면, 잠시 딜레이 후 진입
  useEffect(() => {
    if (isLoadingComplete) {
      const t = setTimeout(() => setReady(true), isMobile ? 200 : 100)
      return () => clearTimeout(t)
    }
  }, [isLoadingComplete, isMobile])

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
      <div className="absolute right-0 bottom-2.5 left-0 mb-8 px-2 py-1 text-center text-xs text-white sm:bottom-0">
        <span className="text tracking-tighter">
          *경고 : 지나친 음주는 뇌졸중, 기억력 손상이나 치매를 유발합니다.
        </span>
        <br />
        임신 중 음주는 기형아 출생 위험을 높입니다
      </div>
    </SceneLayout>
  )
}
