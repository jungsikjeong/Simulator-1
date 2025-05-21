'use client'

import {
    AnimatePresence,
    motion,
    type TargetAndTransition,
    type Variants,
} from 'framer-motion'
import type { PropsWithChildren } from 'react'
import { useEffect, useState } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'

export type TransitionEffect = 'fade' | 'shake' | 'zoom' | 'flash' | 'slide' | 'crossFade' | 'smoothFade' | 'trueBlend'
export type SoundEffect = 'shalala' | '뾰로롱' | '또로롱' | null

interface SceneLayoutProps extends PropsWithChildren {
    bg: string
    effect?: TransitionEffect
    onSkip?: () => void
    soundEffect?: SoundEffect
    hideTitle?: boolean
    logoColor?: 'white' | 'black'
}

/** 효과별 variant 정의 */
const variantMap: Record<TransitionEffect, Variants> = {
    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.8, ease: 'easeInOut' } },
        exit: { opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
    },
    zoom: {
        initial: { opacity: 0, scale: 1.1 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
    },
    flash: {
        initial: { opacity: 0 },
        // as number[] : readonly → 가변 배열로 캐스팅
        animate: { opacity: [0, 1, 0.8, 1] as number[] },
        exit: { opacity: 0 },
    },
    shake: {
        initial: {
            opacity: 0,
            transition: {
                duration: 1.5,
                ease: [0.25, 0.1, 0.25, 1]
            }
        },
        animate: {
            opacity: 1,
            x: [0, -4, 4, -4, 4, 0] as number[],
            y: [0, 2, -2, 2, -2, 0] as number[],
            transition: { duration: 0.6 },
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.2,
                ease: [0.25, 0.1, 0.25, 1]
            }
        },
    },
    slide: {
        initial: { x: '100%', opacity: 0 },
        animate: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: 'easeInOut' }
        },
        exit: {
            x: '-100%',
            opacity: 0,
            transition: { duration: 0.6, ease: 'easeInOut' }
        },
    },
    crossFade: {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                duration: 1.2,
                ease: [0.4, 0, 0.2, 1]
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1]
            }
        },
    },
    smoothFade: {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                duration: 1.5,
                ease: [0.25, 0.1, 0.25, 1]
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.2,
                ease: [0.25, 0.1, 0.25, 1]
            }
        },
    },
    trueBlend: {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.33, 1, 0.68, 1]
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.8,
                ease: [0.32, 0, 0.67, 0]
            }
        },
    },
}

// 이미지 로딩 상태 관리를 위한 타입
interface LoadingState {
    isLoading: boolean;
    progress: number;
    totalImages: number;
    loadedImages: number;
}

// 전역 이미지 캐시
const imageCache = new Map<string, HTMLImageElement>();
let isInitialLoad = true;

