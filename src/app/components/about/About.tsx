import React from 'react';
import { Image } from 'next/dist/client/image-component';
import Title from '../common/Title';
import { useIntroData } from '@/app/contexts/introContext';
import { NavBarType } from '@/app/types/NavbarType';
import { AboutType } from '@/app/types/AboutType';
import ProfileCard from './ProfileCard';
import ProfileContentsCard from './ProfileContentsCard';


/**
 * Aboutコンポーネント
 * @returns 
 */
const About = () => {
    // Context
    const { introData, refData } = useIntroData();
    const navbarData: NavBarType = introData!.navbar_data;
    const aboutData: AboutType = introData!.about_data;

    return (
        <div className="w-full h-[1100px]" ref={refData?.aboutRef}>
            <div className="flex justify-center content-center pt-32 pb-6">
                <Title titleName={navbarData.about_name} />
            </div>

            <div className="max-w-full h-[600px]">
                <div className="relative max-w-full h-[400px]">
                    <Image 
                        src={aboutData.intro_img_url} 
                        alt="about_background"
                        fill />

                    <div className="absolute top-1/4 left-[20%] w-[60%] h-[500px]">
                        <div className="flex bg-white">
                            <div className="basis-1/3 bg-white w-full">
                                <ProfileCard />
                            </div>

                            <div className="basis-2/3 bg-white w-full">
                                <ProfileContentsCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;