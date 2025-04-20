'use client'

import DialogueBox from '@/components/DialogueBox'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion } from 'framer-motion'
import { useState } from 'react'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function Part1SceneASuccess({ onSceneChange }: SceneProps) {
  const [choiceOpen, setChoiceOpen] = useState(false)

  return (
    <SceneLayout bg="/party/2_장원영.png" effect="fade">
      <div className="relative flex h-screen flex-col justify-end overflow-hidden bg-cover bg-center">
        <motion.div
          key={`dialogue-animation-${Date.now()}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <DialogueBox
            key={`dialogue-box-${Date.now()}`}
            chunks={[
              {
                content: '좋아하는 친구들과 짐빔 하이볼!',
              },
            ]}
            typingDelay={0.5}
            variant="light"
            className="mb-20 px-0 py-6"
            typingTextClassName="text-sm sm:text-base leading-relaxed"
            onComplete={() => setChoiceOpen(true)}
            isTouchable={false}
            onTouch={() => {
              onSceneChange('part1SceneASuccess')
            }}
          />
        </motion.div>
      </div>
    </SceneLayout>
  )
}
