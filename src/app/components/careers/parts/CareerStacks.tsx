import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { validatePropsFilter, validateStringProps, validateArraysProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/error/ErrorComponent';
import { customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';
import StackCard from '@/app/components/careers/cards/StackCard';

/** Propsの型定義 */
type CareerStacksProps = {
    careerTitle: string;
    careerStacks: Array<string>;
    className?: string;
}

/**
 * CareerStacksコンポーネント
 * @returns JSX
 */
const CareerStacks: React.FC<CareerStacksProps> = ({ 
    careerTitle, 
    careerStacks, 
    className = "" 
}) => {
    componentStart(CareerStacks);

    // Props検証
    const stringError = validateStringProps([careerTitle], MESSAGES.ERRORS.NOT_STRING);
    const arrayError  = validateArraysProps([careerStacks], MESSAGES.ERRORS.NOT_ARRAYS);
    const errors      = validatePropsFilter([stringError, arrayError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(CareerStacks, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    componentJSX(CareerStacks);
    return (
        <div className={`${className} pb-4`}>
            <div className="flex pb-2">
                <div className="">{careerTitle}</div>
                <div className="px-1">:</div>
            </div>

            <div className="flex flex-wrap">
                {careerStacks.map((stack, index) => (
                    <StackCard stackName={stack} key={stack + '_' + index} />
                ))}
            </div>
        </div>
    );
};

export default CareerStacks;