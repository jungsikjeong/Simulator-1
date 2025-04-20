import type { SceneKey } from '@/modules/scene-key.type'
import SceneA from '@/routes/_app/-components/part-1'
import Part1SceneAFail1 from '@/routes/_app/-components/part-1/part-1-1/Part1SceneAFail1'
import Part1SceneAFail2 from '@/routes/_app/-components/part-1/part-1-1/Part1SceneAFail2'
import Part1SceneASuccess from '@/routes/_app/-components/part-1/part-1-1/Part1SceneASuccess'
import type React from 'react'
import StartScene from '../routes/_app/-components/StartScene'
import Part2SceneA from '../routes/_app/-components/part-2/SceneA'
import Part2SceneB from '../routes/_app/-components/part-2/SceneB'
import Part2SceneBFail1 from '../routes/_app/-components/part-2/SceneBFail1'
import Part2SceneBFail2 from '../routes/_app/-components/part-2/SceneBFail2'
import Part2SceneC from '../routes/_app/-components/part-2/SceneC'

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
  part2SceneB: Part2SceneB,
  part2SceneBFail1: Part2SceneBFail1,
  part2SceneBFail2: Part2SceneBFail2,
  part2SceneC: Part2SceneC,
}
