import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateFunctionProps, validateStringProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';

/** Propsの型定義 */
type FooterTitleBtnProps = {
    className?: string;
    ariaLabel?: string;
    onClick: () => void;
    labelClassName?: string;
    label: string;
}

/**
 * FooterTitleボタンコンポーネント
 * @returns JSX
 */
const FooterTitleBtn: React.FC<FooterTitleBtnProps> = ({
    className = "",
    ariaLabel = "footer title btn",
    onClick,
    labelClassName = "",
    label
}) => {
    // Props検証
    const functionError = validateFunctionProps([onClick], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const stringError   = validateStringProps([label], MESSAGES.ERRORS.NOT_STRING); 
    const errors = [functionError, stringError].filter(e => e !== null && e !== undefined);
    if (errors.length > 0) {
        consoleLog(`[FooterTitleBtn]: ${errors.join(' ')}`);
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    return (
        <button 
            className={className}
            aria-label={ariaLabel}
            onClick={onClick}>
            <span className={labelClassName}>
                {label}
            </span>
        </button>
    );
};

export default FooterTitleBtn;