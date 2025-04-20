'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function SoundControl() {
    const [isMuted, setIsMuted] = useState(false)

    useEffect(() => {
        // 로컬 스토리지에서 음소거 상태를 불러옴
        const savedMuteState = localStorage.getItem('isMuted')
        if (savedMuteState) {
            setIsMuted(JSON.parse(savedMuteState))
        }
    }, [])

    const toggleMute = () => {
        const newMuteState = !isMuted
        setIsMuted(newMuteState)
        localStorage.setItem('isMuted', JSON.stringify(newMuteState))
    }

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMute}
            className="fixed top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white"
        >
            {isMuted ? '🔇' : '🔊'}
        </motion.button>
    )
} 