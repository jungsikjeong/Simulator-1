'use client'

import DialogueBox from '@/components/DialogueBox'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
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
    sceneEffect?: 'fade' | 'shake'
    isTouchable?: boolean
    setIsTouchable?: (isTouchable: boolean) => void
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
    sceneEffect = 'fade',
    isTouchable = true,
    setIsTouchable,
}: SuccessSceneProps) {
    return (
        <SceneLayout bg={bgImage} effect={sceneEffect as 'fade' | 'shake'} soundEffect={soundEffect as SoundEffect}>
            <div
                className="relative flex h-screen flex-col justify-center overflow-hidden bg-cover bg-center"
                onClick={() => isTypingComplete && onSceneChange(nextScene)}
            >
                {showRomanceEffect && <EnhancedRomanceEffect />}
                <DialogueBox
                    chunks={chunks}
                    typingDelay={0.5}
                    variant="romance"
                    className="mx-auto cursor-pointer px-0 py-6"
                    typingTextClassName="text-base sm:text-xl leading-relaxed"
                    isTouchable={isTouchable}
                    setIsTouchable={setIsTouchable}
                    onTouchSceneChange={() => onSceneChange(nextScene)}
                    isTypingComplete={isTypingComplete}
                    setIsTypingComplete={setIsTypingComplete}
                />
            </div>
        </SceneLayout>
    )
} 