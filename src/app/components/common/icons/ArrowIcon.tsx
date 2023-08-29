import React from 'react';

/** Propsの型定義 */
type ArrowIconProps = {
    angleCSS: string;
}

/**
 * ArrowIconコンポーネント
 * @param props angleCSS = 'rotate-0'
 * @returns JSX
 */
const ArrowIcon = (props: ArrowIconProps) => {
    const { angleCSS = 'rotate-0' } = props;

    return (
        <svg 
            aria-label="scroll-up-icon"
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            stroke="currentColor" 
            className={`w-5 h-5 ${angleCSS}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
    );
};

export default ArrowIcon;