import React from 'react';
import ArrowIcon from '@/app/components/common/icons/ArrowIcon';

/** Propsの型定義 */
type CareerNavigatorProps = {
    direction: 'prev' | 'next';
    componentClassName: string;
    btnclassName: string;
    onClick: () => void;
}

/**
 * CareerNavigatorコンポーネント
 * @param direction
 * @param componentClassName
 * @param btnclassName
 * @param onClick
 * @returns JSX
 */
const CareerNavigator: React.FC<CareerNavigatorProps> = ({ 
    direction, 
    componentClassName = "", 
    btnclassName = "", 
    onClick 
}) => {
    const isPrev = direction === 'prev';

    return (
        <div className={`basis-0 xl:basis-2/12 flex justify-center items-center z-10 ${componentClassName}`}>
            <button
                className={`bg-white hover:bg-gray-100 text-black rounded-full ${btnclassName}`}
                onClick={onClick}
                aria-label={isPrev ? "Previous career" : "Next career"}>
                <ArrowIcon angleCSS={isPrev ? "-rotate-90" : "rotate-90"} />
            </button>
        </div>
    );
};

export default CareerNavigator;