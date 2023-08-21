import React from 'react';
import { Image } from 'next/dist/client/image-component';
import { SkillsCardType } from '@/app/types/SkillsType';

/** Propsの型定義 */
type Props = {
    skill: SkillsCardType;
}

const SkillCard = (props: Props) => {
    const { skill } = props;

    return (
        <div className="flex bg-white m-2 rounded-2xl w-[350px] h-[110px]">
            <div className="basis-1/3">
                <div className="">
                    <Image
                        className="m-auto mt-5"
                        src={skill.skills_card_icon} 
                        alt="skill_icon"
                        width={50}
                        height={50}
                        sizes="10%" />  
                </div>
            </div>
            <div className="basis-2/3">
                <div className="w-72">
                    <div className="p-2">
                        {skill.skills_card_name}
                    </div>
                    <div className="px-2">
                        {skill.skills_card_contents}
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default SkillCard;