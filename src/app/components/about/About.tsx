import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { useIntroData } from '@/app/contexts/introContext';
import ErrorComponent from '@/app/components/common/ErrorComponent';
import Title from '@/app/components/common/Title';
import AboutContents from '@/app/components/about/AboutContents';

/**
 * Aboutコンポーネント
 * @returns JSX
 */
const About = () => {
    // Context
    const { introData, refData } = useIntroData();

    // エラーハンドリング
    if (!introData || !introData.about_data || !refData) {
        consoleLog("[About]: " + MESSAGES.ERRORS.DATA_ERROR);
        return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />
    }
    const { navbar_data: navbarData, about_data: aboutData } = introData;

    return (
        <div 
            className="w-full" 
            ref={refData.aboutRef}>
            
            <div className="flex justify-center items-center pt-32 pb-6">
                <Title titleName={navbarData.about_name} />
            </div>

            <AboutContents 
                aboutData={introData.about_data}
                introImgUrl={aboutData.about_img_url} />
        </div>
    );
};

export default About;