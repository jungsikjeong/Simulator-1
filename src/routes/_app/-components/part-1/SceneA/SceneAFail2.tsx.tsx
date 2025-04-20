'use client'

import DialogueBox from '@/components/DialogueBox'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion } from 'framer-motion'
import { useState } from 'react'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function SceneAFail2({ onSceneChange }: SceneProps) {
  const [typingDone, setTypingDone] = useState(false)

  return (
    <SceneLayout bg="/party/4_박정민.png" effect="fade">
      <div className="relative flex h-screen flex-col justify-end overflow-hidden bg-cover bg-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
            y: {
              type: 'spring',
              damping: 15,
              stiffness: 100,
            },
            scale: {
              type: 'spring',
              damping: 20,
              stiffness: 100,
            },
          }}
        >
          <DialogueBox
            chunks={[
              {
                content: '...부담스러워',
              },
            ]}
            typingDelay={0.5}
            variant="light"
            className="mb-20 cursor-pointer px-0 py-6 transition-transform duration-200"
            typingTextClassName="text-base sm:text-2xl leading-relaxed"
            onComplete={() => setTypingDone(true)}
            isTouchable={typingDone}
          />
        </motion.div>

        {typingDone && (
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mb-4 w-[90%] max-w-xl"
            >
              <div
                onClick={() => onSceneChange('part1')}
                className="flex w-full flex-col items-center justify-center gap-1 rounded-xl border border-gray-200/50 bg-white/80 px-6 py-4 text-gray-800 shadow-sm transition-all duration-200 hover:bg-white/90 hover:shadow-md"
              >
                <div className="text-sm font-medium sm:text-base">
                  아차차... 조금 더 분발해보자!!
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  className="mt-1 flex cursor-pointer items-center font-semibold text-blue-600"
                >
                  <span className="mr-1">▶</span>
                  <span>다시하기</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </SceneLayout>
  )
}
