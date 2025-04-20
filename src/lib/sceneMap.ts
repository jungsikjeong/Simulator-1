import type { SceneKey } from '@/modules/scene-key.type'
import SceneA from '@/routes/_app/-components/part-1'
import Part1SceneASuccess from '@/routes/_app/-components/part-1/part-1-1/Part1SceneASuccess'
import type React from 'react'
import StartScene from '../routes/_app/-components/StartScene'
import Part2SceneA from '../routes/_app/-components/part-2/SceneA'
import Part2SceneB from '../routes/_app/-components/part-2/SceneB'
import Part1SceneAFail1 from '@/routes/_app/-components/part-1/part-1-1/Part1SceneAFail1'
import Part1SceneAFail2 from '@/routes/_app/-components/part-1/part-1-1/Part1SceneAFail2'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

type SceneComponent = (props: SceneProps) => React.JSX.Element

// 각 씬 키에 해당하는 컴포넌트를 매핑하는 객체
export const SceneComponentMap: Record<SceneKey, SceneComponent> = {
  start: StartScene,
  part1: SceneA,
  part1SceneASuccess: Part1SceneASuccess,
  part1SceneAFail1: Part1SceneAFail1,
  part1SceneAFail2: Part1SceneAFail2,
  part2: Part2SceneA,
  part2SceneA: Part2SceneA,
  part2SceneB: Part2SceneB,
}
