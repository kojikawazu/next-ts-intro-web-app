import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { validatePropsFilter, validateStringProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/error/ErrorComponent';
import { customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';

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
    componentStart(CareerMember);

    // Props検証
    const stringError = validateStringProps([careerTitle, careerDetail], MESSAGES.ERRORS.NOT_STRING);
    const errors      = validatePropsFilter([stringError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(CareerMember, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    componentJSX(CareerMember);
    return (
        <div className={`flex ${className} pb-4`}>
            <div className="">{careerTitle}</div>
            <div className="px-2">:</div>
            <div className="">{careerDetail}</div>
        </div>
    );
};

export default CareerMember;