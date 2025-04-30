'use client'

import FailScene from '@/components/FailScene'
import type { SceneKey } from '@/modules/scene-key.type'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part3SceneAFail({ onSceneChange }: SceneProps) {
    return (
        <FailScene
            onSceneChange={onSceneChange}
            bgImage="/hof/4_장원영.png"
            chunks={[
                { content: '"나 짐빔 광고 모델인거\n' },
                { content: '잊은거야ㅠㅠ?"\n' },
            ]}
            nextScene="part1SceneBMain"
            failMessage="경쟁사는 말할 수 없다구. 꼭 기억해줘ㅠㅠ"
        />
    )
}