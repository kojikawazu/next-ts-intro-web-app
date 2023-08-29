import React, { useMemo } from 'react';

import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/consoleLog';
import { useIntroData } from '@/app/contexts/introContext';
import ErrorComponent from '@/app/components/common/ErrorComponent';
import CareerTitle from '@/app/components/careers/parts/CareerTitle';
import CareerPeriod from '@/app/components/careers/parts/CareerPeriod';
import CareerMember from '@/app/components/careers/parts/CareerMember';
import CareerContents from '@/app/components/careers/parts/CareerContents';
import CareerStacks from '@/app/components/careers/parts/CareerStacks';
import CareerPhase from '@/app/components/careers/parts/CareerPhase';
import CareerRole from '@/app/components/careers/parts/CareerRole';

/** Propsの型定義 */
type CareerDetailDialogProps = {
    currentIndex: number;
}

/**
 * CareerDetailDialogコンポーネント
 * @param props currentIndex
 * @returns JSX
 */
const CareerDetailDialog = (props: CareerDetailDialogProps) => {
    const { currentIndex }  = props;
    // Context
    const { introData }     = useIntroData();
    const careerTitleData   = introData?.career_title_data;
    const careerData        = useMemo(() => introData?.career_data || [], [introData]);

    // エラーハンドリング
    if (!careerTitleData || !careerData) {
        consoleLog("Careerコンポーネントのデータが不足しています");
        return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />
    }

    const currentCareerData  = careerData[currentIndex];
    const responsiveFontSize = `text-xxxxs xxs:text-xxxs xs:text-xxs sssm:text-xs sm:text-sm md:text-base`; 

    return (
        <div>
            <div>
                <CareerTitle 
                    careerTitle={currentCareerData.career_title}
                    className={`${responsiveFontSize} py-5 md:py-5`} />

                <CareerPeriod 
                    careerTitle={careerTitleData.career_title_period}
                    careerStart={currentCareerData.career_start}
                    careerEnd={currentCareerData.career_end}
                    className={responsiveFontSize} />
                
                <CareerMember 
                    careerTitle={careerTitleData.career_title_member}
                    careerDetail={currentCareerData.career_member}
                    className={responsiveFontSize} />

                <CareerContents 
                    careerTitle={careerTitleData.career_title_contents}
                    careerDescription={currentCareerData.career_contents}
                    className={responsiveFontSize} />

                <CareerStacks 
                    careerTitle={careerTitleData.career_title_stack}
                    careerStacks={currentCareerData.career_skill_stack}
                    className={responsiveFontSize} />

                <CareerPhase
                    careerTitle={careerTitleData.career_title_phase}
                    careerPhases={currentCareerData.career_skill_phase}
                    className={responsiveFontSize} />
                
                <CareerRole 
                    careerTitle={careerTitleData.career_title_role}
                    careerRole={currentCareerData.career_role}
                    className={responsiveFontSize} />
            </div>
        </div>
    );
};

export default CareerDetailDialog;