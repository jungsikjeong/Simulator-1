'use client'

import SuccessScene from '@/components/SuccessScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function Part1SceneASuccess1({ onSceneChange }: SceneProps) {
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  return (
    <SuccessScene
      onSceneChange={onSceneChange}
      bgImage="/party/2_장원영.png"
      chunks={[
        {
          content: '좋아하는 친구들과 짐빔 하이볼!',
        },
      ]}
      soundEffect="shalala"
      nextScene="part1SceneASuccess2"
      isTypingComplete={isTypingComplete}
      setIsTypingComplete={setIsTypingComplete}
    />
  )
}
