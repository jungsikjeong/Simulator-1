export interface IScene {
  title: string;
  text: string;
  choices: Array<{
    label: string;
    next: string;
  }>;
}

export interface IScenes {
  [key: string]: IScene;
}

export type SceneKey =
  | 'start'
  | 'bus'
  | 'river'
  | 'store'
  | 'home'
  | 'party'
  | 'ending'
  | 'fail';
