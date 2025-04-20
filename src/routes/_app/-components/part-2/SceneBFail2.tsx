'use client'

import DialogueBox from '@/components/DialogueBox'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion } from 'framer-motion'
import { useState } from 'react'

type SceneProps = {
    onSceneChange: (scene: SceneKey) => void
}

export default function Part2SceneBFail2({ onSceneChange }: SceneProps) {
    const [typingDone, setTypingDone] = useState(false)

    return (
        <SceneLayout bg="/home/4_박정민.png" effect="fade">
            <div className="relative flex h-screen flex-col justify-end overflow-hidden pb-12">
                {/* Optional overlay for better readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        duration: 0.8,
                        ease: 'easeOut',
                        y: { type: 'spring', damping: 15, stiffness: 100 },
                        scale: { type: 'spring', damping: 20, stiffness: 100 },
                    }}
                >
                    <DialogueBox
                        chunks={[{ content: '취준생이라 돈 없는데?' }]}
                        typingDelay={0.5}
                        variant="fail"
                        className={typingDone ? "mb-5 p-5" : "mb-20 p-5"}
                        typingTextClassName="text-base sm:text-lg leading-relaxed"
                        onComplete={() => setTypingDone(true)}
                        isTouchable={typingDone}
                    />
                </motion.div>

                {typingDone && (
                    <div className="flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="w-[90%] max-w-xl"
                        >
                            <div className="w-full rounded-xl bg-white/80 px-5 py-5 shadow backdrop-blur-sm">
                                <div className="mb-4 text-center text-gray-700 text-sm sm:text-base">
                                    아차차... 조금 더 분발해보자!!
                                </div>

                                <motion.button
                                    onClick={() => onSceneChange('part2SceneB')}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-blue-500 py-3.5 text-white transition-all hover:bg-blue-600 hover:shadow-md"
                                >
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs group-hover:bg-white/30">▶</span>
                                    <span className="font-medium">다시하기</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </SceneLayout>
    )
}