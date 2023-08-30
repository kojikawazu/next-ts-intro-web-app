import React from 'react';

/** Propsの型定義 */
type CareerMemberProps = {
    careerTitle: string;
    careerDetail: string;
    className: string;
};

/**
 * CareerMemberコンポーネント
 * @param careerTitle
 * @param careerDetail
 * @param className
 * @returns JSX
 */
const CareerMember: React.FC<CareerMemberProps>  = ({ 
    careerTitle, 
    careerDetail, 
    className = ""
}) => {
    return (
        <div className={`flex ${className} pb-4`}>
            <div className="">{careerTitle}</div>
            <div className="px-2">:</div>
            <div className="">{careerDetail}</div>
        </div>
    );
};

export default CareerMember;