import RewardSceneLayout from '@/components/RewardSceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'

interface JinjerProps {
  onSceneChange: (scene: SceneKey) => void
}

export default function Jinjer({ onSceneChange }: JinjerProps) {
  return (
    <RewardSceneLayout
      images={[
        {
          src: 'https://dmfnb4l6be84v.cloudfront.net/reward/%EC%9E%A5%EC%9B%90%EC%98%81_%EC%A7%84%EC%A0%80.webp',
          label: '장원영_진저',
        },
        {
          src: 'https://dmfnb4l6be84v.cloudfront.net/reward/%EB%B0%95%EC%A0%95%EB%AF%BC_%EC%A7%84%EC%A0%80.webp',
          label: '박정민_진저',
        },
      ]}
      tabs={[{ text: '원영이와 진저 짐빔' }, { text: '정민이와 진저 짐빔' }]}
      bgColor="bg-green-100"
      borderColor="border-green-500"
      textColor="text-green-700"
      sceneText="스윗한 답변을 해준 당신은"
      onSceneChange={onSceneChange}
    />
  )
}
