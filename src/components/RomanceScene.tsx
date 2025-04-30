'use client'

import DialogueBox from '@/components/DialogueBox'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion } from 'framer-motion'
import EnhancedRomanceEffect from '@/components/romance-effect'
import type { SoundEffect } from '@/components/SceneLayout'

type SuccessSceneProps = {
    onSceneChange: (scene: SceneKey) => void
    bgImage: string
    chunks: Array<{ content: string; className?: string }>
    nextScene: SceneKey
    showRomanceEffect?: boolean
    soundEffect?: SoundEffect | null
    isTypingComplete?: boolean
    setIsTypingComplete?: (isComplete: boolean) => void
}

export default function RomanceScene({
    onSceneChange,
    bgImage,
    chunks,
    nextScene,
    showRomanceEffect = true,
    soundEffect = null,
    isTypingComplete = false,
    setIsTypingComplete,
}: SuccessSceneProps) {
    return (
        <SceneLayout bg={bgImage} effect={'fade'} soundEffect={soundEffect as SoundEffect}>
            <div
                className="relative flex h-screen flex-col justify-end overflow-hidden bg-cover bg-center"
                onClick={() => isTypingComplete && onSceneChange(nextScene)}
            >
                {showRomanceEffect && <EnhancedRomanceEffect />}
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
                        variant="romance"
                        className="mb-60 cursor-pointer px-0 py-6 transition-transform duration-200"
                        typingTextClassName="text-base sm:text-xl leading-relaxed"
                        isTouchable={isTypingComplete}
                        onTouchSceneChange={() => onSceneChange(nextScene)}
                        isTypingComplete={isTypingComplete}
                        setIsTypingComplete={setIsTypingComplete}
                    />
                </motion.div>
            </div>
        </SceneLayout>
    )
} 