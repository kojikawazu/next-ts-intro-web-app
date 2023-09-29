import React, { useMemo } from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { useIntroData } from '@/app/contexts/introContext';
import ErrorComponent from '@/app/components/common/error/ErrorComponent';
import { customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';
import Title from '@/app/components/common/title/Title';
import CareerSlideContainer from '@/app/components/careers/slides/CareerSlideContainer';

/**
 * Careerコンポーネント
 * @returns JSX
 */
const Careers = () => {
    componentStart(Careers);

    // Context
    const { introData, refData } = useIntroData();
    const navbarData             = introData?.navbar_data;
    const careerTitleData        = introData?.career_title_data;
    const careerData             = useMemo(() => introData?.career_data || [], [introData]);

    // エラーハンドリング
    if (!navbarData || !careerTitleData || !careerData || !refData) {
        const errorJoin = MESSAGES.ERRORS.DATA_LOADING;
        customLog(Careers, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />
    }

    const componentsHeight = "h-[850px] xs:h-[900px] sssm:h-[820px] sm:h-[830px] md:h-[1300px] lg:h-[1200px] xl:h-[1300px]";

    componentJSX(Careers);
    return (
        <section 
            className={`w-full ${componentsHeight} bg-lblue`}
            ref={refData.careerRef}>
            <div className="flex justify-center content-center pt-32 pb-6">
                <Title titleName={navbarData.career_name} />
            </div>

            <div className="">
                <CareerSlideContainer
                    careerTitleData={careerTitleData}
                    careerData={careerData} />
            </div>
        </section>
    );
};

export default Careers;