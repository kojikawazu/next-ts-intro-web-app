import React from 'react';

/** Propsの型定義 */
type CareerIndicatorProps = { 
    currentIndex: number;
    careerDataLength: number; 
    jumpToCard: (arg0: number) => void;
}

/**
 * CareerIndicatorコンポーネント
 * @param currentIndex
 * @param careerDataLength
 * @param jumpToCard
 * @returns JSX
 */
const CareerIndicator: React.FC<CareerIndicatorProps> = ({ 
    currentIndex, 
    careerDataLength, 
    jumpToCard 
}) => {
    const buttonBaseClass = "mx-2 p-0.5 xs:p-1 sssm:p-2 rounded-full cursor-pointer";

    return (
        <div className="flex z-10">
            <div className="flex justify-center mt-4 mb-12">
                {Array.from({ length: careerDataLength }).map((_, index) => {
                    const activeClass = index === currentIndex ? 'bg-black text-black' : 'bg-gray-300 text-gray-300';
                    const className = `${buttonBaseClass} ${activeClass}`;
                    
                    return (
                        <button 
                            key={index} 
                            onClick={() => jumpToCard(index)}
                            className={className}
                            aria-label={`Move to career ${index + 1}`}
                        >
                            &bull;
                        </button> 
                    );
                })}
            </div>
        </div>
    );
};

export default CareerIndicator;