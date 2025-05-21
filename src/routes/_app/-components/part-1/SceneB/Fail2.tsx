'use client'

import FailScene from '@/components/FailScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'
import JimBeamCan from './JimBeamCan'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function Part1SceneBFail2({ onSceneChange }: SceneProps) {
  const [showCan, setShowCan] = useState(false)

  return (
    <>
      <FailScene
        onSceneChange={onSceneChange}
        bgImage="/party/5_박정민.png"
        chunks={[
          { content: '"마시고 있는데?"\n' },
        ]}
        nextScene="part1SceneBMain"
        failMessage={
          <>
            <div>아... 벌써 마시고 있구나</div>
            <div>맛있게 마셔! 안녕!</div>
          </>
        }
        onFailMessageEnd={() => setShowCan(true)}
      />
      <JimBeamCan show={showCan} />
    </>
  )
}