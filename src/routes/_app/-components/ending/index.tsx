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

export default function Ending({ onSceneChange }: SceneProps) {
    const [isTypingComplete, setIsTypingComplete] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)

    useEffect(() => {
        audioManager.stopBGM()
    }, [])

    return (
        <RomanceScene
            onSceneChange={onSceneChange}
            bgImage="/ending/1_장원영.png"
            chunks={[
                {
                    content: '...\n', className: 'font-bold text-black/70'
                },
                {
                    content: '그거 정말 정말 잘됐다', className: 'font-bold text-black/70'
                },
            ]}
            soundEffect={null}
            nextScene="endingNext1"
            showRomanceEffect={false}
            isTypingComplete={isTypingComplete}
            setIsTypingComplete={setIsTypingComplete}
            isTouchable={isTouchable}
            setIsTouchable={setIsTouchable}
            dialogClassName="bg-white/75 rounded-lg px-4"
            nextBgList={['/ending/2_같이.png']}
        />
    )
}
