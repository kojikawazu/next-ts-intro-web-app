import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { useIntroData } from '@/app/contexts/introContext';
import ErrorComponent from '@/app/components/common/ErrorComponent';
import { customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';
import Title from '@/app/components/common/Title';
import AboutContents from '@/app/components/about/AboutContents';

/**
 * Aboutコンポーネント
 * @returns JSX
 */
const About = () => {
    componentStart(About);

    // Context
    const { introData, refData } = useIntroData();

    // エラーハンドリング
    if (!introData || !introData.about_data || !refData) {
        const errorJoin = MESSAGES.ERRORS.DATA_ERROR;
        customLog(About, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />
    }

    const { navbar_data: navbarData, about_data: aboutData } = introData;

    componentJSX(About);
    return (
        <div 
            className="w-full" 
            ref={refData.aboutRef}>
            
            <div className="flex justify-center items-center pt-32 pb-6">
                <Title 
                    titleName={navbarData.about_name} />
            </div>

            <AboutContents 
                aboutData={aboutData} />
        </div>
    );
};

export default About;