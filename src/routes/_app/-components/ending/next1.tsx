'use client'

import RomanceScene from '@/components/RomanceScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'
import { Star } from 'lucide-react'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function EndingNext1({ onSceneChange }: SceneProps) {
    const [isTypingComplete, setIsTypingComplete] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)

    return (
        <div className="relative">
            <RomanceScene
                onSceneChange={onSceneChange}
                bgImage="/ending/2_같이.png"
                chunks={[
                    {
                        content: '각기 다른 청춘의 일상에 정답은 없지!\n', className: 'font-bold'
                    },
                    {
                        content: '너만의 방식대로 행복해서 다행이야~', className: 'font-bold'
                    },
                ]}
                soundEffect={null}
                nextScene="ending"
                showRomanceEffect={false}
                isTypingComplete={isTypingComplete}
                setIsTypingComplete={setIsTypingComplete}
                isTouchable={isTouchable}
                setIsTouchable={setIsTouchable}
            />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center text-white text-sm sm:text-lg">
                <Star className="w-6 h-6 text-yellow-400" fill="currentColor" />
                <span className="ml-2 mr-2 whitespace-nowrap">
                    원영이와 짐빔하이볼로 정민 응원하기, 성공
                </span>
                <Star className="w-6 h-6 text-yellow-400" fill="currentColor" />
            </div>
        </div>
    )
}
