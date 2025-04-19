'use client'

import DynamicPositionTag from '@/components/DynamicPositionTag'
import TypingText from '@/components/TypingText'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function SceneA({ onSceneChange }: SceneProps) {
  const [showChoices, setShowChoices] = useState(false)

  return (
    <div className="relative flex h-screen flex-col justify-end overflow-hidden bg-[url('/party/1_박정민.png')] bg-cover bg-center">
      <DynamicPositionTag
        layoutId="party1"
        title="#파티1"
        className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-4xl font-bold"
        className2="absolute top-4 left-4 text-sm font-semibold text-white"
      />

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2.2 }}
        className="min-h-[180px] w-full border-t border-white/20 bg-black/70 p-4 backdrop-blur-sm"
      >
        <TypingText
          text={[
            { content: '어? 저기 파티장에서 우울하게 있는 청년이 있어,\n' },
            { content: '그에게 어떤 이야기를 할까?', className: 'font-bold' },
          ]}
          className="content leading-relaxed text-white transition-all duration-300 sm:text-lg"
          onComplete={() => {
            setTimeout(() => setShowChoices(true), 300)
          }}
        />

        <AnimatePresence>
          {showChoices && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-8 flex flex-col items-center gap-2 text-left"
            >
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  default: { duration: 0.3, delay: 0.1 },
                  scale: { type: 'spring', stiffness: 400, damping: 17 },
                }}
                className="content flex w-full cursor-pointer items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-xs text-white transition-colors hover:bg-white/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSceneChange('part2')}
              >
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <span>짐빔 하이볼 플레인 건네주기</span>
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  default: { duration: 0.3, delay: 0.2 },
                  scale: { type: 'spring', stiffness: 400, damping: 17 },
                }}
                className="content flex w-full cursor-pointer items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-xs text-white transition-colors hover:bg-white/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                // onClick={() => onSceneChange('part2')}
              >
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <span>무시하기</span>
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  default: { duration: 0.3, delay: 0.3 },
                  scale: { type: 'spring', stiffness: 400, damping: 17 },
                }}
                className="content flex w-full cursor-pointer items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-xs text-white transition-colors hover:bg-white/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                // onClick={() => onSceneChange('part2')}
              >
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <span>친구들과 가서 말 걸어보기</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
