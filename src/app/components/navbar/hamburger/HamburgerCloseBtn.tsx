import React from 'react';

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