export default function SceneLayout({
    bg,
    effect = 'trueBlend',
    onSkip,
    children,
    soundEffect = null,
    hideTitle = false,
    logoColor = 'white',
}: SceneLayoutProps) {
    const isMobile = useIsMobile()
    const [loadingState, setLoadingState] = useState<LoadingState>({
        isLoading: isInitialLoad,
        progress: 0,
        totalImages: 0,
        loadedImages: 0
    });

    useEffect(() => {
        if (soundEffect) {
            const audio = new Audio(`/sounds/${soundEffect}.mp3`)
            audio.play().catch(error => console.log('오디오 재생 실패:', error))
        }
    }, [soundEffect])

    /* Esc 스킵 */
    useEffect(() => {
        const h = (e: KeyboardEvent) => e.key === 'Escape' && onSkip?.()
        window.addEventListener('keydown', h)
        return () => window.removeEventListener('keydown', h)
    }, [onSkip])


    // 초기 이미지 프리로드
    useEffect(() => {
        if (!isInitialLoad) return;

        const loadAllImages = async () => {
            const allImages = [
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
                '/hof/4_장원영.png',
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
            ];

            setLoadingState({
                isLoading: true,
                progress: 0,
                totalImages: allImages.length,
                loadedImages: 0
            });

            const preloadImage = (src: string): Promise<void> => {
                return new Promise((resolve) => {
                    if (imageCache.has(src)) {
                        setLoadingState(prev => {
                            const newLoadedImages = Math.min(prev.loadedImages + 1, prev.totalImages);
                            const newProgress = Math.round((newLoadedImages / prev.totalImages) * 100);
                            return {
                                ...prev,
                                loadedImages: newLoadedImages,
                                progress: newProgress
                            };
                        });
                        resolve();
                        return;
                    }

                    const img = new Image();
                    img.onload = () => {
                        imageCache.set(src, img);
                        setLoadingState(prev => {
                            const newLoadedImages = Math.min(prev.loadedImages + 1, prev.totalImages);
                            const newProgress = Math.round((newLoadedImages / prev.totalImages) * 100);
                            return {
                                ...prev,
                                loadedImages: newLoadedImages,
                                progress: newProgress
                            };
                        });
                        resolve();
                    };
                    img.onerror = () => {
                        // 이미지 로드 실패 시 원본 경로로 재시도
                        const originalSrc = src.replace('.webp', '.png');
                        if (originalSrc !== src) {
                            const fallbackImg = new Image();
                            fallbackImg.onload = () => {
                                imageCache.set(originalSrc, fallbackImg);
                                setLoadingState(prev => {
                                    const newLoadedImages = Math.min(prev.loadedImages + 1, prev.totalImages);
                                    const newProgress = Math.round((newLoadedImages / prev.totalImages) * 100);
                                    return {
                                        ...prev,
                                        loadedImages: newLoadedImages,
                                        progress: newProgress
                                    };
                                });
                                resolve();
                            };
                            fallbackImg.onerror = () => {
                                console.warn(`이미지 로드 실패 (원본): ${originalSrc}`);
                                setLoadingState(prev => {
                                    const newLoadedImages = Math.min(prev.loadedImages + 1, prev.totalImages);
                                    const newProgress = Math.round((newLoadedImages / prev.totalImages) * 100);
                                    return {
                                        ...prev,
                                        loadedImages: newLoadedImages,
                                        progress: newProgress
                                    };
                                });
                                resolve();
                            };
                            fallbackImg.src = originalSrc;
                        } else {
                            console.warn(`이미지 로드 실패: ${src}`);
                            setLoadingState(prev => {
                                const newLoadedImages = Math.min(prev.loadedImages + 1, prev.totalImages);
                                const newProgress = Math.round((newLoadedImages / prev.totalImages) * 100);
                                return {
                                    ...prev,
                                    loadedImages: newLoadedImages,
                                    progress: newProgress
                                };
                            });
                            resolve();
                        }
                    };
                    img.src = src;
                });
            };

            try {
                // 배치 단위로 이미지 로드
                const batchSize = 5;
                for (let i = 0; i < allImages.length; i += batchSize) {
                    const batch = allImages.slice(i, i + batchSize);
                    await Promise.all(batch.map(preloadImage));
                }

                setLoadingState(prev => ({
                    ...prev,
                    isLoading: false
                }));
                isInitialLoad = false;
            } catch (error) {
                console.error('이미지 로딩 중 오류 발생:', error);
                setLoadingState(prev => ({
                    ...prev,
                    isLoading: false
                }));
                isInitialLoad = false;
            }
        };

        loadAllImages();
    }, []);

    // 현재 배경 이미지가 캐시에 없을 경우에만 로드
    useEffect(() => {
        if (!imageCache.has(bg)) {
            const img = new Image();
            img.onload = () => {
                imageCache.set(bg, img);
            };
            img.src = bg;
        }
    }, [bg]);

    const { initial, animate, exit } = variantMap[effect]

    return (
        <AnimatePresence mode="sync">
            <motion.div
                key={`${bg}-${effect}`}
                className="relative h-screen w-full overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${bg})` }}
                initial={initial as TargetAndTransition}
                animate={animate as TargetAndTransition}
                exit={exit as TargetAndTransition}
            >
                {loadingState.isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="text-white text-center">
                            <div className="text-xl mb-2">로딩 중...</div>
                            <div className="w-48 h-2 bg-gray-700 rounded-full">
                                <div
                                    className="h-full bg-white rounded-full transition-all duration-300"
                                    style={{ width: `${loadingState.progress}%` }}
                                />
                            </div>
                            <div className="mt-2">{loadingState.progress}%</div>
                        </div>
                    </div>
                )}

                {!hideTitle && (
                    <img
                        src={`/logo-${logoColor}.png`}
                        alt="Greatest Marketer of Jim Beam"
                        className={`${isMobile ? 'w-20' : 'w-26'} absolute top-2 right-2 z-50`}
                    />
                )}

                {children}
            </motion.div>
        </AnimatePresence>
    )
}