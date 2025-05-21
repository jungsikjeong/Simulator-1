// src/lib/uiPresets.ts
export type UIPreset = 'light' | 'start' | 'fail' | 'romance' | 'success'

/* 대사 박스 */
export const dialoguePreset: Record<UIPreset, string> = {
  light: 'bg-gradient-to-r from-amber-50/70 via-white/70 to-amber-50/70 border-none rounded-xl text-gray-800 shadow-sm ring-1 ring-white/30',

  start: 'bg-gradient-to-r from-[#ffffcd] via-white to-[#ffffcd] border-2 border-black rounded-xl text-gray-800 shadow-sm',
  fail: 'bg-white/75 border-none rounded-sm text-gray-700 shadow-md ring-1 ring-gray-200/50',
  romance: ' border-none rounded-xl text-white',
  success: ' bg-white/90 border-none rounded-sm text-gray-700 shadow-md ring-1 ring-gray-200/50',
}

/* 선택지 리스트 */
export const choicePreset: Record<
  UIPreset,
  { wrapper: string; button: string }
> = {
  light: {
    wrapper: 'bg-none border-none',
    button: [
      'bg-[#fff]/80 hover:bg-[#edead7]/90 active:bg-[#FFE6D9]/95',
      'text-gray-800 border border-gray-200/50 shadow-sm',
    ].join(' '),
  },


  start: {
    wrapper: 'bg-white/90 border-none shadow-md backdrop-blur-sm',
    button: [
      'bg-[#FFF8F3] hover:bg-[#FFF0E8] active:bg-[#FFE6D9]',
      'text-gray-800 border border-gray-200/50 shadow-sm',
    ].join(' '),
  },

  fail: {
    wrapper: 'bg-white/90 border-none shadow-md',
    button: [
      'bg-blue-50 hover:bg-blue-100 active:bg-blue-200',
      'text-blue-600 border border-blue-100 shadow-sm',
    ].join(' '),
  },

  romance: {
    wrapper: '',
    button: '',
  },

  success: {
    wrapper: '',
    button: '',
  },
}