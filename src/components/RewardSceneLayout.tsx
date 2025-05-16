// src/components/RewardSceneLayout.tsx
import { useState, useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

// 타입 정의
interface CardImage {
    src: string;
    label: string;
}

interface RewardSceneLayoutProps {
    images: CardImage[];
    bgColor?: string;
    borderColor?: string;
    textColor?: string;
    sceneText?: string;
    guideTextMobile?: string;
    guideTextDesktop?: string;
}

// 이벤트 핸들러 타입
type TouchEvent = React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>;

const RewardSceneLayout = ({
    images = [],
    bgColor = 'bg-yellow-50',
    borderColor = 'border-yellow-400',
    textColor = 'text-yellow-700',
    sceneText = '',
    guideTextMobile = '아래로 스와이프하여 다운로드',
    guideTextDesktop = '클릭하여 다운로드'
}: RewardSceneLayoutProps) => {
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [isDownloading, setIsDownloading] = useState<boolean>(false);
    const [isSwipeAnimating, setIsSwipeAnimating] = useState<boolean>(false);
    const [swipeProgress, setSwipeProgress] = useState<number>(0);
    const startY = useRef<number>(0);
    const currentY = useRef<number>(0);
    const swipeThreshold = 80;
    const isMobile = useIsMobile();
    const cardRef = useRef<HTMLDivElement>(null);
    const [cardDimensions, setCardDimensions] = useState({ width: 280, height: 420 });

    // Adjust card dimensions based on viewport
    useEffect(() => {
        const updateCardDimensions = () => {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Adjust card width and height based on viewport
            let newWidth = Math.min(viewportWidth * 0.8, 320);
            // For vertical images, increase height ratio
            let newHeight = Math.min(viewportHeight * 0.6, 520);

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
    }, []);

    const handleCardClick = (index: number): void => {
        if (isSwipeAnimating) return;

        if (selectedCard === index) {
            if (!isMobile) {
                // On desktop, clicking the selected card triggers download
                downloadCard(images[index]);
            } else {
                setSelectedCard(null);
            }
        } else {
            setSelectedCard(index);
        }
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
                setSelectedCard(null);
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

        const baseRotation = totalCards <= 2 ? -5 : -10;
        const rotationIncrement = totalCards <= 2 ? 10 : 5;

        let rotation = baseRotation + (index * rotationIncrement);
        let translateX = index * 10;
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
        <div className={`w-full min-h-screen flex flex-col items-center justify-center ${bgColor} p-4`}>
            {sceneText && (
                <h1 className={`text-xl font-bold mb-8 text-center ${textColor} drop-shadow-sm px-6`}>
                    {sceneText}
                </h1>
            )}

            <div className="relative mb-8" style={{ width: `${cardDimensions.width + 40}px`, height: `${cardDimensions.height + 40}px` }}>
                {images.map((card, index) => (
                    <div
                        key={index}
                        ref={selectedCard === index ? cardRef : null}
                        className={`absolute top-0 left-0 rounded-xl shadow-lg cursor-pointer
                                  border-4 ${selectedCard === index ? borderColor : 'border-white'}`}
                        style={getCardStyle(index)}
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
                                    <div className={`mb-1 text-sm text-center ${textColor} bg-opacity-70 ${bgColor} py-1 px-3 rounded-full mx-auto shadow-sm`}>
                                        {isDownloading ? '다운로드중...' : isMobile ? guideTextMobile : guideTextDesktop}
                                    </div>

                                    {isMobile && selectedCard === index && !isDownloading && (
                                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${borderColor} rounded-full transition-all duration-300`}
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

            <div className={`text-center ${textColor} text-sm max-w-xs mt-2`}>
                {selectedCard === null
                    ? "카드를 선택해주세요"
                    : isMobile
                        ? "카드를 아래로 스와이프하여 다운로드"
                        : "카드를 클릭하여 다운로드"}
            </div>
        </div>
    );
};

export default RewardSceneLayout;