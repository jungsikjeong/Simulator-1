'use client'

import SuccessScene from '@/components/SuccessScene'
import type { SceneKey } from '@/modules/scene-key.type'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part2SceneASuccess({ onSceneChange }: SceneProps) {
    return (
        <SuccessScene
            onSceneChange={onSceneChange}
            bgImage="/home/3_장원영.png"
            chunks={[
                {
                    content: '밖에서 여유롭게 짐빔 하이볼!',
                },
            ]}
            soundEffect="shalala"
            nextScene="part3"
        />
    )
}
