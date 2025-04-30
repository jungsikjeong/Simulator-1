'use client'

import SuccessScene from '@/components/SuccessScene'
import type { SceneKey } from '@/modules/scene-key.type'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part3SceneASuccess({ onSceneChange }: SceneProps) {
    return (
        <SuccessScene
            onSceneChange={onSceneChange}
            bgImage="/hof/3_장원영.png"
            chunks={[
                {
                    content: '힘든 하루를 끝내고 낭만있게\n',
                },
                {
                    content: '짐빔 하이볼!',
                },
            ]}
            soundEffect="shalala"
            nextScene="part3"
        />
    )
}
