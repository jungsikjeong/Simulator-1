import type { SceneKey } from '@/modules/scene-key.type'
import StartScene from '@/routes/_app/-components/StartScene'
import Part1 from '@/routes/_app/-components/part-1'
import Part1SceneASuccess1 from '@/routes/_app/-components/part-1/SceneA/Success1'
import Part1SceneASuccess2 from '@/routes/_app/-components/part-1/SceneA/Success2'
import Part1SceneAFail1 from '@/routes/_app/-components/part-1/SceneA/Fail1'
import Part1SceneAFail2 from '@/routes/_app/-components/part-1/SceneA/Fail2'
import Part1SceneBMain from '@/routes/_app/-components/part-1/SceneB/main'
import Part1SceneBSuccess from '@/routes/_app/-components/part-1/SceneB/SceneBSuccess'
import Part1SceneBFail1 from '@/routes/_app/-components/part-1/SceneB/SceneBFail1'
import Part1SceneBFail2 from '@/routes/_app/-components/part-1/SceneB/SceneBFail2'
import Part2 from '@/routes/_app/-components/part-2'
import Part2SceneAMain from '@/routes/_app/-components/part-2/SceneA/main'
import Part2SceneASuccess from '@/routes/_app/-components/part-2/SceneA/Success'
import Part2SceneAFail1 from '@/routes/_app/-components/part-2/SceneA/Fail1'
import Part2SceneAFail2 from '@/routes/_app/-components/part-2/SceneA/Fail2'

// import SceneA from '@/routes/_app/-components/part-1'
// import SceneAFail1 from '@/routes/_app/-components/part-1/SceneA/SceneAFail1'
// import SceneAFail2 from '@/routes/_app/-components/part-1/SceneA/SceneAFail2.tsx'
// import SceneASuccess from '@/routes/_app/-components/part-1/SceneA/SceneASuccess'
// import SceneASuccessNext from '@/routes/_app/-components/part-1/SceneA/SceneASuccessNext'
// import SceneBMain from '@/routes/_app/-components/part-1/SceneB'
// import SceneBFail1 from '@/routes/_app/-components/part-1/SceneB/SceneBFail1'
// import SceneBFail2 from '@/routes/_app/-components/part-1/SceneB/SceneBFail2.tsx'
// import SceneBSuccess from '@/routes/_app/-components/part-1/SceneB/SceneBSuccess'
// import type React from 'react'
// import StartScene from '../routes/_app/-components/StartScene'
// import Part2SceneA from '../routes/_app/-components/part-2/SceneA'
// import Part2SceneB from '../routes/_app/-components/part-2/SceneB'
// import Part2SceneBFail1 from '../routes/_app/-components/part-2/SceneBFail1'
// import Part2SceneBFail2 from '../routes/_app/-components/part-2/SceneBFail2'
// import Part2SceneC from '../routes/_app/-components/part-2/SceneC'
import Part3 from '../routes/_app/-components/part-3'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

type SceneComponent = (props: SceneProps) => React.JSX.Element

// 각 씬 키에 해당하는 컴포넌트를 매핑하는 객체
export const SceneComponentMap: Record<SceneKey, SceneComponent> = {
  start: StartScene,
  part1: Part1,
  part1SceneASuccess1: Part1SceneASuccess1,
  part1SceneASuccess2: Part1SceneASuccess2,
  part1SceneAFail1: Part1SceneAFail1,
  part1SceneAFail2: Part1SceneAFail2,
  part1SceneBMain: Part1SceneBMain,
  part1SceneBSuccess: Part1SceneBSuccess,
  part1SceneBFail1: Part1SceneBFail1,
  part1SceneBFail2: Part1SceneBFail2,
  part2: Part2,
  part2SceneAMain: Part2SceneAMain,
  part2SceneASuccess: Part2SceneASuccess,
  part2SceneAFail1: Part2SceneAFail1,
  part2SceneAFail2: Part2SceneAFail2,
  part3: Part3,
}
