import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateStringProps, validateFunctionProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';

/** Propsの型定義 */
type HamburgerCloseBtnProps = {
    onClick: () => void;
    ariaLabel: string;
}

/**
 * ハンバーガーメニューの閉じるボタンコンポーネント
 * @returns JSX
 */
const HamburgerCloseBtn: React.FC<HamburgerCloseBtnProps> = ({
    onClick,
    ariaLabel
}) => {
    // Props検証
    const functionError = validateFunctionProps([onClick], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const stringError   = validateStringProps([ariaLabel], MESSAGES.ERRORS.NOT_STRING);
    const errors = [functionError, stringError].filter(e => e !== null && e !== undefined);
    if (errors.length > 0) {
        consoleLog(`[HamburgerCloseBtn]: ${errors.join(' ')}`);
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    return (
        <button 
            aria-label={ariaLabel}
            onClick={onClick}>
            <div className="w-10 h-0.5 bg-dblue transform rotate-45"></div>
            <div className="w-10 h-0.5 bg-dblue transform -rotate-45"></div>
        </button>
    );
};

export default HamburgerCloseBtn;