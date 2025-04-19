import { SceneComponentMap } from '@/lib/sceneMap'
import type { SceneKey } from '@/modules/scene-key.type'
import { createFileRoute } from '@tanstack/react-router'
import { AnimatePresence } from 'framer-motion'
import { useCallback, useState } from 'react'
import StartScene from './-components/StartScene'

export const Route = createFileRoute('/_app/')({
  component: App,
})

export default function App() {
  const [scene, setScene] = useState<SceneKey>('part1')

  const handleSceneChange = useCallback((scene: SceneKey) => {
    setScene(scene)
  }, [])

  if (scene === 'start') {
    return <StartScene onSceneChange={handleSceneChange} />
  }

  const SceneComponent = SceneComponentMap[scene]

  return (
    <AnimatePresence>
      <SceneComponent onSceneChange={handleSceneChange} />
    </AnimatePresence>
  )
}
