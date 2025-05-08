'use client'

import RomanceScene from '@/components/RomanceScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part4SceneBNext6({ onSceneChange }: SceneProps) {
    const [isTypingComplete, setIsTypingComplete] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)

    return (
        <RomanceScene
            onSceneChange={onSceneChange}
            bgImage="/romance/13_장원영.png"
            chunks={[
                {
                    content: '...\n', className: 'font-bold text-black/50'
                },
                {
                    content: '그것 참 잘됐다', className: 'font-bold text-black/50'
                },
            ]}
            soundEffect={null}
            nextScene="part4SceneBNext7"
            showRomanceEffect={false}
            isTypingComplete={isTypingComplete}
            setIsTypingComplete={setIsTypingComplete}
            isTouchable={isTouchable}
            setIsTouchable={setIsTouchable}
        />
    )
}
