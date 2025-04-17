import { useCreateMember } from '@/hooks/use-create-member';
import type { SceneKey } from '@/modules';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
export default function StartScene({
  onSceneChange,
}: {
  onSceneChange: (scene: SceneKey) => void;
}) {
  const [playerName, setPlayerName] = useState('');
  const createMember = useCreateMember();

  const handleNameSubmit = async () => {
    if (!playerName.trim()) return;

    try {
      const uuid = uuidv4();
      createMember.mutate({ name: playerName, id: uuid });
      onSceneChange('bus');
    } catch (error) {
      console.error('Failed to create member:', error);
    }
  };

  return (
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
  );
}
