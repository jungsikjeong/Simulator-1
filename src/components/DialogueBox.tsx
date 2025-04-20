'use client'

import { dialoguePreset, type UIPreset } from '@/lib/uiPresets'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { MousePointerClick } from 'lucide-react'
import TypingText from './TypingText'
import { useState } from 'react'

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
  onTouchSceneChange?: () => void
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
  onTouchSceneChange,
}: DialogueBoxProps) {
  const [isComplete, setIsComplete] = useState(false)

  return (
    <div
      className={cn(
        'relative mx-auto w-[90%] max-w-xl rounded-xl border p-6',
        dialoguePreset[variant],
        className
      )}
      onClick={isComplete ? onTouchSceneChange : undefined}
    >
      <TypingText
        text={chunks}
        className={cn('text-base leading-relaxed', typingTextClassName)}
        onComplete={() => {
          setIsComplete(true)
          onComplete?.()
        }}
        speed={typingSpeed}
        delay={typingDelay}
        isCursorBlinker={isCursorBlinker}
      />

      <AnimatePresence>
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
            initial={{ opacity: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <MousePointerClick className="h-4 w-4" /> touch
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
