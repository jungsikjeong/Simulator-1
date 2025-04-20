'use client'

import { useEffect, useState } from 'react'
import SceneLayout from '@/components/SceneLayout'
import DialogueBox from '@/components/DialogueBox'
import type { SceneKey } from '@/modules/scene-key.type'

export default function Part2SceneA({
    onSceneChange,
}: {
    onSceneChange: (scene: SceneKey) => void
}) {
    const [typingDone, setTypingDone] = useState(false)

    /* 아무 곳이나 클릭하면 씬 B 로 이동 */
    useEffect(() => {
        if (!typingDone) return

        const goNext = () => onSceneChange('part2SceneB' as SceneKey)
        window.addEventListener('click', goNext)
        return () => window.removeEventListener('click', goNext)
    }, [typingDone, onSceneChange])

    return (
        <SceneLayout bg="/home/1_박정민.png" effect="fade">
            <div className="absolute bottom-6 flex w-full justify-center">
                <DialogueBox
                    chunks={[{ content: '집 없는데?' }]}
                    variant="light"
                    onComplete={() => setTypingDone(true)} isTouchable={false} />
            </div>
        </SceneLayout>
    )
}
