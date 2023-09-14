import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateStringProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';

/** Propsの型定義 */
type CareerContentsProps = {
    careerTitle: string;
    careerDescription: string;
    className?: string;
} 

/**
 * CareerContentsコンポーネント
 * @returns JSX
 */
const CareerContents: React.FC<CareerContentsProps> = ({ 
    careerTitle, 
    careerDescription, 
    className = ""
}) => {
    // Props検証
    const stringError = validateStringProps([careerTitle, careerDescription], MESSAGES.ERRORS.NOT_STRING);
    const errors = [stringError].filter(e => e !== null && e !== undefined);
    if (errors.length > 0) {
        consoleLog(`[CareerContents]: ${errors.join(' ')}`);
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    return (
        <div className={`${className} pb-4`}>
            <div className="flex pb-2">
                <div className="">{careerTitle}</div>
                <div className="px-1">:</div>
            </div>
            <div className="">{careerDescription}</div>
        </div>
    );
};

export default CareerContents;