import React from 'react';
import { useIntroData } from '@/app/contexts/introContext';
import { NavBarType } from '@/app/types/NavbarType';
import { useScrollTop } from '@/app/hooks/useScroll';
import HumbergerMenu from './HumbergerMenu';
import NormalMenu from './NormalMenu';

/**
 * MavBarコンポーネント
 * @returns JSX
 */
const NavBar= () => {
    const { introData } = useIntroData();
    const navBarData: NavBarType = introData!.navbar_data;

    return (
        <div className="flex justify-between items-center bg-lblue w-full h-[100px]">
            <button 
                className="text-sm xs:text-2xl sm:text-3xl pl-9 underline decoration-1 decoration-solid underline-offset-8"
                onClick={useScrollTop}>
                <h1>{navBarData.link_title}</h1>
            </button>

            <div className="flex justify-end items-center">
                <div className="hidden md:inline-block">
                    <NormalMenu />
                </div>
                <div className="inline-block md:hidden">
                    <HumbergerMenu />
                </div>
            </div>
        </div>
    );
};

export default NavBar;