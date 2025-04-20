'use client'

import { useState } from 'react'
import SceneLayout from '@/components/SceneLayout'
import DialogueBox from '@/components/DialogueBox'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion } from 'framer-motion'

export default function Part2SceneBFail1({
    onSceneChange,
}: {
    onSceneChange: (scene: SceneKey) => void
}) {
    const [typingDone, setTypingDone] = useState(false)

    return (
        <SceneLayout bg="/home/4_박정민.png" effect="crossFade">
            <div className="absolute bottom-6 w-full flex flex-col items-center gap-4">
                <DialogueBox
                    chunks={[{ content: '집 보다 취직 먼저 할 건데?' }]}
                    variant="light"
                    onComplete={() => {
                        console.log('DialogueBox onComplete triggered')
                        setTypingDone(true)
                    }}
                    isTouchable={false}
                />

                {typingDone && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="w-[90%] max-w-xl"
                    >
                        <button
                            onClick={() => onSceneChange('part1')}
                            className="w-full rounded-xl border border-gray-200/50 py-4 px-6 
                                      bg-white/80 shadow-sm text-gray-800
                                      flex flex-col items-center justify-center gap-1
                                      transition-all duration-200
                                      hover:bg-white/90 active:scale-98 hover:shadow-md"
                        >
                            <div className="text-base font-medium">
                                아차차... 조금 더 분발해보자!!
                            </div>
                            <div className="flex items-center mt-1 text-blue-600 font-semibold">
                                <span className="mr-1">▶</span>
                                <span>다시하기</span>
                            </div>
                        </button>
                    </motion.div>
                )}
            </div>
        </SceneLayout>
    )
}