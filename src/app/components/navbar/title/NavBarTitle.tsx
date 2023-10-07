import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { validatePropsFilter, validateStringProps, validateFunctionProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/error/ErrorComponent';
import { customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';

/** Propsの型定義 */
type NavBarTitleProps = {
    ariaLabel: string;
    btnClass?: string;
    onClick: () => void;
    label: string;
}

/**
 * ナビバータイトルコンポーネント
 * @returns JSX
 */
const NavBarTitle: React.FC<NavBarTitleProps> = ({
    ariaLabel,
    btnClass = "",
    onClick,
    label
}) => {
    componentStart(NavBarTitle);

    // Props検証
    const functionError = validateFunctionProps([onClick], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const stringError   = validateStringProps([ariaLabel, label], MESSAGES.ERRORS.NOT_STRING);
    const errors        = validatePropsFilter([functionError, stringError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(NavBarTitle, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    componentJSX(NavBarTitle);
    return (
        <button 
            aria-label={ariaLabel}
            className={btnClass}
            onClick={onClick}>
            <h1>{label}</h1>
        </button>
    );
};

export default NavBarTitle;