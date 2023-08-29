import React from 'react';

/** Propsの型定義 */
type CareerRoleProps = {
    careerTitle: string;
    careerRole: string;
    className: string;
}

/**
 * CareerRoleコンポーネント
 * @param props careerTitle, careerRole, className
 * @returns JSX
 */
const CareerRole = (props: CareerRoleProps) => {
    const { careerTitle, careerRole, className } = props;

    return (
        <div className={`${className} pb-4`}>
            <div className="flex pb-2">
                <div className="">{careerTitle}</div>
                <div className="px-1">:</div>
            </div>
            <div className="">{careerRole}</div>
        </div>
    );
};

export default CareerRole;