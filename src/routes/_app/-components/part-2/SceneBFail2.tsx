'use client'

import { useState } from 'react'
import SceneLayout from '@/components/SceneLayout'
import DialogueBox from '@/components/DialogueBox'
import type { SceneKey } from '@/modules/scene-key.type'

export default function Part2SceneBFail2({
    onSceneChange,
}: {
    onSceneChange: (scene: SceneKey) => void
}) {
    const [typingDone, setTypingDone] = useState(false)

    return (
        <SceneLayout bg="/home/4_박정민.png" effect="shake">
            <div className="absolute bottom-6 w-full flex flex-col items-center gap-4">
                <DialogueBox
                    chunks={[{ content: '취준생이라 돈 없는데?' }]}
                    variant="light"
                    onComplete={() => {
                        console.log('DialogueBox onComplete triggered')
                        setTypingDone(true)
                    }}
                    isTouchable={false}
                />

                {typingDone && (
                    <div
                        onClick={() => onSceneChange('part1')}
                        className="w-[90%] max-w-xl rounded-xl border p-6 bg-white/20 backdrop-blur-sm cursor-pointer transition hover:bg-white/30"
                    >
                        <p className="text-base leading-relaxed text-center">
                            아차차...<br />
                            조금 더 분발해보자!!<br />
                            <span className="opacity-100 font-semibold">[다시하기]</span>
                        </p>
                    </div>
                )}
            </div>
        </SceneLayout>
    )
}