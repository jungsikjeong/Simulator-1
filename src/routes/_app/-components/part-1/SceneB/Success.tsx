'use client'

import SuccessScene from '@/components/SuccessScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function Part1SceneBSuccess({ onSceneChange }: SceneProps) {
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  return (
    <SuccessScene
      onSceneChange={onSceneChange}
      bgImage="/party/7_장원영.png"
      chunks={[
        {
          content: '그럼 나 혼자 집에서 짐빔 하이볼!',
        },
      ]}
      soundEffect="shalala"
      nextScene="part2"
      isTypingComplete={isTypingComplete}
      setIsTypingComplete={setIsTypingComplete}
    />
  )
}
