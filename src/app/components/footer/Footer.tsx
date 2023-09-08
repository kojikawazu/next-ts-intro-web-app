import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { useIntroData } from '@/app/contexts/introContext';
import { NavBarType } from '@/app/types/NavbarType';
import { FooterType } from '@/app/types/FooterType';
import { useScrollTop } from '@/app/hooks/useScroll';
import ErrorComponent from '@/app/components/common/ErrorComponent';
import FooterArrowLink from '@/app/components/footer/parts/FooterArrowLink';
import FooterLink from '@/app/components/footer/parts/FooterLink';
import FooterCopyRight from '@/app/components/footer/parts/FooterCopyRight';
import FooterTitleBtn from '@/app/components/footer/parts/FooterTitleBtn';

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
                    <FooterTitleBtn 
                        className="pl-1 xxs:pl-2 xs:pl-4 ssssm:pl-8 sssm:pl-16 pt-4"
                        onClick={scrollTop}
                        labelClassName="text-xxs sssm:text-xs ssm:text-sm sm:text-lg"
                        label={navbarData.link_title} />
                </div>

                <div className="basis-1/3 flex justify-center">
                    <FooterArrowLink 
                         className="mt-24"
                         onClick={scrollTop} />
                </div>
                
                <div className="basis-1/3 flex justify-end">
                    <FooterCopyRight    
                        className="pt-14 pr-1 xxs:pr-2 xs:pr-4 ssssm:pr-8 sssm:pr-16 ssm:pr-20 text-xxs sssm:text-xs ssm:text-sm sm:text-lg"
                        label={footerData.copyright} />
                </div>
            </div>
        </footer>
    );
};

export default Footer;