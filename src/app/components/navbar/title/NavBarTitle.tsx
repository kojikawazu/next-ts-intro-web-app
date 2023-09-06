import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateStringProps, validateFunctionProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';

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
    // Props検証
    const functionError = validateFunctionProps([onClick], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const stringError   = validateStringProps([ariaLabel, label], MESSAGES.ERRORS.NOT_STRING);
    const errors = [functionError, stringError].filter(e => e !== null && e !== undefined);
    if (errors.length > 0) {
        consoleLog(`[NavBarTitle]: ${errors.join(' ')}`);
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

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