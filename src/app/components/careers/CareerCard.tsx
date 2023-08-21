import React from 'react';
import { useIntroData } from '@/app/contexts/introContext';
import { CareerType, CareerTitleType } from '@/app/types/CareerType';
import StackCard from './StackCard';

/**
 * Careerカードコンポーネント
 * @returns JSX
 */
const CareerCard = () => {
    // Context
    const { introData } = useIntroData();
    const careerTitleData: CareerTitleType = introData!.career_title_data;
    const careerData: Array<CareerType> = introData!.career_data;

    return (
        <>
            {careerData.map((career, index) => (
                <div key={index}>
                    { (index == 0) ? (
                        <div key={index} className="mx-auto my-16 w-5/6 h-[880px] rounded-3xl bg-white">
                            <div className="p-8 px-10">
                                <div className="py-10">
                                    <h3 className="text-xl underline decoration-1 decoration-solid underline-offset-8">
                                        {career.career_title}
                                    </h3>
                                </div>

                                <div className="flex pb-1">
                                    <div className="">{careerTitleData.career_title_period}</div>
                                    <div className="px-2">:</div>
                                    <div className="">{career.career_start}</div>
                                    <div className="px-2">~</div>
                                    <div className="">{career.career_end}</div>
                                </div>
                                
                                <div className="flex pb-4">
                                    <div className="">{careerTitleData.career_title_member}</div>
                                    <div className="px-2">:</div>
                                    <div>{career.career_member}</div>
                                </div>

                                <div className="pb-4">
                                    <div className="flex pb-2">
                                        <div className="">{careerTitleData.career_title_contents}</div>
                                        <div className="px-1">:</div>
                                    </div>
                                    <div>{career.career_contents}</div>
                                </div>

                                <div className="pb-4">
                                    <div className="flex pb-2">
                                        <div className="">{careerTitleData.career_title_stack}</div>
                                        <div className="px-1">:</div>
                                    </div>
                                    <div className="flex flex-wrap">
                                        {career.career_skill_stack.map((stack, index) => (
                                            <StackCard stackName={stack} key={index} />
                                        ))}
                                    </div>
                                </div>

                                <div className="pb-4">
                                    <div className="flex pb-2">
                                        <div className="">{careerTitleData.career_title_phase}</div>
                                        <div className="px-1">:</div>
                                    </div>
                                    <div className="flex flex-wrap">
                                        {career.career_skill_phase.map((phase, index) => (
                                            <StackCard stackName={phase} key={index} />
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="pb-4">
                                    <div className="flex pb-2">
                                        <div className="">{careerTitleData.career_title_role}</div>
                                        <div className="px-1">:</div>
                                    </div>
                                    <div>{career.career_role}</div>
                                </div>
                            </div>
                        </div>
                    ) :
                    ( <></> )}
                </div>
            ))}
        </>
        
    );
};

export default CareerCard;