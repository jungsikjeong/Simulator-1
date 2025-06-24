'use client'

import ChoiceList from '@/components/ChoiceList'
import DialogueBox from '@/components/DialogueBox'
import SceneLayout from '@/components/SceneLayout'
import SweatAnimation from '@/components/SweatAnimation'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion } from 'framer-motion'
import { useState } from 'react'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function Part1SceneBMain({ onSceneChange }: SceneProps) {
  const [choiceOpen, setChoiceOpen] = useState(false)
  const [isTouchable, setIsTouchable] = useState(true)

  return (
    <SceneLayout
      bg="https://dmfnb4l6be84v.cloudfront.net/party/6_%EC%9E%A5%EC%9B%90%EC%98%81.webp"
      effect="trueBlend"
      nextBgList={[
        'https://dmfnb4l6be84v.cloudfront.net/party/7_%EC%9E%A5%EC%9B%90%EC%98%81.webp',
        'https://dmfnb4l6be84v.cloudfront.net/party/8_%EB%8B%A8%EC%B2%B4.webp',
        'https://dmfnb4l6be84v.cloudfront.net/party/5_%EB%B0%95%EC%A0%95%EB%AF%BC.webp',
      ]}
    >
      <SweatAnimation
        mobileTop="2%"
        mobileRight="15%"
        mobileRotation="220deg"
        desktopTop="3%"
        desktopRight="12%"
        desktopRotation="235deg"
        mobileSizes={{
          first: { width: '10', height: '12' },
          second: { width: '12', height: '14' },
          third: { width: '14', height: '16' },
          fourth: { width: '16', height: '18' },
        }}
        desktopSizes={{
          first: { width: '16', height: '18' },
          second: { width: '18', height: '20' },
          third: { width: '20', height: '22' },
          fourth: { width: '22', height: '24' },
        }}
      />

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
                  content: '어엇.. [나락감지]\n',
                },
                {
                  content: 'ㄷ..당황하지 말자\n',
                },
                {
                  content: '\n',
                },
                {
                  content: '당황한 기색없이 이렇게 말한다\n',
                },
                {
                  content: '"그거 참 잘됐다"',
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
            { key: 'fail1', label: '친구가 없구나 내가 도와줄게!' },
            { key: 'fail2', label: '짐빔 하이볼 마실래?' },
            { key: 'success', label: '나 혼자 집에서 짐빔 하이볼!' },
          ]}
          onSelect={k => {
            switch (k) {
              case 'success':
                onSceneChange('part1SceneBSuccess')
                break
              case 'fail1':
                onSceneChange('part1SceneBFail1')
                break
              case 'fail2':
                onSceneChange('part1SceneBFail2')
                break
            }
          }}
        />
      </div>
    </SceneLayout>
  )
}
