import React from 'react';
import classNames from 'classnames';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateFunctionProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';

/** Propsの型定義 */
type HamburgerOpenBtnProps = {
    onClick: () => void;
    ariaLabel?: string;
}

/**
 * ハンバーガーメニューの開くボタンコンポーネント
 * @returns JSX
 */
const HamburgerOpenBtn: React.FC<HamburgerOpenBtnProps> = ({
    onClick,
    ariaLabel = "メニューを開く"
}) => {
    // Props検証
    const functionError = validateFunctionProps([onClick], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const errors = [functionError].filter(e => e !== null && e !== undefined);
    if (errors.length > 0) {
        consoleLog(`[HamburgerOpenBtn]: ${errors.join(' ')}`);
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }
    const commonClass = classNames(["w-8", "h-0.5", "bg-dblue"]);
    const mtClass     = classNames(["mt-1.5"]);

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={ariaLabel}
            className="z-50 w-10 h-10 space-y-2 mr-7">
            <div className={commonClass}></div>
            <div className={`${commonClass} ${mtClass}`}></div>
            <div className={`${commonClass} ${mtClass}`}></div>
        </button>
    );
};

export default HamburgerOpenBtn;