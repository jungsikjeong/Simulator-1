export type UIPreset = 'light' | 'dark' | 'glass' | 'vintage'

export const dialoguePreset: Record<UIPreset, string> = {
    light: 'bg-[#F8F8F8]/95 border-gray-300 text-gray-900 shadow-lg',
    dark: 'bg-black/80   border-gray-600 text-white shadow-md',
    glass: 'bg-white/30   border-white/40 text-white backdrop-blur-md shadow',
    vintage: 'bg-[#FFF5E1]  border-[#C9A97F]/70 text-[#3A2C1D] shadow-lg',
}

export const choicePreset: Record<UIPreset, {
    wrapper: string
    button: string
}> = {
    light: {
        wrapper: 'bg-white/90',
        button: 'bg-white/95 hover:bg-white',
    },
    dark: {
        wrapper: 'bg-black/75',
        button: 'bg-black/60 hover:bg-black/75 text-white border-white/30',
    },
    glass: {
        wrapper: 'bg-black/40',
        button: 'bg-white/30 hover:bg-white/50 text-white border-white/40 backdrop-blur-md',
    },
    vintage: {
        wrapper: 'bg-[#FFFAF0]/95',
        button: 'bg-[#FFF5E1] hover:bg-[#FFF8ED] text-[#3A2C1D] border-[#D4B28C]',
    },
}
