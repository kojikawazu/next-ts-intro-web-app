import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { validatePropsFilter, validateStringProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/error/ErrorComponent';
import { customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';

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
    componentStart(CareerContents);

    // Props検証
    const stringError = validateStringProps([careerTitle, careerDescription], MESSAGES.ERRORS.NOT_STRING);
    const errors      = validatePropsFilter([stringError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(CareerContents, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    componentJSX(CareerContents);
    return (
        <div className={`${className} pb-4`}>
            <div className="flex pb-2">
                <div className="">{careerTitle}</div>
                <div className="px-1">:</div>
            </div>
            <div className="text-left">{careerDescription}</div>
        </div>
    );
};

export default CareerContents;