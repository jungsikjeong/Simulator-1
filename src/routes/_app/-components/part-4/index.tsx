'use client'

import SuccessScene from '@/components/SuccessScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part4({ onSceneChange }: SceneProps) {
    const [isTypingComplete, setIsTypingComplete] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)

    return (
        <SuccessScene
            onSceneChange={onSceneChange}
            bgImage="/romance/1_박정민.jpg"
            bgClassName='relative h-screen w-full overflow-hidden bg-cover bg-center'

            chunks={[
                {
                    content: '낭만 없는데?',
                },
            ]}
            soundEffect={null}
            nextScene="part4SceneAMain"
            isTypingComplete={isTypingComplete}
            setIsTypingComplete={setIsTypingComplete}
            isTouchable={isTouchable}
            setIsTouchable={setIsTouchable}
            nextBgList={['/romance/2_박정민.png']}
        />
    )
}
