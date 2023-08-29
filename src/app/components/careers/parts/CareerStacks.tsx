import React from 'react';
import StackCard from '@/app/components/careers/cards/StackCard';

/** Propsの型定義 */
type CareerStacksProps = {
    careerTitle: string;
    careerStacks: Array<string>;
    className: string;
}

/**
 * CareerStacksコンポーネント
 * @param props careerTitle, careerSkillStack, className
 * @returns JSX
 */
const CareerStacks = (props: CareerStacksProps) => {
    const { careerTitle, careerStacks, className } = props;

    return (
        <div className={`${className} pb-4`}>
            <div className="flex pb-2">
                <div className="">{careerTitle}</div>
                <div className="px-1">:</div>
            </div>
            <div className="flex flex-wrap">
                {careerStacks.map((stack, index) => (
                    <StackCard stackName={stack} key={stack + '_' + index} />
                ))}
            </div>
        </div>
    );
};

export default CareerStacks;