'use client'

import FailScene from '@/components/FailScene'
import type { SceneKey } from '@/modules/scene-key.type'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function Part1SceneAFail2({ onSceneChange }: SceneProps) {
  return (
    <FailScene
      onSceneChange={onSceneChange}
      bgImage="https://dmfnb4l6be84v.cloudfront.net/party/4_%EB%B0%95%EC%A0%95%EB%AF%BC.webp"
      chunks={[
        { content: '부담스러워...' },
      ]}
      nextScene="part1"
      showFailMessage={false}
    />
  )
}