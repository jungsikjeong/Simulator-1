'use client'

import SuccessScene from '@/components/SuccessScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useEffect, useState } from 'react'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function Part2({ onSceneChange }: SceneProps) {
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [isTouchable, setIsTouchable] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (navigator.vibrate) {
        navigator.vibrate(300)
      }
    }, 100) // 타이핑 시작 전에 진동이 울리도록 약간의 지연 추가

    return () => clearTimeout(timer)
  }, [])

    return (
        <SuccessScene
            onSceneChange={onSceneChange}
            bgImage="https://dmfnb4l6be84v.cloudfront.net/home/1_%EB%B0%95%EC%A0%95%EB%AF%BC.webp"
            bgClassName='relative h-screen w-full overflow-hidden bg-cover bg-center'
            chunks={[
                {
                    content: '집 없는데?',
                },
            ]}
            soundEffect={null}
            effect='shake'
            nextScene="part2SceneAMain"
            isTypingComplete={isTypingComplete}
            setIsTypingComplete={setIsTypingComplete}
            isTouchable={isTouchable}
            setIsTouchable={setIsTouchable}
            nextBgList={['https://dmfnb4l6be84v.cloudfront.net/home/2_%EC%9E%A5%EC%9B%90%EC%98%81.webp']}
        />
    )
}
