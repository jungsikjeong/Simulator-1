import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface IDynamicPositionTagProps {
  layoutId: string
  className?: string
  className2?: string
  title: string
  onMinimize?: () => void
}

export default function DynamicPositionTag({
  layoutId,
  className,
  className2,
  title,
  onMinimize,
}: IDynamicPositionTagProps) {
  const [minimized, setMinimized] = useState(false)
  const [key, setKey] = useState(Math.random())

  useEffect(() => {
    // 컴포넌트가 마운트될 때마다 새로운 키 생성해서 글씨 위치 초기화되도록.
    setKey(Math.random())

    const timer = setTimeout(() => {
      setMinimized(true) // 일정 시간 후에 위치와 크기 바뀜
      onMinimize?.()
    }, 2000)

    return () => clearTimeout(timer)
  }, [onMinimize])

  const initialAnimationVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <>
      <AnimatePresence>
        {/* 오버레이 */}
        {!minimized && (
          <motion.div
            className="absolute inset-0 z-10 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              setMinimized(true)
              onMinimize?.()
            }}
          />
        )}
      </AnimatePresence>

      {!minimized ? (
        <motion.div
          layoutId={`${layoutId}-${key}`}
          className={cn(className, 'font-sbaggrob')}
          initial="hidden"
          animate="visible"
          variants={initialAnimationVariants}
        >
          {title}
        </motion.div>
      ) : (
        <motion.div
          layoutId={`${layoutId}-${key}`}
          className={cn(className2, 'font-sbaggrob')}
        >
          {title}
        </motion.div>
      )}
    </>
  )
}
