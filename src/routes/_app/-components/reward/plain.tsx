import RewardSceneLayout from '@/components/RewardSceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'

interface PlainProps {
  onSceneChange: (scene: SceneKey) => void
}

export default function Plain({ onSceneChange }: PlainProps) {
  return (
    <RewardSceneLayout
      images={[
        {
          src: 'https://dmfnb4l6be84v.cloudfront.net/reward/%EC%9E%A5%EC%9B%90%EC%98%81_%ED%94%8C%EB%A0%88%EC%9D%B8.webp',
          label: '장원영_플레인',
        },
        {
          src: 'https://dmfnb4l6be84v.cloudfront.net/reward/%EB%B0%95%EC%A0%95%EB%AF%BC_%ED%94%8C%EB%A0%88%EC%9D%B8.webp',
          label: '박정민_플레인',
        },
      ]}
      tabs={[
        { text: '원영이와 플레인 짐빔' },
        { text: '정민이와 플레인 짐빔' },
      ]}
      bgColor="bg-slate-100"
      borderColor="border-slate-500"
      textColor="text-slate-700"
      sceneText="깔끔담백한 답변을 해준 당신은"
      onSceneChange={onSceneChange}
    />
  )
}
