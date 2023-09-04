import React from 'react';

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