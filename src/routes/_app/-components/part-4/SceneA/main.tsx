'use client'

import ChoiceList from '@/components/ChoiceList'
import DialogueBox from '@/components/DialogueBox'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion } from 'framer-motion'
import { useState } from 'react'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function Part4SceneAMain({ onSceneChange }: SceneProps) {
  const [choiceOpen, setChoiceOpen] = useState(false)
  const [isTouchable, setIsTouchable] = useState(true)

  return (
    <SceneLayout
      bg="https://dmfnb4l6be84v.cloudfront.net/romance/2_%EB%B0%95%EC%A0%95%EB%AF%BC.webp"
      effect="trueBlend"
      nextBgList={['https://dmfnb4l6be84v.cloudfront.net/romance/3_%EB%B0%95%EC%A0%95%EB%AF%BC.webp', 'https://dmfnb4l6be84v.cloudfront.net/romance/4_%EB%B0%95%EC%A0%95%EB%AF%BC.webp']}
    >
      <div
        className={`absolute ${choiceOpen ? 'bottom-2' : 'bottom-20'} flex w-full flex-col items-center gap-4`}
      >
        <div className="w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <DialogueBox
              chunks={[
                {
                  content: '헉\n',
                },
                {
                  content: '하긴 아무래도\n',
                },
                {
                  content: '알바하랴 공부하랴\n',
                },
                {
                  content: '바쁘고 정신없겠지ㅜㅜ\n',
                },
                {
                  content: '\n',
                },
                {
                  content: '어떻게 하면 좋을까?\n',
                },
              ]}
              typingDelay={0.5}
              variant="light"
              className="p-5"
              typingTextClassName="leading-relaxed"
              onComplete={() => setChoiceOpen(true)}
              isTouchable={isTouchable}
              setIsTouchable={setIsTouchable}
            />
          </motion.div>
        </div>

        <ChoiceList
          open={choiceOpen}
          inline
          variant="light"
          choices={[
            { key: 'success', label: '위로의 말을 건넨다' },
            { key: 'fail', label: '한강에서 "짐빔 하이볼!" 을 외친다' },
          ]}
          onSelect={k => {
            switch (k) {
              case 'success':
                onSceneChange('part4SceneASuccess1')
                break
              case 'fail':
                onSceneChange('part4SceneAFail')
                break
            }
          }}
        />
      </div>
    </SceneLayout>
  )
}
