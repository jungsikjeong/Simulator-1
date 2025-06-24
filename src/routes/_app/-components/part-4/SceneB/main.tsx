'use client'

import RomanceScene from '@/components/RomanceScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part4SceneBMain({ onSceneChange }: SceneProps) {
    const [isTypingComplete, setIsTypingComplete] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)

    return (
        <RomanceScene
            onSceneChange={onSceneChange}
            bgImage="https://dmfnb4l6be84v.cloudfront.net/romance/5_%EB%B0%95%EC%A0%95%EB%AF%BC.webp"
            chunks={[
                {
                    content: '"응? 나 아무렇지 않은데?"', className: 'font-bold'
                },
            ]}
            soundEffect={null}
            nextScene="part4SceneBNext1"
            showRomanceEffect={false}
            isTypingComplete={isTypingComplete}
            setIsTypingComplete={setIsTypingComplete}
            isTouchable={isTouchable}
            setIsTouchable={setIsTouchable}
            nextBgList={['https://dmfnb4l6be84v.cloudfront.net/romance/6_%EB%B0%95%EC%A0%95%EB%AF%BC.webp']}
            dialogClassName="hideIndicatorWhenTouchable"
        />
    )
}
