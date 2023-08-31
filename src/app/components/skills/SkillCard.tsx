import React from 'react';
import { Image } from 'next/dist/client/image-component';
import { SkillsCardType } from '@/app/types/SkillsType';

/** Propsの型定義 */
type Props = {
    skill: SkillsCardType;
}

/**
 * スキルカードコンポーネント
 * @param skill スキルデータ
 * @returns JSX
 */
const SkillCard = (props: Props) => {
    const { skill } = props;

    // css
    let classAppend = "flex justify-center items-center m-2 p-2 rounded-2xl";
    classAppend = `${classAppend} w-[210px] xs:w-[250px] ssssm:w-[280px] sssm:w-[350px] h-[110px]`;
    classAppend = `${classAppend} text-xxs xxs:text-xs xs:text-xs ssssm:text-sm sssm:text-base`;
    classAppend = `${classAppend} bg-white text-black`;

    return (
        <div className={`${classAppend}`}>
            <div className="basis-1/3">
                <div className="flex justify-center items-center">
                    <Image
                        className="m-auto"
                        src={skill.skills_card_icon} 
                        alt="skill_icon"
                        width={50}
                        height={50}
                        sizes="10%" />  
                </div>
            </div>
            <div className="basis-2/3">
                <div className="">
                    <h3 className="p-2 pt-0">
                        {skill.skills_card_name}
                    </h3>
                    <p className="pl-2 pr-4">
                        {skill.skills_card_contents}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SkillCard;