'use client'

import SuccessScene from '@/components/SuccessScene'
import type { SceneKey } from '@/modules/scene-key.type'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part3({ onSceneChange }: SceneProps) {
    return (
        <SuccessScene
            onSceneChange={onSceneChange}
            bgImage="/hof/1_박정민.png"
            chunks={[
                {
                    content: '여유 없는데?',
                },
            ]}
            soundEffect={null}
            effect="fade"
            nextScene="part2"
            showGlitter={false}
        />
    )
}
