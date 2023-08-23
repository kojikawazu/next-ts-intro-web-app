import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { useIntroData } from '@/app/contexts/introContext';
import { NavBarType } from '@/app/types/NavbarType';
import { FooterType } from '@/app/types/FooterType';
import { useScrollTop } from '@/app/hooks/useScroll';
import ErrorComponent from '@/app/components/common/ErrorComponent';
import FooterLink from '@/app/components/footer/FooterLink';

/**
 * スクロールトップアイコンコンポーネント
 * @returns JSX
 */
const ScrollTopIcon = () => {
    return (
        <svg 
            aria-label="scroll-up-icon"
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            stroke="currentColor" 
            className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
    );
};

/**
 * Footerコンポーネント
 * @returns JSX
 */
const Footer = () => {
    // Context
    const { introData, refData } = useIntroData();
    // hooks
    const scrollTop = useScrollTop();

    // エラーハンドリング
    if (!introData || !introData.navbar_data) {
        return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />
    }

    const navbarData: NavBarType = introData.navbar_data;
    const footerData: FooterType = introData.footer_data;

    return (
        <footer className="w-full h-[190px] sm:h-[240px] bg-footer text-white">
            <div className="flex justify-center">
                <FooterLink linkTitle={navbarData.about_name}   isEnd={false} refData={refData?.aboutRef} />
                <FooterLink linkTitle={navbarData.career_name}  isEnd={false} refData={refData?.careerRef} />
                <FooterLink linkTitle={navbarData.skills_name}  isEnd={false} refData={refData?.skillsRef} />
                <FooterLink linkTitle={navbarData.contact_name} isEnd={true}  refData={refData?.contactRef} />
            </div>

            <div className="flex w-full">
                <div className="basis-1/3">
                    <button 
                        className="pl-8 pt-4"
                        aria-label="Scroll to top" 
                        onClick={scrollTop}>
                        <h4 className="text-sm sm:text-lg">
                            {navbarData.link_title}
                        </h4>
                    </button>
                </div>

                <div className="basis-1/3 flex justify-center">
                    <button 
                        className="mt-24" 
                        aria-label="Scroll to top"
                        onClick={scrollTop}>
                        <ScrollTopIcon />
                    </button>
                </div>
                
                <div className="basis-1/3 flex justify-end">
                    <h4 className="pt-14 pr-10 text-sm sm:text-lg">
                        {footerData.copyright}
                    </h4>
                </div>
            </div>
        </footer>
    );
};

export default Footer;