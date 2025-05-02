'use client'

import RomanceScene from '@/components/RomanceScene'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'
import { Star } from 'lucide-react'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part4SceneBNext7({ onSceneChange }: SceneProps) {
    const [isTypingComplete, setIsTypingComplete] = useState(false)

    return (
        <div className="relative">
            <RomanceScene
                onSceneChange={onSceneChange}
                bgImage="/romance/14_같이.png"
                chunks={[
                    {
                        content: 'CHEERS!!', className: 'font-bold text-[3rem] [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]'
                    },
                    {
                        content: '\n\n', className: 'font-bold'
                    },
                    {
                        content: '각기 다른 청춘의 일상에 정답은 없지!\n', className: 'font-bold [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]'
                    },
                    {
                        content: '너만의 방식대로 행복해서 다행이야~', className: 'font-bold [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]'
                    },
                ]}
                soundEffect={null}
                nextScene="part4SceneBNext1"
                showRomanceEffect={false}
                isTypingComplete={isTypingComplete}
                setIsTypingComplete={setIsTypingComplete}
                sceneEffect="shake"
            />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center text-white text-sm">
                <Star className="w-6 h-6 text-yellow-400" fill="currentColor" />
                <span>원영이와 짐빔하이볼로 정민 응원하기, 성공</span>
                <Star className="w-6 h-6 text-yellow-400" fill="currentColor" />
            </div>
        </div>
    )
}
