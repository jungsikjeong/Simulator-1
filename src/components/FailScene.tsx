'use client'

import DialogueBox from '@/components/DialogueBox'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

type FailSceneProps = {
    onSceneChange: (scene: SceneKey) => void
    bgImage: string
    chunks: Array<{ content: string; className?: string }>
    nextScene: SceneKey
    failMessage?: React.ReactNode
    showFailMessage?: boolean
}

export default function FailScene({
    onSceneChange,
    bgImage,
    chunks,
    nextScene,
    failMessage = (<><div>아차차...</div><div>조금 더 분발해보자!!</div></>),
    showFailMessage = true,
}: FailSceneProps) {
    const [typingDone, setTypingDone] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)
    const isMobile = useIsMobile()

    useEffect(() => {
        if (typingDone && navigator.vibrate) {
            navigator.vibrate(200)
        }
    }, [typingDone])

    return (
        <SceneLayout bg={bgImage} effect="shake">
            <div className={`relative flex h-screen flex-col justify-end overflow-hidden ${isMobile ? 'pb-6' : 'pb-12'}`}>
                <div className="absolute inset-0 pointer-events-none" />

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
                        chunks={chunks}
                        typingDelay={0.5}
                        variant="fail"
                        className={typingDone ? "mb-0 p-5" : "mb-6 p-5"}
                        typingTextClassName={`${isMobile ? 'text-xs' : 'text-base'} leading-relaxed`}
                        onComplete={() => setTypingDone(true)}
                        isTouchable={isTouchable}
                        setIsTouchable={setIsTouchable}
                    />
                </motion.div>

                {typingDone && (
                    <div className="flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="w-[80%] max-w-xl"
                        >
                            <div className={cn(
                                "w-full rounded-xl px-5 py-5 shadow",
                                showFailMessage ? "bg-white/80 backdrop-blur-sm" : ""
                            )}>
                                {showFailMessage && <div className="mb-4 text-center text-gray-700 text-sm sm:text-base whitespace-pre-line">
                                    {failMessage}
                                </div>}

                                <motion.button
                                    onClick={() => onSceneChange(nextScene)}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className={`bg-[#ffc000] text-white ${isMobile ? 'px-15 py-1.5' : 'px-20 py-3'} rounded-full shadow-lg hover:bg-amber-600 transition-all duration-300 font-bold`}
                                >
                                    <span className={`${isMobile ? 'text-xs' : 'text-base'}`}>다시하기 &gt;&gt;</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </SceneLayout>
    )
} 