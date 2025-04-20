export type UIPreset = 'light' | 'dark' | 'glass' | 'vintage'

/* 대사 박스 */
export const dialoguePreset: Record<UIPreset, string> = {
  light: 'bg-white/80 border border-gray-200 text-gray-800 shadow-sm',
  dark: 'bg-black/80   border-gray-600 text-white shadow-md',
  glass: 'bg-white/30   border-white/40 text-white backdrop-blur-md shadow',
  vintage: 'bg-[#FFF5E1]  border-[#C9A97F]/70 text-[#3A2C1D] shadow-lg',
}

/* 선택지 리스트 */
export const choicePreset: Record<
  UIPreset,
  { wrapper: string; button: string }
> = {
  /* ░░ Light ░░ */
  light: {
    wrapper: 'bg-white/95 border-t border-gray-200',
    button: [
      'bg-gray-50 hover:bg-gray-100 active:bg-gray-200',
      'text-gray-800 border border-gray-200 shadow-sm',
    ].join(' '),
  },

  /* ░░ Dark ░░ */
  dark: {
    wrapper: 'bg-black/75 border-white/20',
    button: [
      'bg-black/60 hover:bg-black/20 active:bg-black/80',
      'text-white border-white/30',
    ].join(' '),
  },

  /* ░░ Glass ░░ */
  glass: {
    wrapper: 'bg-black/40 backdrop-blur-sm',
    button: [
      'bg-white/25 hover:bg-white/40 active:bg-white/50',
      'text-white border-white/40 backdrop-blur-md',
    ].join(' '),
  },

  /* ░░ Vintage ░░ */
  vintage: {
    wrapper: 'bg-[#FFFAF0]/95',
    button: [
      'bg-[#FFF5E1] hover:bg-[#FFF9EF] active:bg-[#FFF3DD]',
      'text-[#3A2C1D] border-[#D4B28C]',
    ].join(' '),
  },
}
