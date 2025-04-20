'use client'

import ChoiceList from '@/components/ChoiceList'
import DialogueBox from '@/components/DialogueBox'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function Part1SceneAFail2({ onSceneChange }: SceneProps) {
  const [choiceOpen, setChoiceOpen] = useState(false)

  return (
    <SceneLayout bg="/party/4_박정민.png" effect="fade">
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
                content: '...부담스러워',
              },
            ]}
            typingDelay={0.5}
            variant="light"
            className="mb-20 px-0 py-6 transition-transform duration-200"
            typingTextClassName="text-base sm:text-2xl leading-relaxed"
            onComplete={() => setChoiceOpen(true)}
            isTouchable={false}
          />
        </motion.div>

        <ChoiceList
          open={choiceOpen}
          inline
          variant="glass"
          choices={[{ key: 'part1', label: '[다시하기]' }]}
          onSelect={(k: string) => {
            const sceneMap: Record<string, SceneKey> = {
              part1: 'part1',
            }
            onSceneChange(sceneMap[k])
          }}
        />
      </div>
    </SceneLayout>
  )
}
