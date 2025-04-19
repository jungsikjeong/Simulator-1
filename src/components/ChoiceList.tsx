'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { choicePreset, type UIPreset } from '@/lib/uiPresets'
import { cn } from '@/lib/utils'

interface Choice { key: string; label: string }
interface ChoiceListProps {
    open: boolean
    choices: Choice[]
    onSelect: (key: string) => void
    variant?: UIPreset
    /** overlay 대신 ‘말풍선 아래에 바로 붙는’ 인라인 모드 */
    inline?: boolean
    className?: string
}

export default function ChoiceList({
    open,
    choices,
    onSelect,
    variant = 'light',
    inline = false,
    className,
}: ChoiceListProps) {
    const preset = choicePreset[variant]

    // 👉 wrapper (overlay vs inline) 스타일 분기
    const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
        inline ? (
            <div className="w-full flex justify-center">{children}</div>
        ) : (
            <motion.div
                className="absolute inset-0 flex items-center justify-center z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {children}
            </motion.div>
        )

    return (
        <AnimatePresence>
            {open && (
                <Wrapper>
                    <motion.ul
                        className={cn(
                            'space-y-3 w-[88%] max-w-md p-6 rounded-xl border',
                            preset.wrapper,
                            className,
                        )}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ type: 'spring', damping: 16 }}
                    >
                        {choices.map(c => (
                            <motion.li key={c.key} whileTap={{ scale: 0.97 }}>
                                <button
                                    onClick={() => onSelect(c.key)}
                                    className={cn(
                                        'flex items-center w-full py-3 pl-4 pr-6 rounded-full border transition-colors',
                                        preset.button,
                                    )}
                                >
                                    <ChevronRight className="w-5 h-5 mr-3 shrink-0" />
                                    <span className="text-base">{c.label}</span>
                                </button>
                            </motion.li>
                        ))}
                    </motion.ul>
                </Wrapper>
            )}
        </AnimatePresence>
    )
}
