import RewardSceneLayout from '@/components/RewardSceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'

interface GrapeProps {
  onSceneChange: (scene: SceneKey) => void
}

export default function Grape({ onSceneChange }: GrapeProps) {
  return (
    <RewardSceneLayout
      images={[
        {
          src: 'https://dmfnb4l6be84v.cloudfront.net/reward/%EC%9E%A5%EC%9B%90%EC%98%81_%EC%9E%90%EB%AA%BD.webp',
          label: '장원영_자몽',
        },
        {
          src: 'https://dmfnb4l6be84v.cloudfront.net/reward/%EB%B0%95%EC%A0%95%EB%AF%BC_%EC%9E%90%EB%AA%BD.webp',
          label: '박정민_자몽',
        },
      ]}
      tabs={[{ text: '원영이와 자몽 짐빔' }, { text: '정민이와 자몽 짐빔' }]}
      bgColor="bg-pink-100"
      borderColor="border-pink-500"
      textColor="text-pink-700"
      sceneText="자몽처럼 톡 쏘는 답변을 해준 당신은"
      onSceneChange={onSceneChange}
    />
  )
}
