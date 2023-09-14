import React from 'react';
import classNames from 'classnames';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateStringProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';

/** Props型定義 */
type CareerTitleProps= {
    careerTitle: string;
    className?: string;
}

/**
 * CareerTitleコンポーネント
 * @returns JSX
 */
const CareerTitle: React.FC<CareerTitleProps> = ({ 
    careerTitle, 
    className = "" 
}) => {
    // Props検証
    const stringError = validateStringProps([careerTitle], MESSAGES.ERRORS.NOT_STRING);
    const errors = [stringError].filter(e => e !== null && e !== undefined);
    if (errors.length > 0) {
        consoleLog(`[CareerTitle]: ${errors.join(' ')}`);
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }
    const responsiveFontSize = classNames(["text-xxs", "xs:text-xs", "md:text-xl"]);

    return (
        <div className={`flex ${className}`}>
            <h3 className={`${responsiveFontSize} underline decoration-1 decoration-solid underline-offset-8`}>
                {careerTitle}
            </h3>
        </div>
    );
};

export default CareerTitle;