'use client'

import DynamicPositionTag from '@/components/DynamicPositionTag'
import TypingText from '@/components/TypingText'
import type { SceneKey } from '@/modules/scene-key.type'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function SceneA({ onSceneChange }: SceneProps) {
  const [showChoices, setShowChoices] = useState(false)

  return (
    <div className="bg-[url('/party/1_박정민.png')] bg-cover bg-center h-screen flex flex-col justify-end relative">
      <DynamicPositionTag
        layoutId="party1"
        title="#파티1"
        className="absolute top-1/2 left-1/2 text-4xl font-bold translate-x-[-50%] translate-y-[-50%]"
        className2="absolute top-4 left-4 text-sm font-semibold text-white"
      />

      {/* Visual Novel Dialog Box */}
      <div className="w-full bg-black/70 backdrop-blur-sm p-6 border-t border-white/20 min-h-[180px]">
        <div className="max-w-4xl mx-auto">
          <TypingText
            text={[
              { content: '어? 저기 파티장에서 우울하게 있는 청년이 있어,\n' },
              { content: '그에게 어떤 이야기를 할까?', className: 'font-bold' },
            ]}
            className="font-nanum text-white text-xl leading-relaxed"
            onComplete={() => setShowChoices(true)}
          />
        </div>
      </div>

      {/* Visual Novel Choice Buttons */}
      <AnimatePresence>
        {showChoices && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-black/80 backdrop-blur-md p-8 rounded-lg border border-white/20 w-[80%] max-w-xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <h3 className="text-white/80 text-center mb-6 font-nanum text-xl">
                선택하세요
              </h3>
              <div className="flex flex-col gap-4">
                <motion.button
                  className="py-4 px-6 bg-white/10 hover:bg-white/20 text-white rounded-md font-nanum text-lg transition-colors border border-white/30"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSceneChange('part2')}
                >
                  웃으며 인사한다
                </motion.button>
                <motion.button
                  className="py-4 px-6 bg-white/10 hover:bg-white/20 text-white rounded-md font-nanum text-lg transition-colors border border-white/30"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSceneChange('part2')}
                >
                  지나친다
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
