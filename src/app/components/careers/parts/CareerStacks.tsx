import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateStringProps, validateArrays } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';
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
    // Props検証
    const stringError = validateStringProps([careerTitle], MESSAGES.ERRORS.NOT_STRING);
    const arrayError = validateArrays([careerStacks], MESSAGES.ERRORS.NOT_ARRAYS);
    const errors = [stringError, arrayError].filter(e => e !== null && e !== undefined);
    if (errors.length > 0) {
        consoleLog(`[CareerStacks]: ${errors.join(' ')}`);
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

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