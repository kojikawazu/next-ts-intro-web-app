import React, { useEffect, useMemo } from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/consoleLog';
import { useIntroData } from '@/app/contexts/introContext';
import { useSlideLogic } from '@/app/hooks/useSlideLogic';
import Title from '@/app/components/common/Title';
import ErrorComponent from '@/app/components/common/ErrorComponent';
import CareerNavigator from '@/app/components/careers/slides/CareerNavigator';
import CareerSlideContainer from '@/app/components/careers/slides/CareerSlideContainer';
import CareerIndicator from '@/app/components/careers/slides/CareerIndicator';

/**
 * Careerコンポーネント
 * @returns JSX
 */
const Careers = () => {
    // Context
    const { introData, refData } = useIntroData();
    const navbarData             = introData?.navbar_data;
    const careerTitleData        = introData?.career_title_data;
    const careerData             = useMemo(() => introData?.career_data || [], [introData]);

    const componentsHeight = "h-[1300px]";
    const contentsClass = "h-[420px] xs:h-[520px] sssm:h-[450px] ssm:h-[440px] sm:h-[500px] md:h-[720px] lg:h-[820px] xl:h-[920px]";
    
    // Hooks
    const { 
        currentIndex,
        animationDuration, 
        goToPrevCardIndex, 
        goToNextCardIndex, 
        jumpToCardIndex,
        animationTrigger,
        slideAnimation 
    } = useSlideLogic(careerData.length);

    // Effects
    useEffect(() => {
        // 新しいアニメーションキュー項目が追加されたときにトリガー
        animationTrigger();
    }, [animationTrigger]);

    // アニメーションの期間とキューの進行を処理
    useEffect(() => slideAnimation(), [slideAnimation]);

    // エラーハンドリング
    if (!navbarData || !careerTitleData || !careerData || !refData) {
        consoleLog("Careerコンポーネントのデータが不足しています");
        return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />
    }

    return (
        <section 
            className={`w-full ${componentsHeight} bg-lblue`} 
            ref={refData.careerRef}>

            <div className="flex justify-center content-center pt-32 pb-6">
                <Title titleName={navbarData.career_name} />
            </div>

            <div className={`flex max-w-full ${contentsClass} bg-career`}>
                <CareerNavigator 
                    direction="prev"
                    componentClassName=""
                    btnclassName="hidden xl:inline-block p-8"
                    onClick={goToPrevCardIndex} />
                
                <CareerSlideContainer 
                    currentIndex={currentIndex}
                    animationDuration={animationDuration} 
                    careerTitleData={careerTitleData}
                    careerData={careerData} />
                
                <CareerNavigator 
                    direction="next"
                    componentClassName=""
                    btnclassName="hidden xl:inline-block p-8"
                    onClick={goToNextCardIndex} />
            </div>

            <div className={`flex justify-center content-center max-w-full bg-career`}>
                <CareerNavigator 
                    direction="prev"
                    componentClassName="w-full h-full"
                    btnclassName="inline-block xl:hidden p-2 xs:p-4 mt-4 xs:mt-2 mr-4"
                    onClick={goToPrevCardIndex} />

                <CareerIndicator 
                    currentIndex={currentIndex} 
                    careerDataLength={careerData.length} 
                    jumpToCard={jumpToCardIndex} />

                <CareerNavigator 
                    direction="next"
                    componentClassName="w-full h-full"
                    btnclassName="inline-block xl:hidden p-2 xs:p-4 mt-4 xs:mt-2 ml-4"
                    onClick={goToNextCardIndex} />
            </div>
        </section>
    );
};

export default Careers;