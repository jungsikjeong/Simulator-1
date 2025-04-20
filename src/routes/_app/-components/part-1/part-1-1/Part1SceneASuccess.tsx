'use client'

import DialogueBox from '@/components/DialogueBox'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function Part1SceneASuccess({ onSceneChange }: SceneProps) {
  const [choiceOpen, setChoiceOpen] = useState(false)

  return (
    <SceneLayout bg="/party/2_장원영.png" effect="fade">
      <div className="relative flex h-screen flex-col justify-end overflow-hidden bg-cover bg-center">
        <motion.div
          key={`dialogue-animation-${uuidv4()}`}
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
            key={`dialogue-box-${uuidv4()}`}
            chunks={[
              {
                content: '좋아하는 친구들과 짐빔 하이볼!',
              },
            ]}
            typingDelay={0.5}
            variant="light"
            className="mb-20 px-0 py-6 transition-transform duration-200 hover:scale-[1.02]"
            typingTextClassName="text-base sm:text-xl leading-relaxed"
            onComplete={() => setChoiceOpen(true)}
            isTouchable={false}
            onTouchSceneChange={() => {
              onSceneChange('part1SceneASuccess')
            }}
          />
        </motion.div>
      </div>
    </SceneLayout>
  )
}
