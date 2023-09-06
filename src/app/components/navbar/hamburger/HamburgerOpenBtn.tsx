import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateStringProps, validateFunctionProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';

/** Propsの型定義 */
type HamburgerOpenBtnProps = {
    onClick: () => void;
    ariaLabel: string;
}

/**
 * ハンバーガーメニューの開くボタンコンポーネント
 * @returns JSX
 */
const HamburgerOpenBtn: React.FC<HamburgerOpenBtnProps> = ({
    onClick,
    ariaLabel
}) => {
    // Props検証
    const functionError = validateFunctionProps([onClick], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const stringError   = validateStringProps([ariaLabel], MESSAGES.ERRORS.NOT_STRING);
    const errors = [functionError, stringError].filter(e => e !== null && e !== undefined);
    if (errors.length > 0) {
        consoleLog(`[HamburgerOpenBtn]: ${errors.join(' ')}`);
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={ariaLabel}
            className="z-50 w-10 h-10 space-y-2 mr-7">
            <div className="w-8 h-0.5 bg-dblue "></div>
            <div className="w-8 h-0.5 bg-dblue mt-1.5"></div>
            <div className="w-8 h-0.5 bg-dblue mt-1.5"></div>
        </button>
    );
};

export default HamburgerOpenBtn;