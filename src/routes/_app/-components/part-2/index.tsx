'use client'

import SuccessScene from '@/components/SuccessScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState, useEffect } from 'react'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part2({ onSceneChange }: SceneProps) {
    const [isTypingComplete, setIsTypingComplete] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (navigator.vibrate) {
                navigator.vibrate(300)
            }
        }, 100) // 타이핑 시작 전에 진동이 울리도록 약간의 지연 추가

        return () => clearTimeout(timer)
    }, [])

    return (
        <SuccessScene
            onSceneChange={onSceneChange}
            bgImage="/home/1_박정민.png"
            chunks={[
                {
                    content: '집 없는데?',
                },
            ]}
            soundEffect={null}
            effect='shake'
            nextScene="part2SceneAMain"
            isTypingComplete={isTypingComplete}
            setIsTypingComplete={setIsTypingComplete}
            isTouchable={isTouchable}
            setIsTouchable={setIsTouchable}
            nextBgList={['/home/2_장원영.png']}
        />
    )
}
