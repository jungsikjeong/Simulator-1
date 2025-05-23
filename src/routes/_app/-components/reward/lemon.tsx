import RewardSceneLayout from '@/components/RewardSceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'

interface LemonProps {
    onSceneChange: (scene: SceneKey) => void
}

export default function Lemon({ onSceneChange }: LemonProps) {
    return (
        <RewardSceneLayout
            images={[
                { src: '/reward/장원영_레몬.png', label: '장원영_레몬' },
                { src: '/reward/박정민_레몬.png', label: '박정민_레몬' },
            ]}
            tabs={[
                { text: "원영이와 레몬 짐빔" },
                { text: "정민이와 레몬 짐빔" },
            ]}
            bgColor="bg-yellow-100"
            borderColor="border-yellow-500"
            textColor="text-yellow-700"
            sceneText="청량한 답변을 해준 당신은"
            onSceneChange={onSceneChange}
        />
    )
}