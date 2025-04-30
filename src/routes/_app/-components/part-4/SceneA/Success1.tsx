// src/routes/_app/-components/part-4/SceneA/Success1.tsx
'use client'

import RomanceScene from '@/components/RomanceScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part4SceneASuccess1({ onSceneChange }: SceneProps) {
    const [isTypingComplete, setIsTypingComplete] = useState(false)

    return (
        <RomanceScene
            onSceneChange={onSceneChange}
            bgImage="/romance/4_박정민.png"
            chunks={[
                {
                    content: '힘들지?\n',
                },
                {
                    content: '\n',
                },
                {
                    content: '남들은 우리더러\n',
                },
                {
                    content: '청춘을 즐기라고 하는데\n',
                },
                {
                    content: '짐빔 하이볼 마실 시간도 없잖아...\n',
                },
                {
                    content: '\n',
                },
                {
                    content: '힘들땐 그냥 쉬어도 돼\n',
                },
            ]}
            soundEffect={null}
            nextScene="part4SceneAMain"
            showRomanceEffect={true}
            isTypingComplete={isTypingComplete}
            setIsTypingComplete={setIsTypingComplete}
        />
    )
}
