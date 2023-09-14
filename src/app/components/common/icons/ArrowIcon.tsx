import React from 'react';
import classNames from 'classnames';

/** Propsの型定義 */
type ArrowIconProps = {
    angleCSS?: string;
    iconSize?: number;
    ariaLabel?: string;
}

/**
 * ArrowIconコンポーネント
 * @returns JSX
 */
const ArrowIcon: React.FC<ArrowIconProps> = ({
    angleCSS  = 'rotate-0',
    iconSize  = 18,
    ariaLabel = 'arrow icon' 
}) => {
    const className = classNames(angleCSS);

    return (
        <div style={{ position: 'relative', width: iconSize, height: iconSize }}>
            <svg 
                aria-label={ariaLabel}
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="1.5" 
                stroke="currentColor" 
                className={className}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
        </div>
    );
};

export default ArrowIcon;