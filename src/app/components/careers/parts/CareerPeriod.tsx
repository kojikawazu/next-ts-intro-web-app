import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateStringProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';

/** Propsの型定義 */
type CareerPeriodProps = {
    careerTitle: string;
    careerStart: string;
    careerEnd: string;
    className?: string;
}

/**
 * CareerPeriodコンポーネント
 * @returns JSX
 */
const CareerPeriod: React.FC<CareerPeriodProps> = ({ 
    careerTitle, 
    careerStart, 
    careerEnd, 
    className = "" 
}) => {
    // Props検証
    const stringError = validateStringProps([careerTitle, careerStart, careerEnd], MESSAGES.ERRORS.NOT_STRING);
    const errors = [stringError].filter(e => e !== null && e !== undefined);
    if (errors.length > 0) {
        consoleLog(`[CareerPeriod]: ${errors.join(' ')}`);
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }
    
    return (
        <div className={`flex ${className} pb-1`}>
            <div className="">{careerTitle}</div>
            <div className="px-2">:</div>
            <div className="">{careerStart}</div>
            <div className="px-2">~</div>
            <div className="">{careerEnd}</div>
        </div>
    );
};

export default CareerPeriod;