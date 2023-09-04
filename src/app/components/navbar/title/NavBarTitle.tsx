import React from 'react';

/** Propsの型定義 */
type NavBarTitleProps = {
    ariaLabel: string;
    btnClass: string;
    onClick: () => void;
    label: string;
}

/**
 * ナビバータイトルコンポーネント
 * @returns JSX
 */
const NavBarTitle: React.FC<NavBarTitleProps> = ({
    ariaLabel,
    btnClass,
    onClick,
    label
}) => {
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