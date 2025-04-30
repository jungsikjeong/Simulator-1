// src/routes/_app/-components/part-4/SceneA/Success1.tsx
'use client'

import RomanceScene from '@/components/RomanceScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part4SceneBNext1({ onSceneChange }: SceneProps) {
    const [isTypingComplete, setIsTypingComplete] = useState(false)

    return (
        <RomanceScene
            onSceneChange={onSceneChange}
            bgImage="/romance/6_박정민.png"
            chunks={[

                {
                    content: '친구도', className: 'font-bold'
                },
            ]}
            soundEffect={null}
            nextScene="part4SceneBNext2"
            showRomanceEffect={true}
            isTypingComplete={isTypingComplete}
            setIsTypingComplete={setIsTypingComplete}
        />
    )
}
