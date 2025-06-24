'use client'

import FailScene from '@/components/FailScene'
import type { SceneKey } from '@/modules/scene-key.type'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part2SceneAFail2({ onSceneChange }: SceneProps) {
    return (
        <FailScene
            onSceneChange={onSceneChange}
            bgImage="https://dmfnb4l6be84v.cloudfront.net/home/5_%EB%B0%95%EC%A0%95%EB%AF%BC.webp"
            chunks={[{ content: '너무 대책 없는데?' }]}
            nextScene="part2SceneAMain"
        />
    )
}