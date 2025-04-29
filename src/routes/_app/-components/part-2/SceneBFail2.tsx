'use client'

import FailScene from '@/components/FailScene'
import type { SceneKey } from '@/modules/scene-key.type'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function SceneAFail1({ onSceneChange }: SceneProps) {
    return (
        <FailScene
            onSceneChange={onSceneChange}
            bgImage="/home/4_박정민.png"
            chunks={[{ content: '취준생이라 돈 없는데?' }]}
            nextScene="part2SceneB"
        />
    )
}