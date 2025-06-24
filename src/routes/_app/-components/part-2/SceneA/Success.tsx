'use client'

import SuccessScene from '@/components/SuccessScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part2SceneASuccess({ onSceneChange }: SceneProps) {
    const [isTypingComplete, setIsTypingComplete] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)

    const modelFaceArea = {
        top: 24,
        left: 30,
        width: 34,
        height: 30,
    }

    return (
        <SuccessScene
            onSceneChange={onSceneChange}
            bgImage="https://dmfnb4l6be84v.cloudfront.net/home/3_%EC%9E%A5%EC%9B%90%EC%98%81.webp"
            bgClassName='relative h-screen w-full overflow-hidden bg-cover bg-center'
            chunks={[
                {
                    content: '밖에서 여유롭게 짐빔 하이볼!',
                },
            ]}
            soundEffect="shalala"
            nextScene="part3"
            isTypingComplete={isTypingComplete}
            setIsTypingComplete={setIsTypingComplete}
            isTouchable={isTouchable}
            setIsTouchable={setIsTouchable}
            showGlitter={true}
            faceArea={modelFaceArea}
            nextBgList={['https://dmfnb4l6be84v.cloudfront.net/hof/1_%EB%B0%95%EC%A0%95%EB%AF%BC.webp']}
        />
    )
}