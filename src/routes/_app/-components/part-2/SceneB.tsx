import { useState } from 'react'
import SceneLayout from '@/components/SceneLayout'
import DialogueBox from '@/components/DialogueBox'
import ChoiceList from '@/components/ChoiceList'
import type { SceneKey } from '@/modules/scene-key.type'

export default function Part2SceneB({
    onSceneChange,
}: {
    onSceneChange: (scene: SceneKey) => void
}) {

    const [choiceOpen, setChoiceOpen] = useState(false)

    return (
        <SceneLayout bg="/home/2_장원영.png" effect="shake">

            <div className="absolute bottom-6 w-full flex flex-col items-center gap-4">

                <DialogueBox
                    chunks={[
                        { content: '앗...\n' },
                        { content: '요즘 시대에 집 구하는거\n' },
                        { content: '정말 쉽지 않지ㅠㅠ 그치그치\n' },
                        { content: '\n' },
                        { content: '어떻게 하는게 좋을까?' },
                    ]}
                    variant="dark"
                    onComplete={() => setChoiceOpen(true)}
                />

                <ChoiceList
                    open={choiceOpen}
                    inline
                    variant="dark"
                    choices={[
                        { key: 'enjoy', label: '밖에서 여유롭게 즐겨보자' },
                        { key: 'cheongyak', label: '청약 당첨을 기원해보자' },
                        { key: 'lotto', label: '로또를 구매해 보자' },
                    ]}
                    onSelect={k =>
                        onSceneChange(
                            k === 'enjoy' ? ('part2SceneB' as SceneKey) : ('part2SceneBIgnore' as SceneKey),
                        )
                    }
                />
            </div>
        </SceneLayout>
    )
}
