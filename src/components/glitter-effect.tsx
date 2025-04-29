import React, { useEffect, useState } from 'react';

// 반짝임 아이템의 타입을 명시적으로 정의
interface Sparkle {
    id: string;
    createdAt: number;
    color: string;
    size: number;
    style: React.CSSProperties;
}

const EnhancedSparkleEffect = () => {
    // 타입을 명시적으로 지정하여 TypeScript 오류 해결
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);

    // Generate random position within container
    const random = (min: number, max: number): number => Math.floor(Math.random() * (max - min)) + min;

    // 부드러운 골드/크림 색상 팔레트
    const sparkleColors = [
        '#FFC700', // Gold
        '#FFFCEB', // Soft white
        '#FFEBCD', // Pale gold
        '#FFF8DC', // Cream
        '#FFE4B5', // Moccasin
        '#FFFACD', // Lemon chiffon
        '#FFD700', // Gold
        '#FFDF00', // Golden yellow
        '#FEF9E7', // 파스텔 노란색
        '#FFEFBA', // 부드러운 황금색
    ];

    // 부드러운 반짝임 생성
    const createSparkle = (): Sparkle => {
        // 더 균일한 크기 범위
        const size = random(10, 32);
        // 랜덤한 색상 선택
        const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
        // 애니메이션 지속 시간
        const duration = random(6, 12); // 더 긴 지속시간으로 천천히 움직이게
        // 랜덤한 지연 시작
        const delay = random(0, 5);

        // 부드러운 글로우 효과 (확률 낮춤)
        const hasGlow = random(1, 5) === 1; // 20% 확률
        let filter = hasGlow ? 'brightness(1.2) drop-shadow(0 0 2px rgba(255,255,220,0.5))' : '';

        return {
            id: String(Date.now() + random(0, 10000)),
            createdAt: Date.now(),
            color,
            size,
            style: {
                position: 'absolute',
                top: random(0, 100) + '%',
                left: random(0, 100) + '%',
                opacity: random(60, 90) / 100, // 최대 투명도 낮춤
                transform: `rotate(${random(0, 360)}deg) scale(${random(90, 110) / 100})`, // 스케일 범위 축소
                animation: `sparkle-float ${duration}s ease-in-out ${delay}s infinite alternate`,
                zIndex: random(1, 3),
                filter,
                transition: 'all 1s ease', // 더 긴 전환 시간
            }
        };
    };

    // 많은 초기 반짝임과 천천히 추가
    useEffect(() => {
        const SPARKLE_LIMIT = 100; // 최대 반짝임 수 조절

        // 초기에 즉시 반짝임 추가 (30개)
        const initialSparkles = Array.from({ length: 30 }, () => createSparkle());
        setSparkles(initialSparkles);

        // 천천히 반짝임 추가 (간격 늘림)
        const interval = setInterval(() => {
            setSparkles(prev => {
                // 한 번에 1개만 추가
                const newSparkle = createSparkle();

                // 최대 개수 초과 시 가장 오래된 것부터 제거
                if (prev.length >= SPARKLE_LIMIT) {
                    return [...prev.slice(1), newSparkle]; // 맨 앞의 하나만 제거
                }
                return [...prev, newSparkle];
            });
        }, 400); // 더 긴 간격으로 추가

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {/* 모든 반짝임 효과 */}
            {sparkles.map(sparkle => (
                <div
                    key={sparkle.id}
                    className="absolute"
                    style={sparkle.style}
                >
                    {random(1, 10) <= 8 ? (
                        // 80% 확률로 별 모양 (기본)
                        <svg
                            width={sparkle.size}
                            height={sparkle.size}
                            viewBox="0 0 68 68"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g filter="url(#filter0_f)">
                                <path
                                    d="M34 4L38.8747 25.1253L60 30L38.8747 34.8747L34 56L29.1253 34.8747L8 30L29.1253 25.1253L34 4Z"
                                    fill={sparkle.color}
                                />
                            </g>
                            <path
                                d="M34 8L37.8746 24.1254L54 28L37.8746 31.8746L34 48L30.1254 31.8746L14 28L30.1254 24.1254L34 8Z"
                                fill="white"
                                fillOpacity="0.8"
                            />
                            <defs>
                                <filter
                                    id="filter0_f"
                                    x="0"
                                    y="0"
                                    width="68"
                                    height="68"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB"
                                >
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                    <feGaussianBlur stdDeviation="4" result="effect1_foregroundBlur" />
                                </filter>
                            </defs>
                        </svg>
                    ) : (
                        // 20% 확률로 작은 다이아몬드 모양
                        <svg
                            width={sparkle.size}
                            height={sparkle.size}
                            viewBox="0 0 68 68"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g filter="url(#filter1_f)">
                                <rect x="14" y="14" width="40" height="40" rx="2" transform="rotate(45 34 34)" fill={sparkle.color} />
                            </g>
                            <rect x="19" y="19" width="30" height="30" rx="1" transform="rotate(45 34 34)" fill="white" fillOpacity="0.9" />
                            <defs>
                                <filter
                                    id="filter1_f"
                                    x="0"
                                    y="0"
                                    width="68"
                                    height="68"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB"
                                >
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                    <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur" />
                                </filter>
                            </defs>
                        </svg>
                    )}
                </div>
            ))}

            {/* 부드러운 배경 반짝임 */}
            <div className="shimmer-particles"></div>
            <div className="glow-overlay"></div>

            {/* style jsx 오류 해결을 위해 일반 style 태그 사용 */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes sparkle-float {
                    0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.6; }
                    25% { transform: translate(5px, -8px) rotate(15deg) scale(1.05); opacity: 0.8; }
                    50% { transform: translate(8px, 5px) rotate(30deg) scale(0.98); opacity: 0.9; }
                    75% { transform: translate(-5px, 3px) rotate(-15deg) scale(1.02); opacity: 0.8; }
                    100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.6; }
                }
                
                .shimmer-particles {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: 
                        radial-gradient(circle at center, white 0.5px, transparent 1px),
                        radial-gradient(circle at center, rgba(255, 255, 255, 0.8) 0.3px, transparent 0.6px),
                        radial-gradient(circle at center, rgba(255, 240, 180, 0.7) 0.4px, transparent 0.8px);
                    background-size: 120px 120px, 100px 100px, 80px 80px;
                    background-position: 0 0, 30px 30px, 15px 15px;
                    opacity: 0.6;
                    animation: shimmer 10s ease-in-out infinite;
                }
                
                .glow-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: radial-gradient(ellipse at center, rgba(255, 250, 220, 0.15) 0%, transparent 70%);
                    opacity: 0.4;
                    animation: glow-pulse 10s ease-in-out infinite alternate;
                }
                
                @keyframes shimmer {
                    0% { opacity: 0.5; }
                    50% { opacity: 0.7; }
                    100% { opacity: 0.5; }
                }
                
                @keyframes glow-pulse {
                    0% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.02); }
                    100% { opacity: 0.3; transform: scale(1); }
                }
            `}} />
        </div>
    );
};

export default EnhancedSparkleEffect;