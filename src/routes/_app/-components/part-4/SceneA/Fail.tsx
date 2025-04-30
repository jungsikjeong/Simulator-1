'use client'

import FailScene from '@/components/FailScene'
import type { SceneKey } from '@/modules/scene-key.type'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part4SceneAFail({ onSceneChange }: SceneProps) {
    return (
        <FailScene
            onSceneChange={onSceneChange}
            bgImage="/romance/3_박정민.png"
            chunks={[
                { content: '"편의점이 너무 멀어..."' },
            ]}
            nextScene="part4SceneAMain"
            failMessage="아차차... 너무 안쪽까지 들어왔구나..."
        />
    )
}