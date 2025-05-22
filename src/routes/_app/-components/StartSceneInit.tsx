'use client'

import { useEffect, useState } from 'react'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '@/hooks/use-mobile'

const allImages = [
    '/title.png',
    '/start_장원영.png',
    '/party/1_박정민.png',
    '/party/2_장원영.png',
    '/party/3_장원영.png',
    '/party/4_박정민.png',
    '/party/5_박정민.png',
    '/party/6_장원영.png',
    '/party/7_장원영.png',
    '/party/8_단체.png',
    '/hof/1_박정민.png',
    '/hof/2_장원영.png',
    '/hof/3_장원영.png',
    '/home/1_박정민.png',
    '/home/2_장원영.png',
    '/home/3_장원영.png',
    '/home/4_박정민.png',
    '/reward/박정민_진저.png',
    '/reward/박정민_레몬.png',
    '/reward/박정민_자몽.png',
    '/reward/박정민_플레인.png',
    '/reward/장원영_레몬.png',
    '/reward/장원영_자몽.png',
    '/reward/장원영_진저.png',
    '/reward/장원영_플레인.png',
    '/romance/1_박정민.png',
    '/romance/2_박정민.png',
    '/romance/3_박정민.png',
    '/romance/4_박정민.png',
    '/romance/5_박정민.png',
    '/romance/6_박정민.png',
    '/romance/7_박정민.png',
    '/romance/8_박정민.png',
    '/romance/9_박정민.png',
    '/romance/10_박정민.png',
    '/romance/11_박정민.png',
    '/romance/12_박정민.png',
    '/ending/1_장원영.png',
    '/ending/2_같이.png',
    '/ending/3_같이.png',
]

async function preloadImage(src: string): Promise<void> {
    return new Promise(resolve => {
        const img = new Image()
        img.onload = () => resolve()
        img.onerror = () => resolve()
        img.src = src
    })
}

export default function StartSceneInit({
    onSceneChange,
}: {
    onSceneChange: (scene: SceneKey) => void
}) {
    const isMobile = useIsMobile()
    const [progress, setProgress] = useState(0)
    const [loaded, setLoaded] = useState(0)
    const total = allImages.length
    const [ready, setReady] = useState(false)

    // 초기 프리로드
    useEffect(() => {
        allImages.forEach(src => {
            preloadImage(src).then(() => {
                setLoaded(prev => {
                    const next = prev + 1
                    setProgress(Math.round((next / total) * 100))
                    return next
                })
            })
        })
    }, [])

    // 모두 로드되면, 잠시 딜레이 후 진입
    useEffect(() => {
        if (loaded >= total) {
            const t = setTimeout(() => setReady(true), 100) // UX를 위해 짧게 대기
            return () => clearTimeout(t)
        }
    }, [loaded, total])

    if (!ready) {
        // 게임 시작 전 로딩 스크린
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white z-50">
                <div className="text-2xl mb-4">로딩 중...</div>
                <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-white transition-all duration-200"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="mt-2">{progress}%</div>
            </div>
        )
    }

    // 준비 완료 시 실제 Start 씬으로 넘어감
    return (
        <SceneLayout bg="/start_장원영.png" effect="trueBlend" hideTitle={false}>
            {/* 클릭 시 다음 씬으로 */}
            <div className="absolute inset-0 cursor-pointer z-10" onClick={() => onSceneChange('start')} />
            {/* 타이틀 */}
            <motion.div
                className="absolute bottom-8 md:bottom-14 w-full text-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <motion.div
                    animate={{
                        y: [0, -10, 0],
                        rotate: [0, 1, 0, -1, 0]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: 'easeInOut'
                    }}
                >
                    <div className="flex flex-col items-center">
                        <img
                            src="/title_bright.png"
                            alt="짐빔 위대한 마케터"
                            className={`${isMobile ? 'w-60' : 'w-80'}`}
                        />
                    </div>
                </motion.div>
            </motion.div>
            <AnimatePresence>
                <motion.div
                    className="absolute right-4 bottom-2 flex items-center justify-end text-sm opacity-70 text-white"
                    animate={{
                        opacity: [0.7, 0.4, 0.7],
                        transition: {
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        },
                    }}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                >
                    <span className="mr-1">▶︎</span> touch
                </motion.div>
            </AnimatePresence>
        </SceneLayout>
    )
}
