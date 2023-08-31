import React from 'react';

import { MESSAGES } from '@/app/shared/constants/constants';
import { useIntroData } from '@/app/contexts/introContext';
import { NavBarType } from '@/app/types/NavbarType';
import { useScrollTop } from '@/app/hooks/useScroll';
import ErrorComponent from '@/app/components/common/ErrorComponent';
import HamburgerMenu from '@/app/components/navbar/HamburgerMenu';
import NormalMenu from '@/app/components/navbar/NormalMenu';

/**
 * NavBarコンポーネント
 * @returns JSX
 */
const NavBar= () => {
    // Context
    const { introData } = useIntroData();
    // Functions
    const handleScrollTop = useScrollTop();

    // エラーハンドリング
    if (!introData || !introData.navbar_data) {
        return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />
    }

    const navBarData: NavBarType = introData.navbar_data;

    return (
        <div className="flex justify-between items-center bg-lblue w-full h-[100px]">
            <button 
                aria-label="Scroll to top"
                className="text-sm xs:text-2xl sm:text-3xl pl-9 underline decoration-1 decoration-solid underline-offset-8 hover:text-gray-600"
                onClick={handleScrollTop}>
                <h1>{navBarData.link_title}</h1>
            </button>

            <div className="flex justify-end items-center">
                <div className="hidden md:inline-block">
                    <NormalMenu />
                </div>
                <div className="inline-block md:hidden">
                    <HamburgerMenu />
                </div>
            </div>
        </div>
    );
};

export default NavBar;