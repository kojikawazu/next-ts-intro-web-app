import React from 'react';
import classNames from 'classnames';

/** Propsの型定義 */
type ScrollTopIconProps = {
    iconSize?: number;
    ariaLabel?: string;
}

/**
 * スクロールトップアイコンコンポーネント
 * @returns JSX
 */
const ScrollTopIcon: React.FC<ScrollTopIconProps> = ({
    iconSize = 8,
    ariaLabel = "scroll-top-icon"
}) => {
    const width  = `w-${iconSize}`;
    const height = `h-${iconSize}`;
    const size   = classNames([width, height]);

    return (
        <svg 
            role="img"
            aria-label={ariaLabel}
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            stroke="currentColor" 
            className={size}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
    );
};

export default ScrollTopIcon;