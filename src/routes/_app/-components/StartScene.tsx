'use client'

import { useState, useEffect } from 'react'
import SceneLayout from '@/components/SceneLayout'
import { useCreateMember } from '@/hooks/use-create-member'
import { useUpdateMemberName } from '@/hooks/use-update-member-name'
import { v4 as uuidv4 } from 'uuid'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion } from 'framer-motion'
import DialogueBox from '@/components/DialogueBox'
import { useIsMobile } from '@/hooks/use-mobile'

export default function StartScene({
  onSceneChange,
}: {
  onSceneChange: (scene: SceneKey) => void
}) {
  const [playerName, setPlayerName] = useState('')
  const [introDone, setIntroDone] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [isTouchable, setIsTouchable] = useState(true)
  const createMember = useCreateMember()
  const updateMemberName = useUpdateMemberName()
  const isMobile = useIsMobile()

  useEffect(() => {
    if (introDone) {
      setTimeout(() => setShowInput(true), 500)
    }
  }, [introDone])

  const handleNameSubmit = async () => {
    if (!playerName.trim()) return

    const existingId = localStorage.getItem('currentMemberId')

    if (existingId) {
      // 이미 게임했던 유저면 이름만 업데이트
      await updateMemberName.mutateAsync(
        { id: existingId, name: playerName },
        {
          onError: error => {
            if ((error as any)?.code === 'PGRST116') {
              localStorage.removeItem('currentMemberId')
              localStorage.removeItem('currentMemberName')

              const uuid = uuidv4()
              createMember.mutate(
                { name: playerName, id: uuid },
                {
                  onSuccess: () => {
                    localStorage.setItem('currentMemberId', uuid)
                    localStorage.setItem('currentMemberName', playerName)
                    onSceneChange('part1')
                  },
                }
              )
              return
            }
          },
        }
      )
      localStorage.setItem('currentMemberName', playerName)
    } else {
      // 새로운 유저면 새로 생성
      const uuid = uuidv4()
      createMember.mutate(
        { name: playerName, id: uuid },
        {
          onSuccess: () => {
            localStorage.setItem('currentMemberId', uuid)
            localStorage.setItem('currentMemberName', playerName)
          },
        }
      )
    }

    onSceneChange('part1')
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && playerName.trim()) {
      handleNameSubmit()
    }
  }

  function setTypingDone(done: boolean): void {
    setIntroDone(done)
  }

  return (
    <SceneLayout
      bg="https://dmfnb4l6be84v.cloudfront.net/start_%EC%9E%A5%EC%9B%90%EC%98%81.webp"
      effect="trueBlend"
      hideTitle={false}
      nextBgList={['https://dmfnb4l6be84v.cloudfront.net/party/1_%EB%B0%95%EC%A0%95%EB%AF%BC.webp']}
    >
      {/* Background overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      {/* Scene transition overlay */}
      <div
        id="scene-transition"
        className="pointer-events-none absolute inset-0 z-50 bg-black opacity-0 transition-opacity duration-800"
      />

      {/* Dialogue Box */}
      <div
        className={`absolute ${isMobile ? 'bottom-38' : 'bottom-42'} flex w-full justify-center`}
      >
        <DialogueBox
          chunks={[
            { content: '  안녕! 나는 짐빔 모델 장원영이야\n' },
            { content: '앞으로 난 일상에 지친 청춘들을 응원하기 위해\n' },
            { content: '짐빔과 함께 엄청난 마케팅들을 펼칠 예정이야\n\n' },
            { content: '내가 위대한 마케터가 될 수 있도록\n' },
            { content: '도와줄래?' },
          ]}
          variant="start"
          className="p-5"
          typingTextClassName={`leading-relaxed`}
          onComplete={() => setTypingDone(true)}
          isTouchable={isTouchable}
          setIsTouchable={setIsTouchable}
          hideIndicatorWhenNotTouchable={true}
        />
      </div>

      {/* Name Input with animation */}
      <motion.div
        className={`absolute ${isMobile ? 'bottom-12' : 'bottom-12'} flex w-full flex-col items-center gap-4 ${!showInput ? 'pointer-events-none opacity-0' : ''}`}
        initial={{ y: 20, opacity: 0 }}
        animate={showInput ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="relative w-[80%]">
          <input
            type="text"
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="조언자 이름을 입력하세요"
            className={`${isMobile ? 'px-2 py-1.5 text-sm' : 'px-4 py-3 text-base'} w-full rounded-sm border-2 border-black bg-white/90 text-center text-gray-800 shadow-lg focus:ring-2 focus:ring-[#ffc000] focus:outline-none`}
            maxLength={12}
          />
          <div className="absolute top-1/2 right-4 -translate-y-1/2 text-xs font-medium text-[#ffc000]">
            {playerName.length}/12
          </div>
        </div>

        <motion.button
          onClick={handleNameSubmit}
          className={`bg-[#ffc000] text-white ${isMobile ? 'px-4 py-2 text-sm' : 'px-8 py-3 text-base'} rounded-full font-bold tracking-wider shadow-lg transition-all duration-300 hover:bg-[#ffb000]`}
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
