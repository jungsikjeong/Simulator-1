'use client'

import SuccessScene from '@/components/SuccessScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState, useEffect } from 'react'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function Part1SceneASuccess2({ onSceneChange }: SceneProps) {
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
      bgImage="/party/5_박정민.jpg"
      chunks={[
        {
          content: '친구 없는데?',
        },
      ]}
      soundEffect={null}
      effect="shake"
      nextScene="part1SceneBMain"
      isTypingComplete={isTypingComplete}
      setIsTypingComplete={setIsTypingComplete}
      isTouchable={isTouchable}
      setIsTouchable={setIsTouchable}
      nextBgList={['/party/6_장원영.jpg']}
    />
  )
}
