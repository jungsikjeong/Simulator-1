'use client'

import ChoiceList from '@/components/ChoiceList'
import DialogueBox from '@/components/DialogueBox'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion } from 'framer-motion'
import { useState } from 'react'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part3SceneAMain({ onSceneChange }: SceneProps) {
    const [choiceOpen, setChoiceOpen] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)

    return (
        <SceneLayout bg="https://dmfnb4l6be84v.cloudfront.net/hof/2_%EC%9E%A5%EC%9B%90%EC%98%81.webp" effect="trueBlend" nextBgList={['https://dmfnb4l6be84v.cloudfront.net/hof/3_%EC%9E%A5%EC%9B%90%EC%98%81.webp', 'https://dmfnb4l6be84v.cloudfront.net/party/3_%EC%9E%A5%EC%9B%90%EC%98%81.webp']}>
            <div className={`absolute ${choiceOpen ? 'bottom-2' : 'bottom-20'} flex w-full flex-col items-center gap-4`}>
                <div className="w-full max-w-xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <DialogueBox
                            chunks={[
                                {
                                    content: '괜찮아!\n',
                                },
                                {
                                    content: '퇴근 후에는\n',
                                },
                                {
                                    content: '더 멋진 시간을 보낼 수 있잖아!ㅎㅎ\n',
                                },
                                {
                                    content: '\n',
                                },
                                {
                                    content: '그렇다면!\n',
                                },
                            ]}
                            typingDelay={0.5}
                            variant="light"
                            className='p-5'
                            typingTextClassName="leading-relaxed"
                            onComplete={() => setChoiceOpen(true)}
                            isTouchable={isTouchable}
                            setIsTouchable={setIsTouchable}
                        />
                    </motion.div>
                </div>

                <ChoiceList
                    open={choiceOpen}
                    inline
                    variant="light"
                    choices={[
                        { key: 'fail', label: '고된 하루의 끝은 생맥주!' },
                        { key: 'fail', label: '고된 하루의 끝은 소주!' },
                        { key: 'success', label: '고된 하루의 끝은 짐빔 하이볼!' },
                    ]}
                    onSelect={k => {
                        switch (k) {
                            case 'success':
                                onSceneChange('part3SceneASuccess')
                                break
                            case 'fail':
                                onSceneChange('part3SceneAFail')
                                break
                        }
                    }}
                />
            </div>
        </SceneLayout>
    )
}
