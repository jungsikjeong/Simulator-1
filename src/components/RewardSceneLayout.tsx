// Modified RewardSceneLayout.tsx
import { useIsMobile } from '@/hooks/use-mobile';
import type { SceneKey } from '@/modules/scene-key.type';
import { useGetCurrentMemberName } from '@/service/member/useGetMember';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import ShareButton from './ShareButton';

interface CardImage {
    src: string;
    label: string;
}

interface CardTab {
    text: string;
}

interface RewardSceneLayoutProps {
    images: CardImage[];
    tabs?: CardTab[];
    bgColor?: string;
    borderColor?: string;
    textColor?: string;
    sceneText?: string;
    guideTextMobile?: string;
    guideTextDesktop?: string;
    onSceneChange?: (scene: SceneKey) => void;
}

type TouchEvent = React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>;

const RewardSceneLayout = ({
    images = [],
    tabs = [],
    bgColor = 'bg-yellow-50',
    borderColor = 'border-yellow-400',
    textColor = 'text-yellow-700',
    sceneText = '',
    guideTextMobile = '길게 눌러 다운로드',
    // guideTextDesktop = '길게 눌러 다운로드',
    onSceneChange = () => { }
}: RewardSceneLayoutProps) => {
    const [selectedCard, setSelectedCard] = useState<number>(0); // Default to showing first card
    const [isDownloading, setIsDownloading] = useState<boolean>(false);
    const [isSwipeAnimating, setIsSwipeAnimating] = useState<boolean>(false);
    const [swipeProgress, setSwipeProgress] = useState<number>(0);
    const [isLongPress, setIsLongPress] = useState<boolean>(false);
    const [longPressProgress, setLongPressProgress] = useState<number>(0);
    const [swipeDirection, setSwipeDirection] = useState<string | null>(null);

    const startY = useRef<number>(0);
    const startX = useRef<number>(0);
    const currentY = useRef<number>(0);
    const currentX = useRef<number>(0);
    const longPressTimer = useRef<NodeJS.Timeout | null>(null);
    const swipeThreshold = 80;
    const longPressThreshold = 800; // 길게 누르는 시간 (ms)

    const isMobile = useIsMobile();
    const cardRef = useRef<HTMLDivElement>(null);
    const [cardDimensions, setCardDimensions] = useState({ width: 280, height: 420 });
    const containerRef = useRef<HTMLDivElement>(null);

    const { data: currentMemberName } = useGetCurrentMemberName()

    const tabTexts = tabs.map(tab => tab.text);

    // Adjust card dimensions based on viewport
    useEffect(() => {
        const updateCardDimensions = () => {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // More aggressive adjustments for mobile to prevent scrolling
            let newWidth, newHeight;

            if (isMobile) {
                // Increased card size on mobile but still ensuring it fits
                newWidth = Math.min(viewportWidth * 0.75, 280);
                newHeight = Math.min(viewportHeight * 0.48, 420);
            } else {
                newWidth = Math.min(viewportWidth * 0.8, 300);
                newHeight = Math.min(viewportHeight * 0.5, 450);
            }

            setCardDimensions({
                width: newWidth,
                height: newHeight
            });
        };

        updateCardDimensions();
        window.addEventListener('resize', updateCardDimensions);

        return () => {
            window.removeEventListener('resize', updateCardDimensions);
        };
    }, [isMobile]);

    const handleCardClick = (index: number): void => {
        if (isSwipeAnimating) return;

        // 카드 선택 상태 변경
        if (selectedCard !== index) {
            setSelectedCard(index);
        }
    };

    // 탭 클릭 핸들러
    const handleTabClick = (index: number): void => {
        if (isSwipeAnimating) return;
        setSelectedCard(index);
    };

    const downloadCard = (card: CardImage): void => {
        setIsDownloading(true);
        setIsSwipeAnimating(true);

        setTimeout(() => {
            const link = document.createElement('a');
            link.href = card.src;
            link.download = card.label;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setTimeout(() => {
                setIsDownloading(false);
                setIsSwipeAnimating(false);
                setSwipeProgress(0);
                setLongPressProgress(0);
            }, 500);
        }, 300);
    };

    // 길게 누르기 시작
    const handleLongPressStart = (index: number): void => {
        if (selectedCard !== index || isDownloading) return;

        setIsLongPress(true);
        setLongPressProgress(0);

        const startTime = Date.now();
        const interval = 50; // 업데이트 간격 (ms)

        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(100, (elapsed / longPressThreshold) * 100);
            setLongPressProgress(progress);

            if (elapsed < longPressThreshold && isLongPress) {
                longPressTimer.current = setTimeout(updateProgress, interval);
            } else if (isLongPress && progress >= 100) {
                // 다운로드 실행
                downloadCard(images[index]);
                setIsLongPress(false);
            }
        };

        longPressTimer.current = setTimeout(updateProgress, interval);
    };

    // 길게 누르기 취소
    const handleLongPressCancel = (): void => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
        }
        setIsLongPress(false);
        setLongPressProgress(0);
    };

    const handleTouchStart = (e: TouchEvent, index: number): void => {
        if (isSwipeAnimating || isDownloading) return;

        startY.current = 'touches' in e
            ? e.touches[0].clientY
            : e.clientY;
        startX.current = 'touches' in e
            ? e.touches[0].clientX
            : e.clientX;
        currentY.current = startY.current;
        currentX.current = startX.current;

        setSwipeProgress(0);
        setSwipeDirection(null);

        // 길게 누르기 시작
        handleLongPressStart(index);
    };

    const handleTouchMove = (e: TouchEvent): void => {
        if (isSwipeAnimating || isDownloading) return;

        currentY.current = 'touches' in e
            ? e.touches[0].clientY
            : e.clientY;
        currentX.current = 'touches' in e
            ? e.touches[0].clientX
            : e.clientX;

        const swipeDiffY = currentY.current - startY.current;
        const swipeDiffX = currentX.current - startX.current;

        // 움직임이 감지되면 길게 누르기 취소
        if (Math.abs(swipeDiffX) > 10 || Math.abs(swipeDiffY) > 10) {
            handleLongPressCancel();
        }

        // 좌우 스와이프 감지 (수평 움직임이 수직보다 더 클 때)
        if (Math.abs(swipeDiffX) > Math.abs(swipeDiffY) && Math.abs(swipeDiffX) > 10) {
            // 방향 결정
            const direction = swipeDiffX > 0 ? 'right' : 'left';
            setSwipeDirection(direction);

            // 스와이프 진행률 계산 (0-100)
            const progress = Math.min(100, (Math.abs(swipeDiffX) / swipeThreshold) * 100);
            setSwipeProgress(progress);
        }
    };

    const handleTouchEnd = (): void => {
        if (isSwipeAnimating || isDownloading) return;

        // 길게 누르기 취소
        handleLongPressCancel();

        // 스와이프 처리
        if (swipeDirection) {
            const diffX = Math.abs(currentX.current - startX.current);

            if (diffX > swipeThreshold) {
                // 스와이프 애니메이션 시작
                setIsSwipeAnimating(true);

                // 완료 애니메이션 표시
                setSwipeProgress(100);

                setTimeout(() => {
                    // 이전/다음 카드로 이동
                    if (swipeDirection === 'left') {
                        // 다음 카드로 이동 (순환)
                        setSelectedCard((prev) => (prev + 1) % images.length);
                    } else if (swipeDirection === 'right') {
                        // 이전 카드로 이동 (순환)
                        setSelectedCard((prev) => (prev - 1 + images.length) % images.length);
                    }

                    // 애니메이션 상태 초기화
                    setTimeout(() => {
                        setIsSwipeAnimating(false);
                        setSwipeProgress(0);
                        setSwipeDirection(null);
                    }, 300);
                }, 200);
            } else {
                // 임계값 미달시 초기화
                setSwipeProgress(0);
                setSwipeDirection(null);
            }
        }
    };

    const getCardStyle = (index: number): React.CSSProperties => {
        const isSelected = selectedCard === index;
        const totalCards = images.length;

        // 카드 배치를 수정하여 가운데 정렬되도록 함
        const baseRotation = totalCards <= 2 ? -5 : -10;
        const rotationIncrement = totalCards <= 2 ? 10 : 5;

        let rotation = baseRotation + (index * rotationIncrement);
        let translateX = 0; // 초기 X 이동값
        let translateY = index * 5;
        let zIndex = index;
        let scale = 1;
        let opacity = 1;

        // 스와이프 애니메이션 적용
        if (isSelected && swipeDirection && swipeProgress > 0) {
            // 좌/우 스와이프에 따른 이동
            if (swipeDirection === 'left') {
                translateX = -swipeProgress * 1.5;
            } else if (swipeDirection === 'right') {
                translateX = swipeProgress * 1.5;
            }

            // 스와이프 중에는 회전 효과 추가
            rotation = swipeDirection === 'left' ? -swipeProgress * 0.1 : swipeProgress * 0.1;
            opacity = 1 - (swipeProgress * 0.01);
        }

        if (selectedCard !== null) {
            if (isSelected) {
                rotation = isSwipeAnimating && swipeDirection ? rotation : 0;
                translateX = isSwipeAnimating && swipeDirection ? translateX : 0;
                translateY = 0;
                zIndex = 100;
                scale = isLongPress ? 1.02 : 1.05; // 길게 누를 때 약간 축소
                opacity = isSwipeAnimating && swipeDirection ? opacity : 1;
            } else {
                if (index < selectedCard) {
                    rotation = baseRotation - 10;
                    translateX = -60;
                } else {
                    rotation = baseRotation + (totalCards * rotationIncrement) + 10;
                    translateX = 60;
                }
                translateY = 10;
                zIndex = 10;
                scale = 0.9;
                opacity = 0.7;
            }
        }

        return {
            transform: `rotate(${rotation}deg) translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
            zIndex,
            transition: isSwipeAnimating ? 'all 0.5s ease' : swipeProgress > 0 ? 'none' : 'all 0.3s ease',
            opacity,
            width: `${cardDimensions.width}px`,
            height: `${cardDimensions.height}px`,
        };
    };

    return (
        <div className={`w-full h-screen flex flex-col items-center ${isMobile ? 'justify-between' : 'justify-center py-10'} ${bgColor} p-4 overflow-hidden`}>
            {sceneText && (
                <h1 className={`${isMobile ? 'text-sm' : 'text-2xl'} font-bold ${isMobile ? 'mt-4 mb-4' : 'mb-6'} text-center ${textColor} drop-shadow-sm px-4`}>
                    {sceneText}
                </h1>
            )}

            <div
                ref={containerRef}
                className="relative flex flex-col items-center"
                style={{ width: `${cardDimensions.width + 60}px` }}
            >
                {/* 카드 스택  */}
                <div className={`relative w-full flex justify-center`} style={{ height: `${cardDimensions.height}px` }}>
                    {images.map((card, index) => (
                        <div
                            key={index}
                            ref={selectedCard === index ? cardRef : null}
                            className={`absolute rounded-xl shadow-lg cursor-pointer
                                      border-4 ${selectedCard === index ? borderColor : 'border-white'}`}
                            style={{
                                ...getCardStyle(index),
                                left: '50%',
                                top: '0',
                                marginLeft: `-${cardDimensions.width / 2}px`,
                            }}
                            onClick={() => handleCardClick(index)}
                            onTouchStart={(e) => handleTouchStart(e, index)}
                            onMouseDown={(e) => handleTouchStart(e, index)}
                            onTouchMove={handleTouchMove}
                            onMouseMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            onMouseUp={handleTouchEnd}
                            onMouseLeave={handleTouchEnd}
                        >
                            <div className="w-full h-full p-2 flex flex-col bg-white rounded-lg overflow-hidden">
                                <div className="w-full h-full overflow-hidden flex items-center justify-center bg-gray-50">
                                    <img
                                        src={card.src}
                                        alt={card.label}
                                        className="w-full h-full object-contain"
                                        draggable={false}
                                    />
                                </div>

                                {selectedCard === index && (
                                    <div className="absolute bottom-3 left-0 right-0 flex flex-col items-center">
                                        <div className={`mb-1 text-sm text-center ${textColor} bg-opacity-70 ${bgColor} py-1 px-3 rounded-full mx-auto shadow-sm`}>
                                            {isDownloading ? '다운로드중...' : guideTextMobile}
                                        </div>

                                        {selectedCard === index && !isDownloading && (
                                            <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                {isLongPress ? (
                                                    <div
                                                        className={`h-full ${borderColor} ${bgColor} rounded-full transition-all duration-100`}
                                                        style={{ width: `${longPressProgress}%` }}
                                                    />
                                                ) : swipeDirection && (
                                                    <div
                                                        className={`h-full ${borderColor} ${bgColor} rounded-full transition-all duration-300`}
                                                        style={{ width: `${swipeProgress}%` }}
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/*탭*/}
                <div className="flex flex-wrap justify-center gap-3 mt-10 w-full">
                    {tabTexts.map((text, index) => (
                        <button
                            key={index}
                            onClick={() => handleTabClick(index)}
                            className={`px-3 py-1 rounded-full text-xs md:text-sm transition-all 
                                      ${selectedCard === index
                                    ? `${borderColor} bg-white font-medium border-2 shadow-md ${textColor}` // Enhanced selected state
                                    : 'bg-white border border-gray-200 ' + textColor}`}
                        >
                            {text}
                        </button>
                    ))}
                </div>
            </div>

            {/* 가이드텍스트 */}
            <div className={`text-center ${textColor} text-xs md:text-sm max-w-xs mt-4 ${isMobile ? 'mb-4' : 'mb-6'}`}>
                {selectedCard !== null
                    ? '길게 눌러 다운로드하거나 좌우로 스와이프하여 카드 변경'
                    : '카드를 선택해주세요'}
            </div>

            {/* 버튼 */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full max-w-md px-4">
                <motion.button
                    onClick={() => onSceneChange('startInit')}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`border-white border-2 ${bgColor}  ${textColor} hover:${bgColor} px-8 md:px-10 py-2 md:py-3 rounded-full shadow-lg transition-colors duration-300 flex items-center space-x-2 text-sm md:text-base w-full max-w-[200px] justify-center mx-auto`}
                >
                    <span className="font-medium">다시하기</span>
                </motion.button>

                <ShareButton
                    currentMemberName={currentMemberName}
                    selectedCard={images[selectedCard]?.src || ''}
                    title="공유하기"
                    textColor={textColor}
                    borderColor={borderColor}
                />
            </div>
        </div>
    );
};

export default RewardSceneLayout;