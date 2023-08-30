import React from 'react';
import { CareerType, CareerTitleType } from '@/app/types/CareerType';
import { useDialogLogic } from '@/app/features/dialog/useDialogLogic';
import CareerTitle from '@/app/components/careers/parts/CareerTitle';
import CareerPeriod from '@/app/components/careers/parts/CareerPeriod';
import CareerMember from '@/app/components/careers/parts/CareerMember';
import CareerContents from '@/app/components/careers/parts/CareerContents';
import CareerStacks from '@/app/components/careers/parts/CareerStacks';
import CareerPhase from '@/app/components/careers/parts/CareerPhase';
import CareerRole from '@/app/components/careers/parts/CareerRole';

/** Propsの型定義 */
type CareerCardProps = {
    currentIndex: number;
    careerTitleData: CareerTitleType;
    careerData: CareerType;
    className?: string;
}

/**
 * Careerカードコンポーネント
 * @param currentIndex
 * @param careerTitleData
 * @param careerData
 * @param className
 * @returns JSX
 */
const CareerCard: React.FC<CareerCardProps> = ({ 
    currentIndex, 
    careerTitleData, 
    careerData, 
    className 
}) => {
    // tailwindcss
    let components_height = `h-[350px] xxs:h-[350px] xs:h-[420px] sssm:h-[350px] ssm:h-[330px]`;
    components_height = `${components_height} sm:h-[350px] md:h-[600px] lg:h-[700px] xl:h-[800px]`;

    // hooks
    const { setCurrentIndexOpen } = useDialogLogic();

    return (
        <div 
            className={`w-full ${components_height} mx-auto my-16 rounded-3xl bg-white ${className}`}>
            <button 
                className="px-10 p-8"
                onClick={() => setCurrentIndexOpen(currentIndex)}
                aria-label="キャリア詳細を表示">
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