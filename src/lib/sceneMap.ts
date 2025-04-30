import type { SceneKey } from '@/modules/scene-key.type'
import StartScene from '@/routes/_app/-components/StartScene'
import Part1 from '@/routes/_app/-components/part-1'
import Part1SceneASuccess1 from '@/routes/_app/-components/part-1/SceneA/Success1'
import Part1SceneASuccess2 from '@/routes/_app/-components/part-1/SceneA/Success2'
import Part1SceneAFail1 from '@/routes/_app/-components/part-1/SceneA/Fail1'
import Part1SceneAFail2 from '@/routes/_app/-components/part-1/SceneA/Fail2'
import Part1SceneBMain from '@/routes/_app/-components/part-1/SceneB/main'
import Part1SceneBSuccess from '@/routes/_app/-components/part-1/SceneB/Success'
import Part1SceneBFail1 from '@/routes/_app/-components/part-1/SceneB/Fail1'
import Part1SceneBFail2 from '@/routes/_app/-components/part-1/SceneB/Fail2'
import Part2 from '@/routes/_app/-components/part-2'
import Part2SceneAMain from '@/routes/_app/-components/part-2/SceneA/main'
import Part2SceneASuccess from '@/routes/_app/-components/part-2/SceneA/Success'
import Part2SceneAFail1 from '@/routes/_app/-components/part-2/SceneA/Fail1'
import Part2SceneAFail2 from '@/routes/_app/-components/part-2/SceneA/Fail2'
import Part3 from '@/routes/_app/-components/part-3'
import Part3SceneAMain from '@/routes/_app/-components/part-3/SceneA/main'
import Part3SceneASuccess from '@/routes/_app/-components/part-3/SceneA/Success'
import Part3SceneAFail from '@/routes/_app/-components/part-3/SceneA/Fail'

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
  part3SceneAMain: Part3SceneAMain,
  part3SceneASuccess: Part3SceneASuccess,
  part3SceneAFail: Part3SceneAFail,
}
