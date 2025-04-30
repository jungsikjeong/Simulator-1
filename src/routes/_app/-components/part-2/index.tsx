'use client'

import SuccessScene from '@/components/SuccessScene'
import type { SceneKey } from '@/modules/scene-key.type'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part2({ onSceneChange }: SceneProps) {
    return (
        <SuccessScene
            onSceneChange={onSceneChange}
            bgImage="/home/1_박정민.png"
            chunks={[
                {
                    content: '집 없는데?',
                },
            ]}
            soundEffect={null}
            effect="fade"
            nextScene="part2SceneAMain"
            showGlitter={false}
        />
    )
}
