// src/routes/_app/index.tsx
import { SceneComponentMap } from '@/lib/sceneMap'
import type { SceneKey } from '@/modules/scene-key.type'
import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import StartScene from './-components/StartScene'

export const Route = createFileRoute('/_app/')({
  component: App,
})

export default function App() {
  const [scene, setScene] = useState<SceneKey>('part2SceneA')

  const handleSceneChange = useCallback((scene: SceneKey) => {
    setScene(scene)
  }, [])

  if (scene === 'start') {
    return <StartScene onSceneChange={handleSceneChange} />
  }

  const SceneComponent = SceneComponentMap[scene]

  return <SceneComponent onSceneChange={handleSceneChange} />
}
