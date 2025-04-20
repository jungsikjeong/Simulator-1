'use client'

import { useState, useEffect } from 'react'
import SceneLayout from '@/components/SceneLayout'
import { useCreateMember } from '@/hooks/use-create-member'
import { v4 as uuidv4 } from 'uuid'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion } from 'framer-motion'
import DialogueBox from '@/components/DialogueBox'

export default function StartScene({
  onSceneChange,
}: {
  onSceneChange: (scene: SceneKey) => void
}) {
  const [playerName, setPlayerName] = useState('')
  const [introDone, setIntroDone] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const createMember = useCreateMember()

  useEffect(() => {
    if (introDone) {
      setTimeout(() => setShowInput(true), 500)
    }
  }, [introDone])

  const handleNameSubmit = async () => {
    if (!playerName.trim()) return
    try {
      const uuid = uuidv4()
      createMember.mutate({ name: playerName, id: uuid })

      // Add transition effect before changing scene
      const overlay = document.getElementById('scene-transition')
      if (overlay) {
        overlay.classList.add('opacity-100')
        setTimeout(() => onSceneChange('part1'), 800)
      } else {
        onSceneChange('part1')
      }
    } catch (error) {
      console.error('Failed to create member:', error)
    }
  }

  function setTypingDone(done: boolean): void {
    setIntroDone(done)
  }

  return (
    <SceneLayout bg="/start_장원영.png" effect="fade">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

      {/* Scene transition overlay */}
      <div id="scene-transition" className="absolute inset-0 bg-black opacity-0 transition-opacity duration-800 pointer-events-none z-50" />

      {/* Game Title */}
      <motion.div
        className="absolute top-1 w-full text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 1, 0, -1, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: 'easeInOut'
          }}
        >
          <img
            src="/title.png"
            alt="짐빔 위대한 마케터"
            className="w-[50%] max-w-2xl mx-auto drop-shadow-xl"
          />
        </motion.div>
      </motion.div>

      {/* Dialogue Box */}
      <div className="absolute bottom-42 w-full flex justify-center">
        <DialogueBox
          chunks={[
            { content: '안녕! 나는 짐빔 모델 장원영이야\n' },
            { content: '앞으로 난 일상에 지친 청춘들을 응원하기 위해\n' },
            { content: '짐빔과 함께 엄청난 마케팅들을 펼칠 예정이야\n\n' },
            { content: '내가 위대한 마케터가 될 수 있도록\n' },
            { content: '도와줄래?' },
          ]}
          variant="start"
          onComplete={() => setTypingDone(true)}
          isTouchable={true}
        />
      </div>

      {/* Name Input with animation */}
      <motion.div
        className={`absolute bottom-6 w-full flex flex-col items-center gap-4 ${!showInput ? 'opacity-0 pointer-events-none' : ''}`}
        initial={{ y: 20, opacity: 0 }}
        animate={showInput ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="relative w-[90%] max-w-md">
          <input
            type="text"
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
            placeholder="조언자 이름을 입력하세요"
            className="px-4 py-3 rounded-full border-2 border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full shadow-lg text-center bg-white/90 backdrop-blur-sm text-gray-800"
            maxLength={12}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-400 text-sm font-medium">
            {playerName.length}/12
          </div>
        </div>

        <motion.button
          onClick={handleNameSubmit}
          className="bg-amber-500 text-white px-8 py-3 rounded-full shadow-lg hover:bg-amber-600 transition-all duration-300 font-bold tracking-wider"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!playerName.trim()}
        >
          START &gt;&gt;
        </motion.button>
      </motion.div>
    </SceneLayout>
  )
}