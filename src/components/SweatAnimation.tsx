import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/use-mobile'

interface SweatAnimationProps {
    mobileTop?: string
    mobileRight?: string
    mobileRotation?: string
    desktopTop?: string
    desktopRight?: string
    desktopRotation?: string
    mobileSizes?: {
        first: { width: string; height: string }
        second: { width: string; height: string }
        third: { width: string; height: string }
        fourth: { width: string; height: string }
    }
    desktopSizes?: {
        first: { width: string; height: string }
        second: { width: string; height: string }
        third: { width: string; height: string }
        fourth: { width: string; height: string }
    }
}

type SizeKey = 'first' | 'second' | 'third' | 'fourth'

export default function SweatAnimation({
    mobileTop = '2%',
    mobileRight = '15%',
    mobileRotation = '220deg',
    desktopTop = '3%',
    desktopRight = '12%',
    desktopRotation = '235deg',
    mobileSizes = {
        first: { width: "10", height: "12" },
        second: { width: "12", height: "14" },
        third: { width: "14", height: "16" },
        fourth: { width: "16", height: "18" }
    },
    desktopSizes = {
        first: { width: "16", height: "18" },
        second: { width: "18", height: "20" },
        third: { width: "20", height: "22" },
        fourth: { width: "22", height: "24" }
    }
}: SweatAnimationProps) {
    const isMobile = useIsMobile()
    const sizes = isMobile ? mobileSizes : desktopSizes
    const sizeKeys: SizeKey[] = ['first', 'second', 'third', 'fourth']

    return (
        <div className="absolute" style={{
            top: isMobile ? mobileTop : desktopTop,
            right: isMobile ? mobileRight : desktopRight,
            transform: isMobile ? `rotate(${mobileRotation})` : `rotate(${desktopRotation})`
        }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                {[...Array(4)].map((_, rowIndex) => (
                    <div key={`row-${rowIndex}`} className="flex mb-2">
                        {[...Array(3)].map((_, colIndex) => (
                            <motion.div
                                key={`sweat-${rowIndex}-${colIndex}`}
                                className="flex mx-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    delay: rowIndex * 0.3 + colIndex * 0.2,
                                    ease: "easeOut"
                                }}
                            >
                                <svg
                                    width={sizes[sizeKeys[rowIndex]].width}
                                    height={sizes[sizeKeys[rowIndex]].height}
                                    viewBox="0 0 10 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M2 2 C2 8, 8 8, 8 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </motion.div>
                        ))}
                    </div>
                ))}
            </motion.div>
        </div>
    )
} 