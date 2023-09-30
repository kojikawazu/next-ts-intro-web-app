import React from 'react';
import classNames from 'classnames';
import { MESSAGES } from '@/app/shared/constants/constants';
import { useIntroData } from '@/app/contexts/introContext';
import { useScrollTop, useScrollToRef } from '@/app/hooks/useScroll';
import ErrorComponent from '@/app/components/common/error/ErrorComponent';
import { customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';
import NavBarTitle from '@/app/components/navbar/title/NavBarTitle';
import HamburgerMenu from '@/app/components/navbar/HamburgerMenu';
import NormalMenu from '@/app/components/navbar/NormalMenu';

/**
 * NavBarコンポーネント
 * @returns JSX
 */
const NavBar = () => {
    componentStart(NavBar);

    // Context
    const { introData, refData } = useIntroData();
    // Functions
    const handleScrollTop    = useScrollTop();
    // hooks
    const aboutScrollToRef   = useScrollToRef(refData?.aboutRef);
    const careerScrollToRef  = useScrollToRef(refData?.careerRef);
    const skillsScrollToRef  = useScrollToRef(refData?.skillsRef);
    const contactScrollToRef = useScrollToRef(refData?.contactRef);
    
    // エラーハンドリング
    if (!introData || !introData.navbar_data || !refData) {
        const errorJoin = MESSAGES.ERRORS.DATA_ERROR;
        customLog(NavBar, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />
    }

    const { about_name, career_name, skills_name, contact_name, link_title } = introData.navbar_data;
    const menuList = [
        { label: about_name,   ariaLabel: "About",   action: aboutScrollToRef },
        { label: career_name,  ariaLabel: "Career",  action: careerScrollToRef },
        { label: skills_name,  ariaLabel: "Skills",  action: skillsScrollToRef },
        { label: contact_name, ariaLabel: "Contact", action: contactScrollToRef }
    ];

    const baseClass       = ["sticky", "top-0", "z-50", "h-[100px]"];
    const flexClass       = ["flex", "justify-between", "items-center"];
    const backgroundClass = ["bg-lblue"];
    const className       = classNames(baseClass, flexClass, backgroundClass);

    const navBarBaseClass            = ["pl-9"];
    const navBarTitleUnderLineClass  = ["underline", "decoration-1", "decoration-solid", "underline-offset-8"];
    const navBarTitleTextClass       = ["text-sm", "xs:text-2xl", "sm:text-3xl"];
    const navBarTitleBackgroundClass = ["hover:text-gray-600"];
    const navBarTitleClass           = classNames(navBarBaseClass, navBarTitleUnderLineClass, navBarTitleTextClass, navBarTitleBackgroundClass);

    const navBarAriaLabel = "Scroll to top";

    componentJSX(NavBar);
    return (
        <div className={className}>
            <NavBarTitle 
                ariaLabel={navBarAriaLabel}
                btnClass={navBarTitleClass}
                onClick={handleScrollTop}
                label={link_title} /> 

            <div className="flex justify-end items-center">
                <div className="hidden md:inline-block">
                    <NormalMenu menuList={menuList} />
                </div>
                
                <div className="inline-block md:hidden">
                    <HamburgerMenu 
                        menuList={menuList}
                        navBarTitleAriaLabel={navBarAriaLabel}
                        navBarTitleBtnClass={navBarTitleClass}
                        navBarTitleOnClick={handleScrollTop}
                        navBarTitleLabel={link_title} />
                </div>
            </div>
        </div>
    );
};

export default NavBar;