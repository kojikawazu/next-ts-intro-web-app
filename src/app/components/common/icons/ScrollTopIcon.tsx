import React from 'react';

/** Propsの型定義 */
type ScrollTopIconProps = {
    className?: string;
    ariaLabel?: string;
}

/**
 * スクロールトップアイコンコンポーネント
 * @returns JSX
 */
const ScrollTopIcon: React.FC<ScrollTopIconProps> = ({
    className = "w-8 h-8",
    ariaLabel = "scroll-top-icon"
}) => {
    return (
        <svg 
            role="img"
            aria-label={ariaLabel}
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            stroke="currentColor" 
            className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
    );
};

export default ScrollTopIcon;