import { sceneComponentMap } from '@/lib/sceneMap';
import type { SceneKey } from '@/modules';
import { createFileRoute } from '@tanstack/react-router';
import { useCallback, useState } from 'react';
import StartScene from './-components/StartScene';

export const Route = createFileRoute('/_app/')({
  component: App,
});

export default function App() {
  const [scene, setScene] = useState<SceneKey>('start');

  const handleSceneChange = useCallback((scene: SceneKey) => {
    setScene(scene);
  }, []);

  if (scene === 'start') {
    return <StartScene onSceneChange={handleSceneChange} />;
  }

  const SceneComponent = sceneComponentMap[scene];

  if (!SceneComponent) {
    // TODO :sceneComponentMap 타입을 Record로 바꿧으면 지울것
    return <div>Scene not found: {scene}</div>;
  }

  return <SceneComponent onSceneChange={handleSceneChange} />;

  // return (
  //   <>
  //     <h1 className='text-2xl font-bold mb-4'>{current.title}</h1>
  //     <p className='whitespace-pre-line mb-6'>{current.text}</p>

  //     <div className='space-y-2 flex flex-col gap-2'>
  //       {current.choices.map((choice, i) => (
  //         <button
  //           key={i}
  //           onClick={() => setScene(choice.next as SceneKey)}
  //           className='bg-black text-white px-4 py-2 rounded-2xl shadow-md hover:bg-gray-800'
  //         >
  //           {choice.label}
  //         </button>
  //       ))}
  //     </div>
  //   </>
  // );
}
