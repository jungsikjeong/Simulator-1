import RewardSceneLayout from '@/components/RewardSceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'

interface PlainProps {
    onSceneChange: (scene: SceneKey) => void
}

export default function Plain({ onSceneChange }: PlainProps) {
    return (
        <RewardSceneLayout
            images={[
                { src: '/reward/장원영_플레인.png', label: '장원영_플레인' },
                { src: '/reward/박정민_플레인.png', label: '박정민_플레인' },
            ]}
            tabs={[
                { text: "원영이와 플레인 짐빔" },
                { text: "정민이와 플레인 짐빔" },
            ]}
            bgColor="bg-slate-100"
            borderColor="border-slate-500"
            textColor="text-slate-700"
            sceneText="깔끔담백한 답변을 해준 당신은"
            onSceneChange={onSceneChange}
        />
    )
}