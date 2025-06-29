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
            bgImage="https://dmfnb4l6be84v.cloudfront.net/party/3_%EC%9E%A5%EC%9B%90%EC%98%81.webp"
            chunks={[
                { content: '나 짐빔 광고 모델인거\n' },
                { content: '잊은거야ㅠㅠ?\n' },
                { content: '\n' },
                { content: '경쟁사는 말할 수 없다구.\n' },
                { content: '꼭 기억해줘ㅠㅠ' },
            ]}
            nextScene="part3SceneAMain"
            showFailMessage={false}
        />
    )
}