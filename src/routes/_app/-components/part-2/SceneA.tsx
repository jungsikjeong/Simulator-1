'use client'

import SceneLayout from '@/components/SceneLayout'
import DialogueBox from '@/components/DialogueBox'
import ChoiceList from '@/components/ChoiceList'
import { useState } from 'react'
import type { SceneKey } from '@/modules/scene-key.type'

export default function Part2_SceneA({
    onSceneChange,
}: {
    onSceneChange: (scene: SceneKey) => void
}) {
    const [choiceOpen, setChoiceOpen] = useState(false)

    return (
        <SceneLayout bg="/party/1_박정민.png" effect="shake">
            <div className="absolute bottom-6 w-full flex flex-col items-center gap-4">

                <DialogueBox
                    chunks={[
                        { content: '어? 파티장에서 우울한 청년이 보이는데...\n' },
                        { content: '어떻게 할까?', className: 'font-bold' },
                    ]}
                    variant="light"
                    onComplete={() => setChoiceOpen(true)}
                />

                {/* 말풍선 아래 인라인으로 배치 */}
                <ChoiceList
                    open={choiceOpen}
                    inline
                    variant="light"
                    choices={[
                        { key: 'greet', label: '웃으며 인사한다' },
                        { key: 'ignore', label: '그냥 지나친다' },
                    ]}
                    onSelect={k =>
                        onSceneChange(k === 'greet' ? 'part2' : 'part2_sceneA_ignore')
                    }
                />
            </div>
        </SceneLayout>
    )
}
