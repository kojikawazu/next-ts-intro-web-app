import React from 'react';
import { CareerType, CareerTitleType } from '@/app/types/CareerType';
import CareerTitle from '@/app/components/careers/parts/CareerTitle';
import CareerPeriod from '@/app/components/careers/parts/CareerPeriod';
import CareerMember from '@/app/components/careers/parts/CareerMember';
import CareerContents from '@/app/components/careers/parts/CareerContents';
import CareerStacks from '@/app/components/careers/parts/CareerStacks';
import CareerPhase from '@/app/components/careers/parts/CareerPhase';
import CareerRole from '@/app/components/careers/parts/CareerRole';

/** コンポーネントの背景色 */
const COMPONENTS_BG_COLOR:    string="bg-white";
/** コンポーネントの幅 */
const COMPONENTS_WIDTH:       string="w-full";
/** コンポーネントの高さ */
const COMPONENTS_HEIGHT:      string="h-[350px]";
const COMPONENTS_HEIGHT_XXS:  string="xxs:h-[350px]";
const COMPONENTS_HEIGHT_XS:   string="xs:h-[420px]";
const COMPONENTS_HEIGHT_SSSM: string="sssm:h-[350px]";
const COMPONENTS_HEIGHT_SSM:  string="ssm:h-[330px]";
const COMPONENTS_HEIGHT_SM:   string="sm:h-[350px]";
const COMPONENTS_HEIGHT_MD:   string="md:h-[600px]";
const COMPONENTS_HEIGHT_LG:   string="lg:h-[700px]";
const COMPONENTS_HEIGHT_XL:   string="xl:h-[800px]";

/** Propsの型定義 */
type CareerCardProps = {
    careerTitleData: CareerTitleType;
    careerData: CareerType;
    className?: string;
}

/**
 * Careerカードコンポーネント
 * @param props careerTitleData, careerData, className
 * @returns JSX
 */
const CareerCard = (props: CareerCardProps) => {
    const { careerTitleData, careerData, className } = props;
    let components_height = `${COMPONENTS_HEIGHT} ${COMPONENTS_HEIGHT_XXS} ${COMPONENTS_HEIGHT_SSSM} ${COMPONENTS_HEIGHT_SSM}`;
    components_height = `${components_height} ${COMPONENTS_HEIGHT_XS} ${COMPONENTS_HEIGHT_SM} ${COMPONENTS_HEIGHT_MD} ${COMPONENTS_HEIGHT_LG} ${COMPONENTS_HEIGHT_XL}`;

    return (
        <div className={`${COMPONENTS_WIDTH} ${components_height} mx-auto my-16 rounded-3xl ${COMPONENTS_BG_COLOR} ${className}`}>
            <button 
                className="px-10 p-8">
                <CareerTitle 
                    careerTitle={careerData.career_title}
                    className="text-xxxs xs:text-xxs sssm:text-xs sm:text-sm md:text-base py-5 md:py-10" />

                <CareerPeriod 
                    careerTitle={careerTitleData.career_title_period}
                    careerStart={careerData.career_start}
                    careerEnd={careerData.career_end}
                    className="text-xxs xs:text-xs sm:text-sm md:text-base" />
                
                <CareerMember 
                    careerTitle={careerTitleData.career_title_member}
                    careerDetail={careerData.career_member}
                    className="text-xxs xs:text-xs sm:text-sm md:text-base" />

                <CareerContents 
                    careerTitle={careerTitleData.career_title_contents}
                    careerDescription={careerData.career_contents}
                    className="text-xxs xs:text-xs sm:text-sm md:text-base" />

                <CareerStacks 
                    careerTitle={careerTitleData.career_title_stack}
                    careerStacks={careerData.career_skill_stack}
                    className="hidden md:inline-block" />

                <CareerPhase
                    careerTitle={careerTitleData.career_title_phase}
                    careerPhases={careerData.career_skill_phase}
                    className="hidden lg:inline-block" />
                
                <CareerRole 
                    careerTitle={careerTitleData.career_title_role}
                    careerRole={careerData.career_role}
                    className="hidden lg:inline-block" />
            </button>
        </div>
    );
};

export default CareerCard;