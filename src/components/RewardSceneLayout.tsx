type RewardSceneLayoutProps = {
    images: { src: string; label: string }[];
    bgColor?: string;
    borderColor?: string;
    sceneText?: string;
    guideText?: string;
};

const downloadImage = (src: string, label: string) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = label;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export default function RewardSceneLayout({ images, bgColor = 'bg-yellow-50', borderColor = 'border-yellow-300', sceneText, guideText = '아래로 스와이프(또는 클릭) 시 다운로드' }: RewardSceneLayoutProps) {
    return (
        <div className={`flex flex-col items-center gap-8 py-10 ${bgColor} min-h-screen overflow-x-auto`}>
            {sceneText && (
                <div className="mb-6 text-2xl font-bold text-center text-yellow-700 drop-shadow-sm">{sceneText}</div>
            )}
            <div className="flex flex-row justify-center items-center gap-8 w-full">
                {images.map(({ src, label }) => (
                    <div
                        key={label}
                        className="relative group cursor-pointer flex-shrink-0 min-w-[280px] max-w-xs w-full"
                        onPointerUp={() => downloadImage(src, label)}
                    >
                        <img
                            src={src}
                            alt={label}
                            className={`w-full max-w-full h-auto rounded-xl shadow-lg select-none ${borderColor}`}
                            draggable={false}
                        />
                        <div className="mt-2 text-center font-bold text-lg text-yellow-700">{label}</div>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition text-xs bg-white/80 px-2 py-1 rounded">
                            {guideText}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 