import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { validatePropsFilter, validateFunctionProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/error/ErrorComponent';
import { customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';
import ArrowIcon from '@/app/components/common/icons/ArrowIcon';

/** Propsの型定義 */
type CareerNavigatorProps = {
    direction: 'prev' | 'next';
    componentClassName?: string;
    btnclassName?: string;
    onClick: () => void;
}

/**
 * CareerNavigatorコンポーネント
 * @returns JSX
 */
const CareerNavigator: React.FC<CareerNavigatorProps> = ({ 
    direction, 
    componentClassName = "", 
    btnclassName = "", 
    onClick 
}) => {
    componentStart(CareerNavigator);

    // Props検証
    const functionError = validateFunctionProps([onClick], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const errors        = validatePropsFilter([functionError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(CareerNavigator, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }
    
    const isPrev = direction === 'prev';

    componentJSX(CareerNavigator);
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