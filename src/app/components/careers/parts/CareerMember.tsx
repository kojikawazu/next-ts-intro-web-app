import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateStringProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';

/** Propsの型定義 */
type CareerMemberProps = {
    careerTitle: string;
    careerDetail: string;
    className?: string;
};

/**
 * CareerMemberコンポーネント
 * @returns JSX
 */
const CareerMember: React.FC<CareerMemberProps>  = ({ 
    careerTitle, 
    careerDetail, 
    className = ""
}) => {
    // Props検証
    const stringError = validateStringProps([careerTitle, careerDetail], MESSAGES.ERRORS.NOT_STRING);
    const errors = [stringError].filter(e => e !== null && e !== undefined);
    if (errors.length > 0) {
        consoleLog(`[CareerMember]: ${errors.join(' ')}`);
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    return (
        <div className={`flex ${className} pb-4`}>
            <div className="">{careerTitle}</div>
            <div className="px-2">:</div>
            <div className="">{careerDetail}</div>
        </div>
    );
};

export default CareerMember;