'use client'

import { useState } from 'react'
import SceneLayout from '@/components/SceneLayout'
import TypingText from '@/components/TypingText'
import { useCreateMember } from '@/hooks/use-create-member'
import { v4 as uuidv4 } from 'uuid'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion } from 'framer-motion'

export default function StartScene({
  onSceneChange,
}: {
  onSceneChange: (scene: SceneKey) => void
}) {
  const [playerName, setPlayerName] = useState('')
  const [introDone, setIntroDone] = useState(false)
  const createMember = useCreateMember()

  const handleNameSubmit = async () => {
    if (!playerName.trim()) return
    try {
      const uuid = uuidv4()
      createMember.mutate({ name: playerName, id: uuid })
      onSceneChange('part1')
    } catch (error) {
      console.error('Failed to create member:', error)
    }
  }

  return (
    <SceneLayout bg="/start_장원영.png" effect="fade">
      {/* Game Title */}
      <motion.div
        className="absolute top-8 w-full text-center text-white font-danjo"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-wide drop-shadow-lg">
          짐빔 위대한 마케터
        </h1>
        <p className="text-lg md:text-xl opacity-90 mt-1">
          Greatest Marketer of Jim Beam
        </p>
      </motion.div>

      {/* Dialogue Box */}
      <div className="absolute bottom-24 w-full flex justify-center">
        <div className="bg-white/90 border border-gray-300 p-6 rounded-xl w-[90%] max-w-xl shadow-md">
          <TypingText
            text={[
              { content: '안녕 나는 짐빔 모델 장원영이야\n' },
              { content: '앞으로 난 일상에 지친 청춘들을 응원하기 위해\n' },
              { content: '짐빔과 함께 엄청난 마케팅들을 펼친 예정이야\n\n' },
              { content: '내가 위대한 마케터가 될 수 있도록\n' },
              { content: '도와줄래?' },
            ]}
            speed={14}
            onComplete={() => setIntroDone(true)}
          />
        </div>
      </div>

      {/* Name Input */}
      {introDone && (
        <div className="absolute bottom-6 w-full flex flex-col items-center gap-4">
          <input
            type="text"
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
            placeholder="조언자 이름을 입력하세요"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black w-[90%] max-w-md"
          />
          <button
            onClick={handleNameSubmit}
            className="bg-black text-white px-6 py-2 rounded-2xl shadow-md hover:bg-gray-800"
          >
            START &gt;&gt;
          </button>
        </div>
      )}
    </SceneLayout>
  )
}
