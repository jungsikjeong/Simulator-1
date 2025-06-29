'use client'

import ChoiceList from '@/components/ChoiceList'
import DialogueBox from '@/components/DialogueBox'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'
import { useGetCurrentMemberName, useUpdateMemberStatus, useGetCurrentMemberId } from '@/service/member/useGetMember'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function EndingNext2({ onSceneChange }: SceneProps) {
    const [choiceOpen, setChoiceOpen] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)
    const { data: currentMemberName } = useGetCurrentMemberName()
    const { mutate: updateStatus } = useUpdateMemberStatus()
    const { data: memberId } = useGetCurrentMemberId()

    return (
        <SceneLayout bg="https://dmfnb4l6be84v.cloudfront.net/ending/3_%EA%B0%99%EC%9D%B4.webp" effect="trueBlend">
            <div className={`absolute ${choiceOpen ? 'bottom-2' : 'bottom-20'} flex w-full flex-col items-center gap-4`}>
                <div className="w-full max-w-xl">
                    <div className="opacity-100">
                        <DialogueBox
                            chunks={[
                                {
                                    content: `[${currentMemberName}]!\n`,
                                },
                                {
                                    content: '청춘의 일상에 정답은 없지만\n',
                                },
                                {
                                    content: '짐빔은 항상 옆에 있어!\n',
                                },
                                {
                                    content: '\n',
                                },
                                {
                                    content: '오늘도 도와줘서 고마워,\n',
                                },
                                {
                                    content: '오늘도 수고 많았어, 항상 응원해!\n',
                                },
                                {
                                    content: 'CHEERS~!\n',
                                },
                            ]}
                            typingDelay={0}
                            variant="light"
                            className='p-5'
                            typingTextClassName="leading-relaxed"
                            onComplete={() => setChoiceOpen(true)}
                            isTouchable={isTouchable}
                            setIsTouchable={setIsTouchable}
                        />
                    </div>
                </div>

                <ChoiceList
                    open={choiceOpen}
                    inline
                    variant="light"
                    choices={[
                        { key: 'plain', label: '고맙다, 우리 모두 힘내자.' },
                        { key: 'lemon', label: '웅웅 너도 고생많았어 파이팅!!' },
                        { key: 'jinjer', label: '진짜 진짜 진저 고마워 원영아~' },
                        { key: 'grape', label: '고생은 뭘?!ㅎㅎ!!!' },
                    ]}
                    onSelect={k => {
                        switch (k) {
                            case 'plain':
                                onSceneChange('plain')
                                updateStatus({ id: memberId, status: 'completed' })
                                break
                            case 'lemon':
                                onSceneChange('lemon')
                                updateStatus({ id: memberId, status: 'completed' })
                                break
                            case 'jinjer':
                                onSceneChange('jinjer')
                                updateStatus({ id: memberId, status: 'completed' })
                                break
                            case 'grape':
                                onSceneChange('grape')
                                updateStatus({ id: memberId, status: 'completed' })
                                break
                        }
                    }}
                />
            </div>
        </SceneLayout>
    )
}
