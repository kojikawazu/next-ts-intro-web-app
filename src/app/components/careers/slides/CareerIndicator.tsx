import React from 'react';

/** Propsの型定義 */
type CareerIndicatorProps = { 
    currentIndex: number;
    careerDataLength: number; 
    jumpToCard: (arg0: number) => void;
}

/**
 * CareerIndicatorコンポーネント
 * @param props currentIndex, careerDataLength, jumpToCard
 * @returns JSX
 */
const CareerIndicator = (props: CareerIndicatorProps) => {
    const { currentIndex, careerDataLength, jumpToCard } = props;
    const length = careerDataLength;

    return (
        <div className="flex z-10">
            <div className="flex justify-center mt-4 mb-12">
                {Array.from({ length }).map((_, index) => (
                    <button 
                        key={index} 
                        onClick={() => jumpToCard(index)}
                        className={`mx-2 p-0.5 xs:p-1 sssm:p-2 rounded-full cursor-pointer 
                        ${index === currentIndex ? 'bg-black text-black' : 'bg-gray-300 text-gray-300'}`}
                        aria-label={`Move to career ${index + 1}`}
                >
                    &bull;
                </button> 
                ))}
            </div>
        </div>
    );
};

export default CareerIndicator;