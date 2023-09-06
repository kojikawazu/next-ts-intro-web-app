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
 * @param careerTitle
 * @param careerStart
 * @param careerEnd
 * @param className
 * @returns JSX
 */
const CareerPeriod: React.FC<CareerPeriodProps> = ({ 
    careerTitle, 
    careerStart, 
    careerEnd, 
    className = "" 
}) => {
    
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