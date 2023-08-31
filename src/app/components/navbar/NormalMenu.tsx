import React from 'react';

import { MESSAGES } from '@/app/shared/constants/constants';
import { useIntroData } from '@/app/contexts/introContext';
import { NavBarType } from '@/app/types/NavbarType';
import { useScrollToRef } from '@/app/hooks/useScroll';
import ErrorComponent from '@/app/components/common/ErrorComponent';

/**
 * NormalMenuコンポーネント
 * @returns JSX
 */
const NormalMenu = () => {
    // Context
    const { introData, refData } = useIntroData();
    // hooks
    const aboutScrollToRef   = useScrollToRef(refData?.aboutRef);
    const careerScrollToRef  = useScrollToRef(refData?.careerRef);
    const skillsScrollToRef  = useScrollToRef(refData?.skillsRef);
    const contactScrollToRef = useScrollToRef(refData?.contactRef);
    // styles
    const borderColorStyles = "border-black";
    const btnStyles         = "hover:text-gray-500";

    // エラーハンドリング
    if (!introData || !introData.navbar_data || !refData) {
        return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />
    }

    const navBarData: NavBarType = introData.navbar_data;

    return (
        <>
            <div className="flex mt-3 mr-3 border-black">
                <div className={`px-6 border-r ${borderColorStyles}`}>
                    <button
                        type="button"
                        aria-label="Navigate to About section"
                        className={`${btnStyles}`}
                        onClick={aboutScrollToRef}>{navBarData.about_name}</button>
                </div>
                <div className={`px-6 border-r ${borderColorStyles}`}>
                    <button 
                        type="button"
                        aria-label="Navigate to Career section" 
                        className={`${btnStyles}`}
                        onClick={careerScrollToRef}>{navBarData.career_name}</button>
                </div>
                <div className={`px-6 border-r ${borderColorStyles}`}>
                    <button 
                        type="button" 
                        aria-label="Navigate to Skills section"
                        className={`${btnStyles}`}
                        onClick={skillsScrollToRef}>{navBarData.skills_name}</button>
                </div>
                <div className={`px-6 ${borderColorStyles}`}>
                    <button 
                        type="button"
                        aria-label="Navigate to Contact section"
                        className={`${btnStyles}`}
                        onClick={contactScrollToRef}>{navBarData.contact_name}</button>
                </div>
            </div>
        </>
    );
};

export default NormalMenu;