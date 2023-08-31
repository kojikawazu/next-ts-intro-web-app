import React, { useState } from 'react';

import { MESSAGES } from '@/app/shared/constants/constants';
import { useIntroData } from '@/app/contexts/introContext';
import { useScrollToRef } from '@/app/hooks/useScroll';
import ErrorComponent from '@/app/components/common/ErrorComponent';

/**
 * 矢印サブコンポーネント
 * @returns JSX
 */
const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

/**
 * ハンバーガーメニューコンポーネント
 * @returns JSX
 */
const HamburgerMenu = () => {
    // state
    const [isOpen, setIsOpen] = useState(false);
    // Context
    const { introData, refData } = useIntroData();
    // hooks
    const aboutScrollToRef = useScrollToRef(refData?.aboutRef);
    const careerScrollToRef = useScrollToRef(refData?.careerRef);
    const skillsScrollToRef = useScrollToRef(refData?.skillsRef);
    const contactScrollToRef = useScrollToRef(refData?.contactRef);
    // CSS
    const navClass = 
        `z-40 top-0 text-left fixed bg-lblue left-0 w-full h-screen flex flex-col justify-start pt-24 px-3 ease-linear duration-300 
        ${isOpen ? '' : 'top-[-100%]'}`;
    // Item
    const navItems = [
        { action: aboutScrollToRef,   label: introData?.navbar_data.about_name },
        { action: careerScrollToRef,  label: introData?.navbar_data.career_name },
        { action: skillsScrollToRef,  label: introData?.navbar_data.skills_name },
        { action: contactScrollToRef, label: introData?.navbar_data.contact_name }
    ];
    
    // handle
    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
    };

    // エラーハンドリング
    if (!introData || !introData.navbar_data || !refData) {
        return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />
    }

    return (
        <>
            {/* nav */}
            <nav className={navClass}>
                <div className="absolute top-10 right-10 w-10 h-10">
                    <button 
                        role="button"
                        aria-label="メニューを閉じる"
                        onClick={toggleMenu}>
                        <div className="w-10 h-0.5 bg-dblue transform rotate-45"></div>
                        <div className="w-10 h-0.5 bg-dblue transform -rotate-45"></div>
                    </button>
                </div>
                <ul 
                    className=""
                    role="menu">
                        {navItems.map((item) => (
                            <li 
                                key={item.label} 
                                role="menuitem"
                                className="flex justify-between content-center border-b-2 border-dashed border-dblue hover:bg-hoverdblue" 
                                onClick={() => {
                                    item.action();
                                    toggleMenu();
                                }}>
                                <div className="pl-10 xs:pl-20 ssm:pl-32 py-5 text-2xl inline-block">
                                    {item.label}
                                </div>
                                <div className="pr-8 py-5">
                                    <ArrowIcon />
                                </div>
                            </li>
                        ))}
                </ul>
            </nav>

            {/* humbergerbutton */}
            {!isOpen && (
                <button
                    role="button"
                    type="button"
                    onClick={toggleMenu}
                    aria-label="メニューを開く"
                    className="z-50 w-10 h-10 space-y-2 mr-7">
                    <div className="w-8 h-0.5 bg-dblue "></div>
                    <div className="w-8 h-0.5 bg-dblue mt-1.5"></div>
                    <div className="w-8 h-0.5 bg-dblue mt-1.5"></div>
                </button>
            )}
        </>
    );
};

export default HamburgerMenu;