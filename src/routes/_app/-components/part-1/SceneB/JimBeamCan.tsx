import React from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/use-mobile'

interface JimBeamCanProps {
    show: boolean
}

const JimBeamCan: React.FC<JimBeamCanProps> = React.memo(({ show }) => {
    if (!show) return null
    const isMobile = useIsMobile()
    return (
        <motion.img
            src="/jim-beam-can.png"
            alt="Jim Beam Can"
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'tween', duration: 1.8, ease: 'easeInOut' }}
            style={{
                position: 'absolute',
                left: isMobile ? '3%' : '5%',
                bottom: isMobile ? -35 : -65,
                transform: 'translateX(-50%)',
                width: isMobile ? 80 : 150,
                zIndex: 30,
                pointerEvents: 'none',
                willChange: 'transform, opacity',
            }}
            draggable={false}
        />
    )
})

export default JimBeamCan 