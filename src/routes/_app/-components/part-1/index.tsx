//src/routes/_app/-components/part-1/index.tsx
import ChoiceList from '@/components/ChoiceList'
import DialogueBox from '@/components/DialogueBox'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useUpdateMemberStatus, useGetCurrentMemberId } from '@/service/member/useGetMember'

export default function Part1({
  onSceneChange,
}: {
  onSceneChange: (scene: SceneKey) => void
}) {
  const [choiceOpen, setChoiceOpen] = useState(false)
  const [isTouchable, setIsTouchable] = useState(true)
  const { mutate: updateStatus } = useUpdateMemberStatus()
  const { data: memberId } = useGetCurrentMemberId()

  return (
    <SceneLayout bg="https://dmfnb4l6be84v.cloudfront.net/party/1_%EB%B0%95%EC%A0%95%EB%AF%BC.webp" effect="smoothFade" nextBgList={['https://dmfnb4l6be84v.cloudfront.net/party/2_%EC%9E%A5%EC%9B%90%EC%98%81.webp', 'https://dmfnb4l6be84v.cloudfront.net/party/3_%EC%9E%A5%EC%9B%90%EC%98%81.webp', 'https://dmfnb4l6be84v.cloudfront.net/party/4_%EB%B0%95%EC%A0%95%EB%AF%BC.webp']}>
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
                { content: '어?\n' },
                { content: '저기 파티장에서 우울하게 있는 청년이 있어,\n' },
                {
                  content: '그에게 어떤 이야기를 할까?',
                  className: 'font-bold',
                },
              ]}
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
            { key: 'fail2', label: '친구들과 가서 말 걸어보기' },
            { key: 'success', label: '짐빔 하이볼 플레인 건네주기' },
            { key: 'fail1', label: '무시하기' },
          ]}
          onSelect={k => {
            switch (k) {
              case 'success':
                updateStatus({ id: memberId, status: 'in_progress' })
                onSceneChange('part1SceneASuccess1')
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
