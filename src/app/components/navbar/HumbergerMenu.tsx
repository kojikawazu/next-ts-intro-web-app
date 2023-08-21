import React, { useState } from 'react';
import { useIntroData } from '@/app/contexts/introContext';
import { NavBarType } from '@/app/types/NavbarType';
import { useScrollToRef } from '@/app/hooks/useScrol';

/**
 * ハンバーガーメニューコンポーネント
 * @returns JSX
 */
const HumbergerMenu = () => {
    // state
    const [isOpen, setIsOpen] = useState(false);
    // Context
    const { introData, refData } = useIntroData();
    const navBarData: NavBarType = introData!.navbar_data;
    // hooks
    const aboutScrolToRef = useScrollToRef(refData?.aboutRef);
    const careerScrolToRef = useScrollToRef(refData?.careerRef);
    const skillsScrolToRef = useScrollToRef(refData?.skillsRef);
    const contactScrolToRef = useScrollToRef(refData?.contactRef);
    
    // handle
    const handleMenuOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* nav */}
            <nav
                className={
                    isOpen
                    ? "z-40 top-0 text-left fixed bg-lblue left-0 w-full h-screen flex flex-col justify-start pt-24 px-3 ease-linear duration-300"
                    : "z-40 top-[-100%] text-left fixed bg-lblue left-0 w-full h-screen flex flex-col justify-start pt-24 px-3 ease-linear duration-300"
                }
            >
                {/* Close button inside the nav */}
                <div className="absolute top-10 right-10 w-10 h-10">
                    <button 
                        aria-label="closingHumbergerButton"
                        onClick={handleMenuOpen}>
                        <div className="w-10 h-0.5 bg-dblue transform rotate-45"></div>
                        <div className="w-10 h-0.5 bg-dblue transform -rotate-45"></div>
                    </button>
                </div>
                <ul className="">
                    <li 
                        className="flex justify-between content-center border-b-2 border-dashed border-dblue"
                        onClick={() => {
                            aboutScrolToRef();
                            handleMenuOpen();
                        }}>
                        <div className="pl-[125px] py-5 text-2xl inline-block">
                            {navBarData.about_name}
                        </div>
                        {/* 右矢印 */}
                        <div className="pr-2 py-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                    </li>
                    <li 
                        className="flex justify-between content-center border-b-2 border-dashed border-dblue"
                        onClick={() => {
                            careerScrolToRef();
                            handleMenuOpen();
                        }}>
                        <div className="pl-[125px] py-5 text-2xl inline-block">
                            {navBarData.career_name}
                        </div>
                        {/* 右矢印 */}
                        <div className="pr-2 py-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                    </li>
                    <li 
                        className="flex justify-between content-center border-b-2 border-dashed border-dblue"
                        onClick={() => {
                            skillsScrolToRef();
                            handleMenuOpen();
                        }}>
                        <div className="pl-[125px] py-5 text-2xl inline-block">
                            {navBarData.skills_name}
                        </div>
                        {/* 右矢印 */}
                        <div className="pr-2 py-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                    </li>
                    <li 
                        className="flex justify-between content-center border-b-2 border-dashed border-dblue"
                        onClick={() => {
                            contactScrolToRef();
                            handleMenuOpen();
                        }}>
                        <div className="pl-[125px] py-5 text-2xl inline-block">
                            {navBarData.contact_name}
                        </div>
                        {/* 右矢印 */}
                        <div className="pr-2 py-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                    </li>
                </ul>
            </nav>

            {/* humbergerbutton */}
            {!isOpen && (
                <button
                    onClick={handleMenuOpen}
                    type="button"
                    aria-label="openingHumbergerButton"
                    className="z-50 w-10 h-10 space-y-2 mr-7"
                >
                    <div className="w-8 h-0.5 bg-dblue"></div>
                    <div className="w-8 h-0.5 bg-dblue mt-1.5"></div>
                    <div className="w-8 h-0.5 bg-dblue mt-1.5"></div>
                </button>
            )}
        </>
    );
};

export default HumbergerMenu;