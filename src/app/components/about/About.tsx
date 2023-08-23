import React from 'react';

import { useIntroData } from '@/app/contexts/introContext';
import { NavBarType } from '@/app/types/NavbarType';
import { AboutType } from '@/app/types/AboutType';
import { MESSAGES } from '@/app/shared/constants/constants';

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
        return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />
    }

    const navbarData: NavBarType = introData.navbar_data;
    const aboutData: AboutType = introData.about_data;

    return (
        <div 
            className="w-full h-[1300px] xxs:h-[1200px] xs:h-[1050px] md:h-[1200px] lg:h-[1100px]" 
            ref={refData.aboutRef}>
            
            <div className="flex justify-center items-center pt-32 pb-6">
                <Title titleName={navbarData.about_name} />
            </div>

            <AboutContents intro_img_url={aboutData.intro_img_url} />
        </div>
    );
};

export default About;