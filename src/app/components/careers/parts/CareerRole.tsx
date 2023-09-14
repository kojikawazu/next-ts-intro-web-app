import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateStringProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';

/** Propsの型定義 */
type CareerRoleProps = {
    careerTitle: string;
    careerRole: string;
    className?: string;
}

/**
 * CareerRoleコンポーネント
 * @returns JSX
 */
const CareerRole: React.FC<CareerRoleProps> = ({ 
    careerTitle, 
    careerRole, 
    className = "" 
}) => {
    // Props検証
    const stringError = validateStringProps([careerTitle, careerRole], MESSAGES.ERRORS.NOT_STRING);
    const errors = [stringError].filter(e => e !== null && e !== undefined);
    if (errors.length > 0) {
        consoleLog(`[CareerRole]: ${errors.join(' ')}`);
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    return (
        <div className={`${className} pb-4`}>
            <div className="flex pb-2">
                <div className="">{careerTitle}</div>
                <div className="px-1">:</div>
            </div>
            <div className="text-left">{careerRole}</div>
        </div>
    );
};

export default CareerRole;