'use client'

import RomanceScene from '@/components/RomanceScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part4SceneBNext3({ onSceneChange }: SceneProps) {
    const [isTypingComplete, setIsTypingComplete] = useState(false)

    return (
        <RomanceScene
            onSceneChange={onSceneChange}
            bgImage="/romance/8_박정민.png"
            chunks={[

                {
                    content: '낭만도 없지만', className: 'font-bold'
                },
            ]}
            soundEffect={null}
            nextScene="part4SceneBNext4"
            showRomanceEffect={true}
            isTypingComplete={isTypingComplete}
            setIsTypingComplete={setIsTypingComplete}
        />
    )
}
