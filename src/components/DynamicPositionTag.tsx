import { cn } from '@/lib/utils'
import { motion, LayoutGroup } from 'framer-motion'
import { useEffect, useState } from 'react'

interface IDynamicPositionTagProps {
  layoutId: string
  className?: string
  className2?: string
  title: string
}

export default function DynamicPositionTag({
  layoutId,
  className,
  className2,
  title,
}: IDynamicPositionTagProps) {
  const [minimized, setMinimized] = useState(false)
  const [key, setKey] = useState(Math.random())

  useEffect(() => {
    // 컴포넌트가 마운트될 때마다 새로운 키 생성해서 글씨 위치 초기화되도록.
    setKey(Math.random())

    const timer = setTimeout(() => {
      setMinimized(true) // 일정 시간 후에 위치와 크기 바뀜
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

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
