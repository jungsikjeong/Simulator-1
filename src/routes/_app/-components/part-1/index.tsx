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

export default function SceneA({ onSceneChange }: SceneProps) {
  const [choiceOpen, setChoiceOpen] = useState(false)
  const [isChapterTitle, setIsChapterTitle] = useState(false)

  return (
    <SceneLayout bg="/party/1_박정민.png" effect="fade">
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
              typingTextClassName="text-sm sm:text-xl leading-relaxed"
              onComplete={() => setChoiceOpen(true)}
              isTouchable={choiceOpen}
            />
          </motion.div>
        )}

        <ChoiceList
          open={choiceOpen}
          inline
          variant="light"
          choices={[
            { key: 'success', label: '짐빔 하이볼 플레인 건네주기' },
            { key: 'fail1', label: '무시하기' },
            { key: 'fail2', label: '친구들과 가서 말 걸어보기' },
          ]}
          onSelect={k => {
            switch (k) {
              case 'success':
                onSceneChange('part1SceneASuccess')
                break
              case 'fail1':
                onSceneChange('part1SceneAFail1')
                break
              case 'fail2':
                onSceneChange('part1SceneAFail2')
                break
            }
          }}
        />
      </div>
    </SceneLayout>
  )
}
