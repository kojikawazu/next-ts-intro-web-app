import React from 'react';

/** Propsの型定義 */
type CareerPeriodProps = {
    careerTitle: string;
    careerStart: string;
    careerEnd: string;
    className: string;
}

/**
 * CareerPeriodコンポーネント
 * @param props careerTitle
 *              careerStart
 *              careerEnd
 *              className
 * @returns JSX
 */
const CareerPeriod = (props: CareerPeriodProps) => {
    const { careerTitle, careerStart, careerEnd, className } = props;
    
    return (
        <div className={`flex ${className} pb-1`}>
            <div className="">{careerTitle}</div>
            <div className="px-2">:</div>
            <div className="">{careerStart}</div>
            <div className="px-2">~</div>
            <div className="">{careerEnd}</div>
        </div>
    );
};

export default CareerPeriod;