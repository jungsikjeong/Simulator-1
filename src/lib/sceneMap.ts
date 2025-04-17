import type { SceneKey } from '@/modules';
import StartScene from '../routes/_app/-components/StartScene';

// 추후 Record로 바꿀것
// export const SceneComponentMap: Record<
//   SceneKey,
//   React.FC<{ onSceneChange: (scene: SceneKey) => void }>
// > = {
//   start: StartScene,
// };
export const sceneComponentMap: Partial<
  Record<SceneKey, React.FC<{ onSceneChange: (scene: SceneKey) => void }>>
> = {
  start: StartScene,
};
