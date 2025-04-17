import { useCreateMember } from '@/hooks/use-create-member';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { scenes } from '@/data/scenes';
import type { SceneKey } from '@/modules';

export const Route = createFileRoute('/_app/')({
  component: App,
});

export default function App() {
  const [scene, setScene] = useState<SceneKey>('start');
  const [playerName, setPlayerName] = useState('');
  const [formId, setFormId] = useState<string>('');
  const createMember = useCreateMember();
  const current = scenes[scene];

  useEffect(() => {
    if (scene === 'start') {
      setFormId(uuidv4());
    }
  }, [scene]);

  const handleNameSubmit = async () => {
    if (!playerName.trim()) return;

    try {
      createMember.mutate({ name: playerName, id: formId });
      setScene('bus');
    } catch (error) {
      console.error('Failed to create member:', error);
    }
  };

  if (scene === 'start') {
    return (
      <>
        <div className='space-y-4'>
          <input
            type='text'
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder='이름을 입력하세요'
            className='px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black'
          />

          <button
            onClick={handleNameSubmit}
            className='bg-black text-white px-4 py-2 rounded-2xl shadow-md hover:bg-gray-800 w-full'
          >
            시작하기
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className='text-2xl font-bold mb-4'>{current.title}</h1>
      <p className='whitespace-pre-line mb-6'>{current.text}</p>

      <div className='space-y-2 flex flex-col gap-2'>
        {current.choices.map((choice, i) => (
          <button
            key={i}
            onClick={() => setScene(choice.next as SceneKey)}
            className='bg-black text-white px-4 py-2 rounded-2xl shadow-md hover:bg-gray-800'
          >
            {choice.label}
          </button>
        ))}
      </div>
    </>
  );
}
