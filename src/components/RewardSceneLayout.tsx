// Modified RewardSceneLayout.tsx
import { useState, useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import type { SceneKey } from '@/modules/scene-key.type';

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
    guideTextMobile = '아래로 스와이프하여 다운로드',
    guideTextDesktop = '클릭하여 다운로드',
    onSceneChange = () => { }
}: RewardSceneLayoutProps) => {
    const [selectedCard, setSelectedCard] = useState<number>(0); // Default to showing first card
    const [isDownloading, setIsDownloading] = useState<boolean>(false);
    const [isSwipeAnimating, setIsSwipeAnimating] = useState<boolean>(false);
    const [swipeProgress, setSwipeProgress] = useState<number>(0);
    const startY = useRef<number>(0);
    const currentY = useRef<number>(0);
    const swipeThreshold = 80;
    const isMobile = useIsMobile();
    const cardRef = useRef<HTMLDivElement>(null);
    const [cardDimensions, setCardDimensions] = useState({ width: 280, height: 420 });
    const containerRef = useRef<HTMLDivElement>(null);

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

        if (selectedCard === index) {
            if (!isMobile) {
                // On desktop, clicking the selected card triggers download
                downloadCard(images[index]);
            } else {
                // No longer setting to null, instead keep the selected state
                // setSelectedCard(null);
            }
        } else {
            setSelectedCard(index);
        }
    };

    // 탭 클릭 핸들러 추가
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
                // Keep the card selected after download
                // setSelectedCard(null);
            }, 500);
        }, 300);
    };

    const handleTouchStart = (e: TouchEvent, _card: CardImage): void => {
        if (selectedCard === null || isSwipeAnimating || !isMobile) return;

        startY.current = 'touches' in e
            ? e.touches[0].clientY
            : e.clientY;
        currentY.current = startY.current;
        setSwipeProgress(0);
    };

    const handleTouchMove = (e: TouchEvent): void => {
        if (selectedCard === null || isSwipeAnimating || !isMobile) return;

        currentY.current = 'touches' in e
            ? e.touches[0].clientY
            : e.clientY;

        const swipeDiff = currentY.current - startY.current;

        // Only track downward swipes
        if (swipeDiff > 0) {
            // Calculate progress percentage (0-100)
            const progress = Math.min(100, (swipeDiff / swipeThreshold) * 100);
            setSwipeProgress(progress);
        }
    };

    const handleTouchEnd = (card: CardImage): void => {
        if (selectedCard === null || isSwipeAnimating || !isMobile) return;

        const swipeDistance = currentY.current - startY.current;

        if (swipeDistance > swipeThreshold) {
            // Complete the downward animation
            setSwipeProgress(100);
            downloadCard(card);
        } else {
            // Reset if threshold not met
            setSwipeProgress(0);
        }
    };

    const getCardStyle = (index: number): React.CSSProperties => {
        const isSelected = selectedCard === index;
        const totalCards = images.length;

        // 카드 배치를 수정하여 가운데 정렬되도록 함
        const baseRotation = totalCards <= 2 ? -5 : -10;
        const rotationIncrement = totalCards <= 2 ? 10 : 5;

        let rotation = baseRotation + (index * rotationIncrement);
        let translateX = 0; // 초기 X 이동값을 0으로 설정 (가운데 정렬)
        let translateY = index * 5;
        let zIndex = index;
        let scale = 1;

        if (isSelected && isMobile && swipeProgress > 0) {
            translateY += swipeProgress * 0.8; // Move down based on swipe progress
            scale = 1 - (swipeProgress * 0.001); // Slightly reduce scale as swiped down
        }

        if (selectedCard !== null) {
            if (isSelected) {
                rotation = 0;
                translateX = 0;
                translateY = isMobile && swipeProgress > 0 ? translateY : 0;
                zIndex = 100;
                scale = isMobile && swipeProgress > 0 ? scale : 1.05;
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
            }
        }

        return {
            transform: `rotate(${rotation}deg) translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
            zIndex,
            transition: isSwipeAnimating ? 'all 0.5s ease' : swipeProgress > 0 ? 'none' : 'all 0.3s ease',
            opacity: selectedCard !== null && !isSelected ? 0.7 : 1,
            width: `${cardDimensions.width}px`,
            height: `${cardDimensions.height}px`,
        };
    };

    return (
        <div className={`w-full h-screen flex flex-col items-center ${isMobile ? 'justify-between' : 'justify-center py-10'} bg-pink-50 p-4 overflow-hidden`}>
            {sceneText && (
                <h1 className={`${isMobile ? 'text-sm' : 'text-2xl'} font-bold ${isMobile ? 'mt-4 mb-4' : 'mb-6'} text-center text-pink-600 drop-shadow-sm px-4`}>
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
                                      border-4 ${selectedCard === index ? 'border-pink-400' : 'border-white'}`}
                            style={{
                                ...getCardStyle(index),
                                left: '50%',
                                top: '0',
                                marginLeft: `-${cardDimensions.width / 2}px`,
                            }}
                            onClick={() => handleCardClick(index)}
                            onTouchStart={(e) => handleTouchStart(e, card)}
                            onMouseDown={(e) => handleTouchStart(e, card)}
                            onTouchMove={handleTouchMove}
                            onMouseMove={handleTouchMove}
                            onTouchEnd={() => handleTouchEnd(card)}
                            onMouseUp={() => handleTouchEnd(card)}
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
                                        <div className={`mb-1 text-sm text-center text-pink-600 bg-opacity-70 bg-pink-50 py-1 px-3 rounded-full mx-auto shadow-sm`}>
                                            {isDownloading ? '다운로드중...' : isMobile ? guideTextMobile : guideTextDesktop}
                                        </div>

                                        {isMobile && selectedCard === index && !isDownloading && (
                                            <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full border-pink-400 bg-pink-400 rounded-full transition-all duration-300`}
                                                    style={{ width: `${swipeProgress}%` }}
                                                />
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
                                    ? `border-pink-400 bg-white font-medium border-2 shadow-md text-pink-600` // Enhanced selected state
                                    : 'bg-white border border-gray-200 text-pink-600'}`}
                        >
                            {text}
                        </button>
                    ))}
                </div>
            </div>

            {/* 가이드텍스트 */}
            <div className={`text-center text-pink-600 text-xs md:text-sm max-w-xs mt-4 ${isMobile ? 'mb-4' : 'mb-6'}`}>
                {selectedCard !== null
                    ? (isMobile
                        ? '다운로드하려면 카드를 아래로 스와이프하세요'
                        : '다운로드하려면 카드를 클릭하세요')
                    : '카드를 선택해주세요'}
            </div>

            {/* 번튼 */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full max-w-md px-4">
                <motion.button
                    onClick={() => onSceneChange('startInit')}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${bgColor.replace('bg-', 'bg-')} hover:${bgColor.replace('bg-', 'bg-')} ${textColor.replace('text-', 'text-white')} px-8 md:px-10 py-2 md:py-3 rounded-full shadow-lg transition-colors duration-300 flex items-center space-x-2 text-sm md:text-base w-full max-w-[200px] justify-center mx-auto`}
                >
                    <span className="font-medium">다시하기 &gt;</span>
                </motion.button>
                <motion.button
                    onClick={() => { }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-white hover:bg-gray-50 ${textColor} ${borderColor.replace('border-', 'border border-')} px-8 md:px-10 py-2 md:py-3 rounded-full shadow-lg transition-colors duration-300 flex items-center space-x-2 text-sm md:text-base w-full max-w-[200px] justify-center mx-auto`}
                >
                    <Share2 size={18} />
                    <span className="font-medium">공유하기</span>
                </motion.button>
            </div>
        </div>
    );
};

export default RewardSceneLayout;