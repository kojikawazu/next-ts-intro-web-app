import React from 'react';
import classNames from 'classnames';
import { MESSAGES } from '@/app/shared/constants/constants';
import { validatePropsFilter, validateFunctionProps, validateNumberProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/error/ErrorComponent';
import { customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';

/** Propsの型定義 */
type CareerIndicatorProps = { 
    currentIndex: number;
    careerDataLength: number; 
    jumpToCard: (arg0: number) => void;
}

/**
 * CareerIndicatorコンポーネント
 * @returns JSX
 */
const CareerIndicator: React.FC<CareerIndicatorProps> = ({ 
    currentIndex, 
    careerDataLength, 
    jumpToCard 
}) => {
    componentStart(CareerIndicator);

    // Props検証
    const functionError = validateFunctionProps([jumpToCard], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const numberError   = validateNumberProps([currentIndex, careerDataLength], MESSAGES.ERRORS.NOT_NUMBERS);
    const errors        = validatePropsFilter([functionError, numberError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(CareerIndicator, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    const buttonBaseClass = classNames(["mx-2", "p-0.5", "xs:p-1", "sssm:p-2", "rounded-full", "cursor-pointer"]);

    componentJSX(CareerIndicator);
    return (
        <div className="flex z-10">
            <div className="flex justify-center mt-4 mb-12">
                {Array.from({ length: careerDataLength }).map((_, index) => {
                    const activeClass = index === currentIndex 
                        ? 'bg-black text-black hover:bg-gray-700 hover:text-gray-700' 
                        : 'bg-gray-300 text-gray-300 hover:bg-gray-400 hover:text-gray-400';
                    const className = classNames(buttonBaseClass, activeClass);
                    
                    return (
                        <button 
                            key={index} 
                            onClick={() => jumpToCard(index)}
                            className={className}
                            aria-label={`Move to career ${index + 1}`}>
                            &bull;
                        </button> 
                    );
                })}
            </div>
        </div>
    );
};

export default CareerIndicator;