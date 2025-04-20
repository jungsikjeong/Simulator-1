'use client'

import { dialoguePreset, type UIPreset } from '@/lib/uiPresets'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import TypingText from './TypingText'

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
        'relative mx-auto w-[90%] max-w-xl rounded-xl border p-5',
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

      <AnimatePresence>
        {!isTouchable && (
          <motion.div
            className="absolute right-4 bottom-2 flex items-center justify-end text-xs opacity-70"
            animate={{
              opacity: [0.7, 0.4, 0.7],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <span className="mr-1">▶︎</span> touch
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
