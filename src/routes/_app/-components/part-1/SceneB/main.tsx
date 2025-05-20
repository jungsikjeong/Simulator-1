'use client'

import ChoiceList from '@/components/ChoiceList'
import DialogueBox from '@/components/DialogueBox'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function Part1SceneBMain({ onSceneChange }: SceneProps) {
  const [choiceOpen, setChoiceOpen] = useState(false)
  const [isTouchable, setIsTouchable] = useState(true)
  const isMobile = useIsMobile()

  return (
    <SceneLayout bg="/party/6_장원영.png" effect="trueBlend">

      <div className="absolute" style={{ top: '2%', right: '15%', transform: 'rotate(220deg)' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* First row */}
          <div className="flex mb-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`row1-${i}`}
                className="flex mx-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
              >
                <svg width={isMobile ? "10" : "14"} height={isMobile ? "12" : "16"} viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 2 C2 8, 8 8, 8 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* Second row */}
          <div className="flex mb-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`row2-${i}`}
                className="flex mx-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: 0.3 + i * 0.2,
                  ease: "easeOut"
                }}
              >
                <svg width={isMobile ? "12" : "16"} height={isMobile ? "14" : "18"} viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 2 C2 10, 10 10, 10 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* Third row */}
          <div className="flex mb-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`row3-${i}`}
                className="flex mx-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: 0.6 + i * 0.2,
                  ease: "easeOut"
                }}
              >
                <svg width={isMobile ? "14" : "18"} height={isMobile ? "16" : "20"} viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 2 C2 12, 12 12, 12 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* Fourth row */}
          <div className="flex">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`row4-${i}`}
                className="flex mx-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: 0.9 + i * 0.2,
                  ease: "easeOut"
                }}
              >
                <svg width={isMobile ? "16" : "20"} height={isMobile ? "18" : "22"} viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 2 C2 14, 14 14, 14 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>


      <div className={`absolute ${choiceOpen ? 'bottom-2' : 'bottom-20'} flex w-full flex-col items-center gap-4`}>
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
              className='p-5'
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
            { key: 'success', label: '나 혼자 집에서 짐빔 하이볼!' },
            { key: 'fail1', label: '친구가 없구나 내가 도와줄게!' },
            { key: 'fail2', label: '짐빔 하이볼 마실래?' },
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