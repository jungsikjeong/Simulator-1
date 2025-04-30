// src/routes/_app/-components/part-4/SceneA/Success1.tsx
'use client'

import RomanceScene from '@/components/RomanceScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part4SceneBNext2({ onSceneChange }: SceneProps) {
    const [isTypingComplete, setIsTypingComplete] = useState(false)

    return (
        <RomanceScene
            onSceneChange={onSceneChange}
            bgImage="/romance/7_박정민.png"
            chunks={[

                {
                    content: '여유도', className: 'font-bold'
                },
            ]}
            soundEffect={null}
            nextScene="part4SceneBNext3"
            showRomanceEffect={true}
            isTypingComplete={isTypingComplete}
            setIsTypingComplete={setIsTypingComplete}
        />
    )
}
