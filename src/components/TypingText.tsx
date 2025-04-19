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
  /** 초당 입력할 글자 수 (default: 18cps) */
  speed?: number
  delay?: number
  className?: string
  isCursorBlinker?: boolean
  onComplete?: () => void
}

export default function TypingText({
  text,
  speed = 12,
  delay = 0.5,
  className,
  isCursorBlinker = true,
  onComplete,
}: TypingTextProps) {
  const [visible, setVisible] = useState<React.ReactNode[]>([])
  const full = text.map(t => t.content).join('')
  const count = useMotionValue(0)

  useEffect(() => {
    /* 전체 길이에 맞춰 duration 계산 */
    const duration = full.length / speed

    const controls = animate(count, full.length, {
      type: 'tween',
      delay,
      duration,
      ease: 'linear', // 속도 균일하게
      onUpdate: latest => {
        const len = Math.round(latest)
        let shown = 0
        const parts: React.ReactNode[] = []

        for (const [i, chunk] of text.entries()) {
          if (shown >= len) break
          const slice = chunk.content.slice(0, len - shown)
          shown += slice.length
          slice.split('\n').forEach((line, idx, arr) => {
            parts.push(
              <span key={`${i}-${idx}`} className={chunk.className}>
                {line}
              </span>
            )
            if (idx < arr.length - 1) parts.push(<br key={`br-${i}-${idx}`} />)
          })
        }
        setVisible(parts)
      },
      onComplete,
    })

    /* 스킵: Enter 또는 클릭 */
    const skip = () => {
      controls.stop()
      count.set(full.length)
      onComplete?.()
    }
    const kd = (e: KeyboardEvent) => e.key === 'Enter' && skip()
    window.addEventListener('keydown', kd)
    window.addEventListener('click', skip)
    return () => {
      controls.stop()
      window.removeEventListener('keydown', kd)
      window.removeEventListener('click', skip)
    }
  }, [full, speed, delay, text, onComplete])

  return (
    <span className={className}>
      {visible}
      {isCursorBlinker && <CursorBlinker />}
    </span>
  )
}
