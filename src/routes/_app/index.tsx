import { SceneComponentMap } from '@/lib/sceneMap'
import type { SceneKey } from '@/modules/scene-key.type'
import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import StartSceneInit from './-components/StartSceneInit'

export const Route = createFileRoute('/_app/')({
  component: App,
})

export default function App() {
  const [scene, setScene] = useState<SceneKey>('lemon')

  const handleSceneChange = useCallback((scene: SceneKey) => {
    setScene(scene)
  }, [])

  if (scene === 'startInit') {
    return <StartSceneInit onSceneChange={handleSceneChange} />
  }

  const SceneComponent = SceneComponentMap[scene]

  return <SceneComponent onSceneChange={handleSceneChange} />
}
