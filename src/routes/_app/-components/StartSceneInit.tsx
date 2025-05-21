'use client'

import { useEffect, useState } from 'react'
import SceneLayout from '@/components/SceneLayout'
import type { SceneKey } from '@/modules/scene-key.type'
import { AnimatePresence, motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/use-mobile'

// SceneLayout와 동일한 allImages 배열을 임포트하거나 재정의하세요.
const allImages = [
    '/start_장원영.png',
    '/party/1_박정민.png',
    // …전체 bg 이미지 경로
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
            const t = setTimeout(() => setReady(true), 300) // UX를 위해 짧게 대기
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
            <div className="absolute inset-0 cursor-pointer" onClick={() => onSceneChange('start')} />
            {/* 타이틀, 터치 안내 등 기존 UI */}
            <motion.div
                className="absolute bottom-8 w-full flex justify-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
            >
                <img src="/title_bright.png" alt="짐빔 위대한 마케터" className={`${isMobile ? 'w-60' : 'w-80'}`} />
            </motion.div>
        </SceneLayout>
    )
}
