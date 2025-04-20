'use client'

import DialogueBox from '@/components/DialogueBox'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion } from 'framer-motion'
import { useState } from 'react'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function SceneASuccess({ onSceneChange }: SceneProps) {
  const [typingDone, setTypingDone] = useState(false)

  return (
    <SceneLayout bg="/party/2_장원영.png" effect="zoom">
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
                content: '좋아하는 친구들과 짐빔 하이볼!',
              },
            ]}
            typingDelay={0.5}
            variant="light"
            className="mb-20 cursor-pointer px-0 py-6 transition-transform duration-200"
            typingTextClassName="text-base sm:text-xl leading-relaxed"
            onComplete={() => setTypingDone(true)}
            isTouchable={false}
            onTouchSceneChange={() => {
              onSceneChange('part1SceneASuccessNext')
            }}
          />
        </motion.div>
      </div>
    </SceneLayout>
  )
}
