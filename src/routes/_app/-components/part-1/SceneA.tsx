import DynamicPositionTag from '@/components/DynamicPositionTag'
import { Button } from '@/components/ui/button'
import type { SceneKey } from '@/modules/scene-key.type'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

export default function SceneA({ onSceneChange }: SceneProps) {
  return (
    <>
      <DynamicPositionTag
        layoutId="party1"
        title="#파티1"
        className="absolute top-1/2 left-1/2 text-4xl font-bold translate-x-[-50%] translate-y-[-50%]"
        className2="absolute top-4 left-4 text-sm font-semibold"
      />

      <Button onClick={() => onSceneChange('part2')}>파티2</Button>
    </>
  )
}
