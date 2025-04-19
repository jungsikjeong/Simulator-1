import type { SceneKey } from '@/modules'
import SceneA from '@/routes/_app/-components/part-1/SceneA'
import StartScene from '../routes/_app/-components/StartScene'
import type React from 'react'

type SceneProps = {
  onSceneChange: (scene: SceneKey) => void
}

type SceneComponent = (props: SceneProps) => React.JSX.Element

// 각 씬 키에 해당하는 컴포넌트를 매핑하는 객체
export const SceneComponentMap: Record<SceneKey, SceneComponent> = {
  start: StartScene,
  part1: SceneA,
}
