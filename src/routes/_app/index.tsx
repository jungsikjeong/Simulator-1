import { sceneComponentMap } from '@/lib/sceneMap'
import type { SceneKey } from '@/modules'
import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import StartScene from './-components/StartScene'
import { AnimatePresence } from 'framer-motion'

export const Route = createFileRoute('/_app/')({
  component: App,
})

export default function App() {
  const [scene, setScene] = useState<SceneKey>('start')

  const handleSceneChange = useCallback((scene: SceneKey) => {
    setScene(scene)
  }, [])

  if (scene === 'start') {
    return <StartScene onSceneChange={handleSceneChange} />
  }

  const SceneComponent = sceneComponentMap[scene]

  if (!SceneComponent) {
    // TODO :sceneComponentMap 타입을 Record로 바꿧으면 지울것
    return <div>Scene not found: {scene}</div>
  }

  return (
    <AnimatePresence>
      <SceneComponent onSceneChange={handleSceneChange} />;
    </AnimatePresence>
  )
}
