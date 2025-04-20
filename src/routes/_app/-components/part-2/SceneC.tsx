'use client'

import { useEffect, useState } from 'react'
import SceneLayout from '@/components/SceneLayout'
import DialogueBox from '@/components/DialogueBox'
import type { SceneKey } from '@/modules/scene-key.type'

export default function Part2SceneC({
    onSceneChange,
}: {
    onSceneChange: (scene: SceneKey) => void
}) {
    const [typingDone, setTypingDone] = useState(false)

    /* 아무 곳이나 클릭하면 part3SceneA 로 이동 */
    useEffect(() => {
        if (!typingDone) return

        const goNext = () => onSceneChange('part3SceneA' as SceneKey)
        window.addEventListener('click', goNext)
        return () => window.removeEventListener('click', goNext)
    }, [typingDone, onSceneChange])

    return (
        <SceneLayout bg="/home/3_장원영.png" effect="shake">
            <div className="absolute bottom-6 flex w-full justify-center">
                <DialogueBox
                    chunks={[{ content: '밖에서 여유롭게 짐빔 하이볼!' }]}
                    variant="light"
                    onComplete={() => setTypingDone(true)} isTouchable={false} />
            </div>
        </SceneLayout>
    )
}
