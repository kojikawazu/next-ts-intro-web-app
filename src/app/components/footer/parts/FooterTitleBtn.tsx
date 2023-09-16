import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { validatePropsFilter, validateFunctionProps, validateStringProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';
import { customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';

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
    componentStart(FooterTitleBtn);

    // Props検証
    const functionError = validateFunctionProps([onClick], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const stringError   = validateStringProps([label], MESSAGES.ERRORS.NOT_STRING); 
    const errors        = validatePropsFilter([functionError, stringError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(FooterTitleBtn, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    componentJSX(FooterTitleBtn);
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