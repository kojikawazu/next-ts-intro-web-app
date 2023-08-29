import React from 'react';

/** Propsの型定義 */
type CareerContentsProps = {
    careerTitle: string;
    careerDescription: string;
    className: string;
} 

/**
 * CareerContentsコンポーネント
 * @param props careerTitle, careerDescription, className
 * @returns JSX
 */
const CareerContents = (props: CareerContentsProps) => {
    const { careerTitle, careerDescription, className } = props;

    return (
        <div className={`${className} pb-4`}>
            <div className="flex pb-2">
                <div className="">{careerTitle}</div>
                <div className="px-1">:</div>
            </div>
            <div className="">{careerDescription}</div>
        </div>
    );
};

export default CareerContents;