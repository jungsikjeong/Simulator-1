'use client'

import { dialoguePreset, type UIPreset } from '@/lib/uiPresets'
import { cn } from '@/lib/utils'
import TypingText from './TypingText'
import { motion } from 'framer-motion'
import { MousePointerClick } from 'lucide-react'

interface DialogueBoxProps {
  chunks: { content: string; className?: string }[]
  onComplete?: () => void
  variant?: UIPreset
  className?: string
  typingSpeed?: number
  typingDelay?: number
  isCursorBlinker?: boolean
  typingTextClassName?: string
  isTouchable: boolean
}

export default function DialogueBox({
  chunks,
  onComplete,
  variant = 'light',
  className,
  typingSpeed,
  typingDelay,
  isCursorBlinker,
  typingTextClassName,
  isTouchable,
}: DialogueBoxProps) {
  return (
    <div
      className={cn(
        'relative mx-auto w-[90%] max-w-xl rounded-xl border p-6',
        dialoguePreset[variant],
        className
      )}
    >
      <TypingText
        text={chunks}
        className={cn('text-base leading-relaxed', typingTextClassName)}
        onComplete={onComplete}
        speed={typingSpeed}
        delay={typingDelay}
        isCursorBlinker={isCursorBlinker}
      />

      {!isTouchable && (
        <motion.div
          className="absolute right-5 bottom-0 flex items-center justify-end"
          animate={{
            opacity: [1, 0, 1],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          <MousePointerClick className="h-4 w-4" /> touch
        </motion.div>
      )}
    </div>
  )
}
