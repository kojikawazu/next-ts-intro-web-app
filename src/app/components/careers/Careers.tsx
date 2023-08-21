import React from 'react';
import Title from '../common/Title';
import { useIntroData } from '@/app/contexts/introContext';
import { NavBarType } from '@/app/types/NavbarType';
import CareerCard from './CareerCard';

/**
 * Careerコンポーネント
 * @returns JSX
 */
const Careers = () => {
    // Context
    const { introData, refData } = useIntroData();
    const navbarData: NavBarType = introData!.navbar_data;

    return (
        <div className="w-full h-[1300px] bg-lblue" ref={refData?.careerRef}>
            <div className="flex justify-center content-center pt-32 pb-6">
                <Title titleName={navbarData.career_name} />
            </div>

            <div className="flex max-w-full h-[1015px] bg-career">
                <div className="basis-1/5"></div>
                <div className="basis-3/5">
                    <CareerCard />
                </div>
                <div className="basis-1/5"></div>
            </div>
        </div>
    );
};

export default Careers;