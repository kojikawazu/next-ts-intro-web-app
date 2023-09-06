import React from 'react';
import StackCard from '@/app/components/careers/cards/StackCard';

/** Propsの型定義 */
type CareerPhaseProps = {
    careerTitle: string;
    careerPhases: Array<string>;
    className: string;
}

/**
 * CareerPhaseコンポーネント
 * @param careerTitle
 * @param careerSkillPhase
 * @param className
 * @returns JSX
 */
const CareerPhase: React.FC<CareerPhaseProps> = ({ 
    careerTitle, 
    careerPhases,
    className = ""
}) => {

    return (
        <div className={`${className} pb-4`}>
            <div className="flex pb-2">
                <div className="">{careerTitle}</div>
                <div className="px-1">:</div>
            </div>
            <div className="flex flex-wrap">
                {careerPhases.map((phase, index) => (
                    <StackCard stackName={phase} key={phase + '_' + index} />
                ))}
            </div>
        </div>
    );
};

export default CareerPhase;