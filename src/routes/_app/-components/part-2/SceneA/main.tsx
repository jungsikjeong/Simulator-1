//src/routes/_app/-components/part-2/SceneA/main.tsx
import { useState } from 'react'
import SceneLayout from '@/components/SceneLayout'
import DialogueBox from '@/components/DialogueBox'
import ChoiceList from '@/components/ChoiceList'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/use-mobile'


export default function Part2SceneAMain({
    onSceneChange,
}: {
    onSceneChange: (scene: SceneKey) => void
}) {
    const [choiceOpen, setChoiceOpen] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)
    const isMobile = useIsMobile()

    return (
        <SceneLayout bg="/home/2_장원영.png" effect="trueBlend">
            <div className="absolute" style={{ top: isMobile ? '13%' : '14%', right: isMobile ? '15%' : '15%', transform: isMobile ? 'rotate(220deg)' : 'rotate(235deg)' }}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* First row */}
                    <div className="flex mb-2">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={`row1-${i}`}
                                className="flex mx-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    delay: i * 0.2,
                                    ease: "easeOut"
                                }}
                            >
                                <svg width={isMobile ? "6" : "10"} height={isMobile ? "8" : "12"} viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 2 C2 8, 8 8, 8 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </motion.div>
                        ))}
                    </div>

                    {/* Second row */}
                    <div className="flex mb-2">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={`row2-${i}`}
                                className="flex mx-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    delay: 0.3 + i * 0.2,
                                    ease: "easeOut"
                                }}
                            >
                                <svg width={isMobile ? "8" : "12"} height={isMobile ? "10" : "14"} viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 2 C2 10, 10 10, 10 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </motion.div>
                        ))}
                    </div>

                    {/* Third row */}
                    <div className="flex mb-2">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={`row3-${i}`}
                                className="flex mx-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    delay: 0.6 + i * 0.2,
                                    ease: "easeOut"
                                }}
                            >
                                <svg width={isMobile ? "10" : "14"} height={isMobile ? "12" : "16"} viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 2 C2 12, 12 12, 12 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </motion.div>
                        ))}
                    </div>

                    {/* Fourth row */}
                    <div className="flex">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={`row4-${i}`}
                                className="flex mx-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    delay: 0.9 + i * 0.2,
                                    ease: "easeOut"
                                }}
                            >
                                <svg width={isMobile ? "12" : "16"} height={isMobile ? "14" : "18"} viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 2 C2 14, 14 14, 14 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

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
