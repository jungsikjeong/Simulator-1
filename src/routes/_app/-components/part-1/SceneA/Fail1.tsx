'use client'

import FailScene from '@/components/FailScene'
import type { SceneKey } from '@/modules/scene-key.type'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function Part1SceneAFail1({ onSceneChange }: SceneProps) {
  return (
    <FailScene
      onSceneChange={onSceneChange}
      bgImage="https://dmfnb4l6be84v.cloudfront.net/party/3_%EC%9E%A5%EC%9B%90%EC%98%81.webp"
      chunks={[
        { content: '분명 좋은 응원 방법이 있지 않을까?\n' },
        { content: '한 번 더 나를 위해 고민해 줄래?' },
      ]}
      nextScene="part1"
      showFailMessage={false}
    />
  )
}