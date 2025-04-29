'use client'

import SuccessScene from '@/components/SuccessScene'
import type { SceneKey } from '@/modules/scene-key.type'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function SceneASuccess({ onSceneChange }: SceneProps) {
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
      nextScene="part1SceneASuccessNext"
    />
  )
}
