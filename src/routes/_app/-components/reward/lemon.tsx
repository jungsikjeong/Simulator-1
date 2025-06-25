import RewardSceneLayout from '@/components/RewardSceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'

interface LemonProps {
  onSceneChange: (scene: SceneKey) => void
}

export default function Lemon({ onSceneChange }: LemonProps) {
  return (
    <RewardSceneLayout
      images={[
        {
          src: 'https://dmfnb4l6be84v.cloudfront.net/reward/%EC%9E%A5%EC%9B%90%EC%98%81_%EB%A0%88%EB%AA%AC.webp',
          label: '장원영_레몬',
        },
        {
          src: 'https://dmfnb4l6be84v.cloudfront.net/reward/%EB%B0%95%EC%A0%95%EB%AF%BC_%EB%A0%88%EB%AA%AC.webp',
          label: '박정민_레몬',
        },
      ]}
      tabs={[{ text: '원영이와 레몬 짐빔' }, { text: '정민이와 레몬 짐빔' }]}
      bgColor="bg-yellow-100"
      borderColor="border-yellow-500"
      textColor="text-yellow-700"
      sceneText="청량한 답변을 해준 당신은"
      onSceneChange={onSceneChange}
    />
  )
}
