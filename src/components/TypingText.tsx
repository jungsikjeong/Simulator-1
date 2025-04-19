'use client'

import { animate, useMotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'
import CursorBlinker from './CursorBlinker'

interface TypingChunk {
  content: string
  className?: string
}

interface TypingTextProps {
  text: TypingChunk[]
  delay?: number
  duration?: number
  className?: string
  isCursorBlinker?: boolean
  onComplete?: () => void
}

export default function TypingText({
  text,
  delay = 2.2,
  duration = 3,
  className,
  isCursorBlinker = true,
  onComplete,
}: TypingTextProps) {
  const [done, setDone] = useState(false)
  const [visibleNodes, setVisibleNodes] = useState<React.ReactNode[]>([])

  const fullText = text.map(t => t.content).join('')
  const count = useMotionValue(0)

  useEffect(() => {
    const controls = animate(count, fullText.length, {
      type: 'tween',
      delay,
      duration,
      ease: 'easeInOut',
      onUpdate: latest => {
        const rounded = Math.round(latest)
        let shown = 0
        const parts: React.ReactNode[] = []

        for (const [i, chunk] of text.entries()) {
          if (shown >= rounded) break

          const remaining = rounded - shown
          const contentToShow = chunk.content.slice(0, remaining)
          shown += contentToShow.length

          const lines = contentToShow.split('\n')
          lines.forEach((line, lineIdx) => {
            parts.push(
              <span key={`${i}-${lineIdx}`} className={chunk.className}>
                {line}
              </span>
            )
            if (lineIdx < lines.length - 1) {
              parts.push(<br key={`br-${i}-${lineIdx}`} />)
            }
          })
        }

        setVisibleNodes(parts)
      },
      onComplete: () => {
        setDone(true)
        onComplete?.()
      },
    })

    const skip = () => {
      controls.stop()
      console.log('fullText:', fullText.length, fullText)
      count.set(fullText.length)
      setDone(true)
      onComplete?.()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') skip()
    }
    const handleClick = () => skip()

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('click', handleClick)

    return () => {
      controls.stop()
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <span className={className}>
      {visibleNodes}
      {isCursorBlinker && <CursorBlinker />}
    </span>
  )
}
