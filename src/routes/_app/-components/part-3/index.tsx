'use client'

import SuccessScene from '@/components/SuccessScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState, useEffect } from 'react'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part3({ onSceneChange }: SceneProps) {
    const [isTypingComplete, setIsTypingComplete] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (navigator.vibrate) {
                navigator.vibrate(300)
            }
        }, 100)

        return () => clearTimeout(timer)
    }, [])

    return (
        <SuccessScene
            onSceneChange={onSceneChange}
            bgImage="https://dmfnb4l6be84v.cloudfront.net/hof/1_%EB%B0%95%EC%A0%95%EB%AF%BC.webp"
            chunks={[
                {
                    content: '여유 없는데?',
                },
            ]}
            bgClassName='relative h-screen w-full overflow-hidden bg-cover bg-center'
            effect='shake'
            soundEffect={null}
            nextScene="part3SceneAMain"
            isTypingComplete={isTypingComplete}
            setIsTypingComplete={setIsTypingComplete}
            isTouchable={isTouchable}
            setIsTouchable={setIsTouchable}
            nextBgList={['https://dmfnb4l6be84v.cloudfront.net/hof/2_%EC%9E%A5%EC%9B%90%EC%98%81.webp']}
        />
    )
}
