import React from 'react'
import { motion } from 'framer-motion'

interface JimBeamCanProps {
    show: boolean
}

const JimBeamCan: React.FC<JimBeamCanProps> = React.memo(({ show }) => {
    if (!show) return null
    return (
        <motion.img
            src="/jim-beam-can.png"
            alt="Jim Beam Can"
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'tween', duration: 0.9, ease: 'easeInOut' }}
            style={{
                position: 'fixed',
                left: '7%',
                bottom: -65,
                transform: 'translateX(-50%)',
                width: 450,
                zIndex: 30,
                pointerEvents: 'none',
                willChange: 'transform, opacity',
            }}
            draggable={false}
        />
    )
})

export default JimBeamCan 