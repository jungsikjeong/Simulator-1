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
    onTypingEnd?: () => void
    onFailMessageEnd?: () => void
}

export default function FailScene({
    onSceneChange,
    bgImage,
    chunks,
    nextScene,
    failMessage = (<><div>아차차...</div><div>조금 더 분발해보자!!</div></>),
    showFailMessage = true,
    onTypingEnd,
    onFailMessageEnd,
}: FailSceneProps) {
    const [typingDone, setTypingDone] = useState(false)
    const [isTouchable, setIsTouchable] = useState(true)
    const isMobile = useIsMobile()

    useEffect(() => {
        const timer = setTimeout(() => {
            if (navigator.vibrate) {
                navigator.vibrate(300)
            }
        }, 100) // 타이핑 시작 전에 진동이 울리도록 약간의 지연 추가

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (typingDone) {
            const timer = setTimeout(() => {
                onFailMessageEnd?.()
            }, 1100)
            return () => clearTimeout(timer)
        }
    }, [typingDone, onFailMessageEnd])

    return (
        <SceneLayout bg={bgImage} effect="shake">
            <div className={`relative flex h-screen flex-col justify-end overflow-hidden ${isMobile ? 'pb-6' : 'pb-6'}`}>
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
                        className={cn(
                            typingDone && !showFailMessage ? "mb-0" : isMobile ? "mb-4" : "mb-4",
                            isMobile ? "p-2" : "p-3"
                        )}
                        typingTextClassName={`${isMobile ? 'text-xs' : 'text-base'} leading-relaxed`}
                        onComplete={() => {
                            setTypingDone(true)
                            onTypingEnd?.()
                        }}
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
                                "w-full rounded-sm px-5 py-4 shadow-md  ",
                                showFailMessage ? "bg-white/75 border-1 border-black ring-1 ring-black/20" : ""
                            )}>
                                {showFailMessage && <div className="mb-4 text-center text-gray-700 text-sm sm:text-base whitespace-pre-line">
                                    {failMessage}
                                </div>}

                                <motion.button
                                    onClick={() => onSceneChange(nextScene)}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className={`bg-[#ffc000] text-white ${isMobile ? 'px-15 py-1.5' : 'px-20 py-2'} rounded-full shadow-lg hover:bg-[#ffb000] transition-all duration-300 font-bold`}
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