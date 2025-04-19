'use client'

import TypingText from './TypingText'
import { cn } from '@/lib/utils'
import { dialoguePreset, type UIPreset } from '@/lib/uiPresets'

interface DialogueBoxProps {
    chunks: { content: string; className?: string }[]
    onComplete?: () => void
    variant?: UIPreset
    className?: string
}

export default function DialogueBox({
    chunks,
    onComplete,
    variant = 'light',
    className,
}: DialogueBoxProps) {
    return (
        <div
            className={cn(
                'mx-auto w-[90%] max-w-xl rounded-xl border p-6',
                dialoguePreset[variant],
                className,
            )}
        >
            <TypingText
                text={chunks}
                className="text-base leading-relaxed"
                onComplete={onComplete}
            />
        </div>
    )
}
