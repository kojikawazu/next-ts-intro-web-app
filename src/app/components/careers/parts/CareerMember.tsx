import React from 'react';

/** Propsの型定義 */
type CareerMemberProps = {
    careerTitle: string;
    careerDetail: string;
    className: string;
};

/**
 * CareerMemberコンポーネント
 * @param props careerTitle, careerDetail, className
 * @returns JSX
 */
const CareerMember = (props: CareerMemberProps) => {
    const { careerTitle, careerDetail, className } = props;

    return (
        <div className={`flex ${className} pb-4`}>
            <div className="">{careerTitle}</div>
            <div className="px-2">:</div>
            <div className="">{careerDetail}</div>
        </div>
    );
};

export default CareerMember;