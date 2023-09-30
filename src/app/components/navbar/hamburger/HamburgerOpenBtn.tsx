import React from 'react';
import classNames from 'classnames';
import { MESSAGES } from '@/app/shared/constants/constants';
import { validatePropsFilter, validateFunctionProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/error/ErrorComponent';
import { customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';

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
    componentStart(HamburgerOpenBtn);

    // Props検証
    const functionError = validateFunctionProps([onClick], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const errors        = validatePropsFilter([functionError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(HamburgerOpenBtn, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }
    
    const btnClass    = classNames(["w-10",  "h-10", "space-y-2", "mr-7"]);
    const commonClass = classNames(["w-8", "h-0.5", "bg-dblue"]);
    const mtClass     = classNames(["mt-1.5"]);

    componentJSX(HamburgerOpenBtn);
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={ariaLabel}
            className={btnClass}>
            <div className={commonClass}></div>
            <div className={`${commonClass} ${mtClass}`}></div>
            <div className={`${commonClass} ${mtClass}`}></div>
        </button>
    );
};

export default HamburgerOpenBtn;