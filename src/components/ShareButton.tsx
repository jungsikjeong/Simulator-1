import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { Share2 } from 'lucide-react'
import { useEffect } from 'react'

declare global {
  interface Window {
    Kakao: any
  }
}

type ShareButtonProps = {
  currentMemberName: string
  selectedCard: string
  title: string
  textColor: string
  borderColor: string
  memberId?: string
}

export default function ShareButton({
  currentMemberName,
  selectedCard,
  title,
  textColor,
  borderColor,
  memberId,
}: ShareButtonProps) {
  const getBaseUrl = () => {
    if (import.meta.env.DEV) {
      return 'http://localhost:3000'
    }
    return import.meta.env.VITE_APP_URL || window.location.origin
  }

  const getFullImageUrl = (imagePath: string) => {
    const baseUrl = getBaseUrl()
    // 이미 절대 URL인 경우 그대로 반환
    if (imagePath.startsWith('http')) {
      return imagePath
    }
    // 상대 경로인 경우 baseUrl과 결합
    return `${baseUrl}${imagePath}`
  }

  useEffect(() => {
    const loadKakaoSDK = () => {
      if (typeof window !== 'undefined' && !window.Kakao) {
        const script = document.createElement('script')
        script.src = 'https://developers.kakao.com/sdk/js/kakao.js'
        script.async = true
        script.onload = () => {
          if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init(import.meta.env.VITE_KAKAO_APP_KEY)
          }
        }
        document.head.appendChild(script)
      } else if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(import.meta.env.VITE_KAKAO_APP_KEY)
      }
    }

    loadKakaoSDK()
  }, [])

  const shareToKakao = () => {
    if (typeof window !== 'undefined' && window.Kakao) {
      const baseUrl = getBaseUrl()
      const fullImageUrl = getFullImageUrl(selectedCard)
      console.log('공유할 이미지 URL:', fullImageUrl) // 디버깅용

      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: `${currentMemberName}님이 뽑은 카드!`,
          description: '나의 카드를 확인해보세요!',
          imageUrl: fullImageUrl,
          link: {
            mobileWebUrl: baseUrl,
            webUrl: baseUrl,
          },
        },
        buttons: [
          {
            title: '나도 카드 받기',
            link: {
              mobileWebUrl: baseUrl,
              webUrl: baseUrl,
            },
          },
        ],
      })
    } else {
      console.error('Kakao SDK가 로드되지 않았습니다.')
    }
  }

  const handleClick = async () => {
    shareToKakao()
    if (memberId) {
      const { error } = await supabase.from('member_actions').insert({
        member_id: memberId,
        action_type: 'share',
      })

      if (error) {
        console.error('공유 로그 기록 실패:', error)
        return
      }
    }
  }

  return (
    <motion.button
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 2 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`bg-white hover:bg-gray-50 ${textColor} ${borderColor} mx-auto flex w-full max-w-[200px] items-center justify-center space-x-2 rounded-full px-8 py-2 text-sm shadow-lg transition-colors duration-300 md:px-10 md:py-3 md:text-base`}
    >
      <Share2 size={18} />
      <span className="font-medium">{title}</span>
    </motion.button>
  )
}
