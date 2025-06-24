//src/routes/_app/-components/part-2/SceneA/main.tsx
import { useState } from 'react'
import SceneLayout from '@/components/SceneLayout'
import DialogueBox from '@/components/DialogueBox'
import ChoiceList from '@/components/ChoiceList'
import SweatAnimation from '@/components/SweatAnimation'
import type { SceneKey } from '@/modules/scene-key.type'


export default function Part2SceneAMain({
    onSceneChange,
}: {
    onSceneChange: (scene: SceneKey) => void
}) {
    const [choiceOpen, setChoiceOpen] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)

    return (
        <SceneLayout bg="https://dmfnb4l6be84v.cloudfront.net/home/2_%EC%9E%A5%EC%9B%90%EC%98%81.webp" effect="trueBlend" nextBgList={['https://dmfnb4l6be84v.cloudfront.net/home/3_%EC%9E%A5%EC%9B%90%EC%98%81.webp', 'https://dmfnb4l6be84v.cloudfront.net/home/4_%EB%B0%95%EC%A0%95%EB%AF%BC.webp', 'https://dmfnb4l6be84v.cloudfront.net/home/5_%EB%B0%95%EC%A0%95%EB%AF%BC.webp']}>
            <SweatAnimation
                mobileTop="11%"
                mobileRight="19%"
                mobileRotation="220deg"
                desktopTop="7%"
                desktopRight="23%"
                desktopRotation="230deg"
                mobileSizes={{
                    first: { width: "6", height: "8" },
                    second: { width: "8", height: "10" },
                    third: { width: "10", height: "12" },
                    fourth: { width: "12", height: "14" }
                }}
                desktopSizes={{
                    first: { width: "10", height: "12" },
                    second: { width: "12", height: "14" },
                    third: { width: "14", height: "16" },
                    fourth: { width: "16", height: "18" }
                }}
            />

            <div className={`absolute ${choiceOpen ? 'bottom-2' : 'bottom-20'} flex w-full flex-col items-center gap-4`}>
                <DialogueBox
                    chunks={[
                        { content: '앗...\n' },
                        { content: '요즘 시대에 집 구하는거\n' },
                        { content: '정말 쉽지 않지ㅠㅠ 그치그치\n' },
                        { content: '\n' },
                        { content: '어떻게 하는게 좋을까?' },
                    ]}
                    variant="light"
                    className='p-5'
                    typingTextClassName="leading-relaxed"
                    onComplete={() => setChoiceOpen(true)}
                    isTouchable={isTouchable}
                    setIsTouchable={setIsTouchable}
                />

                <ChoiceList
                    open={choiceOpen}
                    inline
                    variant="light"
                    choices={[
                        { key: 'lotto', label: '하늘에 기도해보자' },
                        { key: 'enjoy', label: '밖에서 여유롭게 즐겨보자' },
                        { key: 'cheongyak', label: '청약 당첨을 기원해보자' },
                    ]}
                    onSelect={k => {
                        switch (k) {
                            case 'enjoy':
                                onSceneChange('part2SceneASuccess')
                                break
                            case 'cheongyak':
                                onSceneChange('part2SceneAFail1')
                                break
                            case 'lotto':
                                onSceneChange('part2SceneAFail2')
                                break
                        }
                    }
                    }
                />
            </div>
        </SceneLayout>
    )
}
