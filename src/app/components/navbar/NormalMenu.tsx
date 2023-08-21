import React from 'react';
import { useIntroData } from '@/app/contexts/introContext';
import { NavBarType } from '@/app/types/NavbarType';
import { useScrollToRef } from '@/app/hooks/useScroll';

/**
 * ノーマルメニューコンポーネント
 * @returns JSX
 */
const NormalMenu = () => {
    // Context
    const { introData, refData } = useIntroData();
    const navBarData: NavBarType = introData!.navbar_data;

    // hooks
    const aboutScrolToRef = useScrollToRef(refData?.aboutRef);
    const careerScrolToRef = useScrollToRef(refData?.careerRef);
    const skillsScrolToRef = useScrollToRef(refData?.skillsRef);
    const contactScrolToRef = useScrollToRef(refData?.contactRef);

    return (
        <>
            <div className="flex mt-3 mr-3">
                <div className="px-6 border-r border-black">
                    <button onClick={aboutScrolToRef}>{navBarData.about_name}</button>
                </div>
                <div className="px-6 border-r border-black">
                    <button onClick={careerScrolToRef}>{navBarData.career_name}</button>
                </div>
                <div className="px-6 border-r border-black">
                    <button onClick={skillsScrolToRef}>{navBarData.skills_name}</button>
                </div>
                <div className="px-6">
                    <button onClick={contactScrolToRef}>{navBarData.contact_name}</button>
                </div>
            </div>
        </>
    );
};

export default NormalMenu;