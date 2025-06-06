import { useIsMobile } from '@/hooks/use-mobile'
import type { SceneKey } from '@/modules/scene-key.type'
import {
  useGetCurrentMemberId,
  useGetCurrentMemberName,
} from '@/service/member/useGetMember'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import ShareButton from './ShareButton'
import { supabase } from '@/lib/supabase'

interface CardImage {
  src: string
  label: string
}

interface CardTab {
  text: string
}

interface RewardSceneLayoutProps {
  images: CardImage[]
  tabs?: CardTab[]
  bgColor?: string
  borderColor?: string
  textColor?: string
  sceneText?: string
  guideTextMobile?: string
  guideTextDesktop?: string
  onSceneChange?: (scene: SceneKey) => void
}

const RewardSceneLayout = ({
  images = [],
  tabs = [],
  bgColor = 'bg-yellow-50',
  borderColor = 'border-yellow-400',
  textColor = 'text-yellow-700',
  sceneText = '',
  guideTextMobile = '길게 눌러 다운로드',
  onSceneChange = () => {},
}: RewardSceneLayoutProps) => {
  const [selectedCard, setSelectedCard] = useState<number>(0)
  const [isDownloading, setIsDownloading] = useState<boolean>(false)
  const [isSwipeAnimating, setIsSwipeAnimating] = useState<boolean>(false)
  const [swipeProgress, setSwipeProgress] = useState<number>(0)
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(
    null
  )
  const [longPressProgress, setLongPressProgress] = useState<number>(0) // 길게 누르는 진행도 추가

  const startY = useRef(0)
  const startX = useRef(0)
  const currentY = useRef(0)
  const currentX = useRef(0)
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const longPressAnimTimer = useRef<ReturnType<typeof setInterval> | null>(null) // 길게 누르는 애니메이션용 타이머
  const swipeThreshold = 80
  const longPressThreshold = 800

  const isMobile = useIsMobile()
  const cardRef = useRef<HTMLDivElement>(null)
  const [cardDimensions, setCardDimensions] = useState({
    width: 280,
    height: 420,
  })
  const containerRef = useRef<HTMLDivElement>(null)

  const { data: currentMemberName } = useGetCurrentMemberName()
  const { data: currentMemberId } = useGetCurrentMemberId()
  const tabTexts = tabs.map(tab => tab.text)

  // 카드 사이즈 조정
  useEffect(() => {
    const updateCardDimensions = () => {
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      let newWidth, newHeight
      if (isMobile) {
        newWidth = Math.min(viewportWidth * 0.75, 280)
        newHeight = Math.min(viewportHeight * 0.48, 420)
      } else {
        newWidth = Math.min(viewportWidth * 0.8, 300)
        newHeight = Math.min(viewportHeight * 0.5, 450)
      }
      setCardDimensions({ width: newWidth, height: newHeight })
    }
    updateCardDimensions()
    window.addEventListener('resize', updateCardDimensions)
    return () => window.removeEventListener('resize', updateCardDimensions)
  }, [isMobile])

  const downloadCard = (card: CardImage) => {
    setIsDownloading(true)
    // 햅틱 피드백 추가 (iOS 및 Android에서 지원)
    if (navigator.vibrate) {
      navigator.vibrate(100)
    }

    setTimeout(() => {
      const link = document.createElement('a')
      link.href = card.src
      link.download = card.label
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setTimeout(() => {
        setIsDownloading(false)
        setIsSwipeAnimating(false)
        setSwipeProgress(0)
        setLongPressProgress(0)
      }, 500)
    }, 300)
  }

  // 길게 누르기 시작
  const handleLongPressStart = (index: number) => {
    if (isDownloading) return
    clearLongPressTimer()

    // 프로그레스 애니메이션 추가
    setLongPressProgress(0)
    longPressAnimTimer.current = setInterval(() => {
      setLongPressProgress(prev => {
        const newProgress = prev + 100 / (longPressThreshold / 100)
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 100)

    longPressTimer.current = setTimeout(() => {
      if (longPressAnimTimer.current) {
        clearInterval(longPressAnimTimer.current)
        longPressAnimTimer.current = null
      }
      setLongPressProgress(100)
      downloadCard(images[index])
    }, longPressThreshold)
  }

  const clearLongPressTimer = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
    if (longPressAnimTimer.current) {
      clearInterval(longPressAnimTimer.current)
      longPressAnimTimer.current = null
    }
    setLongPressProgress(0)
  }

  // 포인터 다운: 시작 위치 기록 + 캡처
  const handlePointerDown = (e: React.PointerEvent, index: number) => {
    if (isDownloading) return

    e.preventDefault()
    startX.current = e.clientX
    startY.current = e.clientY
    currentX.current = e.clientX // 시작 시 현재 위치도 초기화
    currentY.current = e.clientY // 시작 시 현재 위치도 초기화

    try {
      ;(e.target as Element).setPointerCapture(e.pointerId)
    } catch (err) {
      console.warn('포인터 캡처 실패:', err)
    }

    handleLongPressStart(index)
  }

  // 포인터 이동: 스와이프 처리 및 길게 누르기 취소
  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDownloading) return

    currentX.current = e.clientX
    currentY.current = e.clientY
    const diffX = currentX.current - startX.current
    const diffY = currentY.current - startY.current

    // 미세한 움직임은 무시 (길게 누르기 유지)
    if (Math.abs(diffX) > 10 || Math.abs(diffY) > 10) {
      clearLongPressTimer() // 움직임이 감지되면 길게 누르기 취소

      // 좌우 스와이프가 상하 스와이프보다 큰 경우만 처리
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
        const dir = diffX > 0 ? 'right' : 'left'
        setSwipeDirection(dir)
        setSwipeProgress(
          Math.min(100, (Math.abs(diffX) / swipeThreshold) * 100)
        )
      }
    }
  }

  // 포인터 업/리브/취소: 스와이프 확정 또는 취소
  const handlePointerEnd = (e: React.PointerEvent) => {
    if (isDownloading) return

    clearLongPressTimer()

    try {
      ;(e.target as Element).releasePointerCapture(e.pointerId)
    } catch (err) {
      console.warn('포인터 릴리즈 실패:', err)
    }

    if (swipeDirection) {
      const diffX = Math.abs(currentX.current - startX.current)
      if (diffX > swipeThreshold) {
        setIsSwipeAnimating(true)
        setSwipeProgress(100)

        // 햅틱 피드백 추가 (iOS 및 Android에서 지원)
        if (navigator.vibrate) {
          navigator.vibrate(50)
        }

        // 다음 카드로 이동하는 로직
        const newIndex =
          swipeDirection === 'left'
            ? (selectedCard + 1) % images.length
            : (selectedCard - 1 + images.length) % images.length

        setTimeout(() => {
          setSelectedCard(newIndex)
          setTimeout(() => {
            setIsSwipeAnimating(false)
            setSwipeProgress(0)
            setSwipeDirection(null)
          }, 300)
        }, 200)
      } else {
        setSwipeProgress(0)
        setSwipeDirection(null)
      }
    }
  }

  // 터치 이벤트 핸들러 추가 - 모바일에서 더 나은 지원을 위해
  const handleTouchStart = (e: React.TouchEvent, index: number) => {
    if (isDownloading) return

    const touch = e.touches[0]
    startX.current = touch.clientX
    startY.current = touch.clientY
    currentX.current = touch.clientX
    currentY.current = touch.clientY

    handleLongPressStart(index)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDownloading) return

    const touch = e.touches[0]
    currentX.current = touch.clientX
    currentY.current = touch.clientY

    const diffX = currentX.current - startX.current
    const diffY = currentY.current - startY.current

    // 미세한 움직임은 무시 (길게 누르기 유지)
    if (Math.abs(diffX) > 10 || Math.abs(diffY) > 10) {
      clearLongPressTimer() // 움직임이 감지되면 길게 누르기 취소

      // 좌우 스와이프가 상하 스와이프보다 큰 경우만 처리
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
        const dir = diffX > 0 ? 'right' : 'left'
        setSwipeDirection(dir)
        setSwipeProgress(
          Math.min(100, (Math.abs(diffX) / swipeThreshold) * 100)
        )

        // 스크롤 방지
        e.preventDefault()
      }
    }
  }

  const handleTouchEnd = (_e: React.TouchEvent) => {
    if (isDownloading) return

    clearLongPressTimer()

    if (swipeDirection) {
      const diffX = Math.abs(currentX.current - startX.current)
      if (diffX > swipeThreshold) {
        setIsSwipeAnimating(true)
        setSwipeProgress(100)

        // 햅틱 피드백 추가 (iOS 및 Android에서 지원)
        if (navigator.vibrate) {
          navigator.vibrate(50)
        }

        // 다음 카드로 이동하는 로직
        const newIndex =
          swipeDirection === 'left'
            ? (selectedCard + 1) % images.length
            : (selectedCard - 1 + images.length) % images.length

        setTimeout(() => {
          setSelectedCard(newIndex)
          setTimeout(() => {
            setIsSwipeAnimating(false)
            setSwipeProgress(0)
            setSwipeDirection(null)
          }, 300)
        }, 200)
      } else {
        setSwipeProgress(0)
        setSwipeDirection(null)
      }
    }
  }

  const getCardStyle = (index: number): React.CSSProperties => {
    const isSelected = selectedCard === index
    let rotation = -10 + index * 5
    let translateX = 0
    let translateY = index * 5
    let zIndex = index
    let scale = 1
    let opacity = 1

    if (isSelected && swipeDirection && swipeProgress > 0) {
      translateX = (swipeDirection === 'left' ? -1 : 1) * swipeProgress * 1.5
      rotation = swipeProgress * 0.1 * (swipeDirection === 'left' ? -1 : 1)
      opacity = 1 - swipeProgress * 0.01
    }

    if (isSelected) {
      rotation = 0
      translateX = 0
      translateY = 0
      zIndex = 100
      scale = 1.05
      opacity = 1
    } else {
      translateX = index < selectedCard ? -60 : 60
      translateY = 10
      zIndex = 10
      scale = 0.9
      opacity = 0.7
    }

    return {
      transform: `rotate(${rotation}deg) translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
      zIndex,
      transition: isSwipeAnimating
        ? 'all 0.5s ease'
        : swipeProgress > 0
          ? 'none'
          : 'all 0.3s ease',
      opacity,
      width: `${cardDimensions.width}px`,
      height: `${cardDimensions.height}px`,
    }
  }

  return (
    <div
      className={`flex h-screen w-full flex-col items-center ${isMobile ? 'justify-between py-10' : 'justify-center py-10'} ${bgColor} overflow-hidden p-4`}
    >
      {sceneText && (
        <h1
          className={`${isMobile ? 'text-sm' : 'text-2xl'} mb-6 text-center font-bold ${textColor} px-4 drop-shadow-sm`}
        >
          {sceneText}
        </h1>
      )}
      <div
        ref={containerRef}
        className="relative flex flex-col items-center"
        style={{ width: `${cardDimensions.width + 60}px` }}
      >
        <div
          className="relative flex w-full justify-center"
          style={{ height: `${cardDimensions.height}px` }}
        >
          {images.map((card, index) => (
            <div
              key={index}
              ref={selectedCard === index ? cardRef : null}
              className={`absolute cursor-pointer rounded-xl border-4 shadow-lg ${selectedCard === index ? borderColor : 'border-white'}`}
              style={{
                ...getCardStyle(index),
                left: '50%',
                top: 0,
                marginLeft: `-${cardDimensions.width / 2}px`,
                touchAction: 'none',
              }}
              onPointerDown={e => handlePointerDown(e, index)}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerEnd}
              onPointerLeave={handlePointerEnd}
              onPointerCancel={handlePointerEnd}
              onTouchStart={e => handleTouchStart(e, index)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-white p-2">
                <div className="flex flex-1 items-center justify-center overflow-hidden bg-gray-50">
                  <img
                    src={card.src}
                    alt={card.label}
                    className="h-full w-full object-contain"
                    draggable={false}
                    onDragStart={e => e.preventDefault()}
                  />
                </div>
                {selectedCard === index && (
                  <div className="absolute right-0 bottom-3 left-0 flex flex-col items-center">
                    <div
                      className={`mb-1 text-center text-sm ${textColor} bg-opacity-70 ${bgColor} mx-auto rounded-full px-3 py-1 shadow-sm select-none`}
                    >
                      {isDownloading ? '다운로드중...' : guideTextMobile}
                    </div>
                    {/* 프로그레스 바 영역 */}
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-200">
                      {/* 스와이프 프로그레스 */}
                      {swipeDirection && (
                        <div
                          className={`h-full ${borderColor} ${bgColor} rounded-full transition-all duration-300`}
                          style={{ width: `${swipeProgress}%` }}
                        />
                      )}
                      {/* 길게 누르기 프로그레스 */}
                      {!swipeDirection && longPressProgress > 0 && (
                        <div
                          className={`h-full rounded-full bg-green-500 transition-all duration-300`}
                          style={{ width: `${longPressProgress}%` }}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex w-full flex-wrap justify-center gap-3">
          {tabTexts.map((text, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCard(idx)}
              className={`rounded-full px-3 py-1 text-xs transition-all md:text-sm ${selectedCard === idx ? `${borderColor} border-2 bg-white font-medium shadow-md ${textColor}` : 'border border-gray-200 bg-white ' + textColor}`}
            >
              {text}
            </button>
          ))}
        </div>
      </div>
      <div
        className={`text-center ${textColor} mt-4 max-w-xs text-xs md:text-sm ${isMobile ? 'mb-4' : 'mb-6'}`}
      >
        {selectedCard != null
          ? '길게 눌러 다운로드하거나 좌우로 스와이프하여 카드 변경'
          : '카드를 선택해주세요'}
      </div>
      <div className="mt-2 flex w-full max-w-md flex-col gap-3 px-4 sm:flex-row">
        <motion.button
          onClick={async () => {
            if (currentMemberId) {
              const { error } = await supabase.from('member_actions').insert({
                member_id: currentMemberId,
                action_type: 'retry',
              })

              if (error) {
                console.error('다시하기 로그 기록 실패:', error)
                return
              }
            }

            onSceneChange('startInit')
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`border-2 border-white ${bgColor} ${textColor} hover:${bgColor} mx-auto flex w-full max-w-[200px] items-center justify-center space-x-2 rounded-full px-8 py-2 text-sm shadow-lg transition-colors duration-300 md:px-10 md:py-3 md:text-base`}
        >
          <span className="font-medium">다시하기</span>
        </motion.button>
        <ShareButton
          currentMemberName={currentMemberName}
          selectedCard={images[selectedCard]?.src || ''}
          title="공유하기"
          textColor={textColor}
          borderColor={borderColor}
          memberId={currentMemberId}
        />
      </div>
    </div>
  )
}

export default RewardSceneLayout
