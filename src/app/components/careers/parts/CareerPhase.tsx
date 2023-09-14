import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateStringProps, validateArrays } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';
import StackCard from '@/app/components/careers/cards/StackCard';

/** Propsの型定義 */
type CareerPhaseProps = {
    careerTitle: string;
    careerPhases: Array<string>;
    className?: string;
}

/**
 * CareerPhaseコンポーネント
 * @returns JSX
 */
const CareerPhase: React.FC<CareerPhaseProps> = ({ 
    careerTitle, 
    careerPhases,
    className = ""
}) => {
    // Props検証
    const stringError = validateStringProps([careerTitle], MESSAGES.ERRORS.NOT_STRING);
    const arrayError = validateArrays([careerPhases], MESSAGES.ERRORS.NOT_ARRAYS);
    const errors = [stringError, arrayError].filter(e => e !== null && e !== undefined);
    if (errors.length > 0) {
        consoleLog(`[CareerPhase]: ${errors.join(' ')}`);
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    return (
        <div className={`${className} pb-4`}>
            <div className="flex pb-2">
                <div className="">{careerTitle}</div>
                <div className="px-1">:</div>
            </div>
            <div className="flex flex-wrap">
                {careerPhases.map((phase, index) => (
                    <StackCard stackName={phase} key={phase + '_' + index} />
                ))}
            </div>
        </div>
    );
};

export default CareerPhase;