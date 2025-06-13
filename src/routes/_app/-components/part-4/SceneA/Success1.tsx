'use client'

import RomanceScene from '@/components/RomanceScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState, useEffect } from 'react'
import { audioManager } from '@/modules/audio-manager'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

// 전역 오디오 객체 생성
const bgm = new Audio('/sounds/romance_bgm.mp3')
bgm.loop = true

export default function Part4SceneASuccess1({ onSceneChange }: SceneProps) {
    const [isTypingComplete, setIsTypingComplete] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)

    useEffect(() => {
        audioManager.playBGM('/sounds/romance_bgm.mp3')
    }, [])

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
                    content: '\n',
                },
                {
                    content: '남들은 우리더러\n',
                },
                {
                    content: '\n',
                },
                {
                    content: '청춘을 즐기라고 하는데\n',
                },
                {
                    content: '\n',
                },
                {
                    content: '짐빔 하이볼 마실 시간도 없잖아...\n',
                },
                {
                    content: '\n',
                },
                {
                    content: '\n',
                },
                {
                    content: '힘들땐 그냥 쉬어도 돼',
                },
            ]}
            soundEffect={null}
            nextScene="part4SceneBMain"
            showRomanceEffect={true}
            isTypingComplete={isTypingComplete}
            setIsTypingComplete={setIsTypingComplete}
            isTouchable={isTouchable}
            setIsTouchable={setIsTouchable}
            nextBgList={['/romance/5_박정민.jpg']}
            dialogClassName="hideIndicatorWhenTouchable"
        />
    )
}
