import type { SceneKey } from '@/modules/scene-key.type'
import SceneA from '@/routes/_app/-components/part-1'
import type React from 'react'
import StartScene from '../routes/_app/-components/StartScene'
import Part2SceneA from '../routes/_app/-components/part-2/SceneA'
import Part2_SceneA_ignore from '../routes/_app/-components/part-2/SceneA_ignore'
type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

type SceneComponent = (props: SceneProps) => React.JSX.Element

// 각 씬 키에 해당하는 컴포넌트를 매핑하는 객체
export const SceneComponentMap: Record<SceneKey, SceneComponent> = {
  start: StartScene,
  part1: SceneA,
  part2: SceneB,
  part2SceneA: Part2SceneA,
  part2_sceneA_ignore: Part2_SceneA_ignore,
}
