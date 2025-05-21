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
                {/* First row */}
                <div className="flex mb-2">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={`row1-${i}`}
                            className="flex mx-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                repeatType: "loop",
                                delay: i * 0.2,
                                ease: "easeOut"
                            }}
                        >
                            <svg
                                width={isMobile ? mobileSizes.first.width : desktopSizes.first.width}
                                height={isMobile ? mobileSizes.first.height : desktopSizes.first.height}
                                viewBox="0 0 10 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2 2 C2 8, 8 8, 8 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </motion.div>
                    ))}
                </div>

                {/* Second row */}
                <div className="flex mb-2">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={`row2-${i}`}
                            className="flex mx-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                repeatType: "loop",
                                delay: 0.3 + i * 0.2,
                                ease: "easeOut"
                            }}
                        >
                            <svg
                                width={isMobile ? mobileSizes.second.width : desktopSizes.second.width}
                                height={isMobile ? mobileSizes.second.height : desktopSizes.second.height}
                                viewBox="0 0 12 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2 2 C2 10, 10 10, 10 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </motion.div>
                    ))}
                </div>

                {/* Third row */}
                <div className="flex mb-2">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={`row3-${i}`}
                            className="flex mx-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                repeatType: "loop",
                                delay: 0.6 + i * 0.2,
                                ease: "easeOut"
                            }}
                        >
                            <svg
                                width={isMobile ? mobileSizes.third.width : desktopSizes.third.width}
                                height={isMobile ? mobileSizes.third.height : desktopSizes.third.height}
                                viewBox="0 0 14 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2 2 C2 12, 12 12, 12 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </motion.div>
                    ))}
                </div>

                {/* Fourth row */}
                <div className="flex">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={`row4-${i}`}
                            className="flex mx-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                repeatType: "loop",
                                delay: 0.9 + i * 0.2,
                                ease: "easeOut"
                            }}
                        >
                            <svg
                                width={isMobile ? mobileSizes.fourth.width : desktopSizes.fourth.width}
                                height={isMobile ? mobileSizes.fourth.height : desktopSizes.fourth.height}
                                viewBox="0 0 16 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2 2 C2 14, 14 14, 14 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
} 