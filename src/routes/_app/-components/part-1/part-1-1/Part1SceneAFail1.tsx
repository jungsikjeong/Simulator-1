'use client'

import ChoiceList from '@/components/ChoiceList'
import DialogueBox from '@/components/DialogueBox'
import DynamicPositionTag from '@/components/DynamicPositionTag'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion } from 'framer-motion'
import { useState } from 'react'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function Part1SceneAFail1({ onSceneChange }: SceneProps) {
  const [choiceOpen, setChoiceOpen] = useState(false)
  const [isChapterTitle, setIsChapterTitle] = useState(false)

  return (
    <SceneLayout bg="/party/1_박정민.png" effect="fade">
      실패페이지
      <div className="relative flex h-screen flex-col justify-end overflow-hidden bg-cover bg-center">
        <DynamicPositionTag
          layoutId="chapter-title"
          title="#파트1"
          className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-4xl text-white"
          className2="absolute left-4 top-4 text-lg text-white"
          onMinimize={() => setIsChapterTitle(true)}
        />

        {isChapterTitle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <DialogueBox
              chunks={[
                { content: '어? 저기 파티장에서 우울하게 있는 청년이 있어,\n' },
                {
                  content: '그에게 어떤 이야기를 할까?',
                  className: 'font-bold',
                },
              ]}
              typingDelay={0.5}
              variant="light"
              className="mb-20 px-0 py-6"
              typingTextClassName="text-sm sm:text-base leading-relaxed"
              onComplete={() => setChoiceOpen(true)}
              isTouchable={choiceOpen}
            />
          </motion.div>
        )}

        <ChoiceList
          open={choiceOpen}
          inline
          variant="glass"
          choices={[
            { key: 'enjoy', label: '짐빔 하이볼 플레인 건네주기' },
            { key: 'cheongyak', label: '무시하기' },
            { key: 'lotto', label: '친구들과 가서 말 걸어보기' },
          ]}
          onSelect={(k: string) => {
            const sceneMap: Record<string, SceneKey> = {
              success: 'part1SceneASuccess',
              fail1: 'part1SceneAFail1',
              fail2: 'part1SceneAFail2',
            }
            onSceneChange(sceneMap[k])
          }}
        />
      </div>
    </SceneLayout>
  )
}
