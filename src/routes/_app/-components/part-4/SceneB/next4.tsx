// src/routes/_app/-components/part-4/SceneB/next4.tsx
'use client'

import RomanceScene from '@/components/RomanceScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part4SceneBNext4({ onSceneChange }: SceneProps) {
    const [isTypingComplete, setIsTypingComplete] = useState(false)

    return (
        <RomanceScene
            onSceneChange={onSceneChange}
            bgImage="/romance/9_박정민.png"
            chunks={[

                {
                    content: '지금 이 순간\n', className: 'font-bold'
                },
                {
                    content: '특별한 게 없어도', className: 'font-bold'
                },
            ]}
            soundEffect={null}
            nextScene="part4SceneBNext5"
            showRomanceEffect={true}
            isTypingComplete={isTypingComplete}
            setIsTypingComplete={setIsTypingComplete}
        />
    )
}
