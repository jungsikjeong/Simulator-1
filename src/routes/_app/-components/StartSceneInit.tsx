'use client'

import { useEffect, useState } from 'react'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '@/hooks/use-mobile'

const initialImages = [
  'https://dmfnb4l6be84v.cloudfront.net/start_%EC%9E%A5%EC%9B%90%EC%98%81.webp',
  '/title_bright.png'
]

const backgroundImages = [
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

async function preloadImage(src: string): Promise<boolean> {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => {
      console.log(`Successfully loaded: ${src}`)
      resolve(true)
    }
    img.onerror = (e) => {
      console.error(`Failed to load image: ${src}`, e)
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
    <SceneLayout bg="https://dmfnb4l6be84v.cloudfront.net/start_%EC%9E%A5%EC%9B%90%EC%98%81.webp" effect="trueBlend" hideTitle={false}>
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
