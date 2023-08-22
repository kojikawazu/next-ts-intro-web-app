import React from 'react'
import { Image } from 'next/dist/client/image-component';
import ProfileCard from '@/app/components/about/ProfileCard';
import ProfileContentsCard from '@/app/components/about/ProfileContentsCard';

/** Propsの型定義 */
type AboutContentsProps = {
    intro_img_url: string;
};

/**
 * AboutContentsコンポーネント
 * @param props 
 * @returns JSX
 */
const AboutContents = (props: AboutContentsProps) => {
    const { intro_img_url } = props;

    return (
        <div className="max-w-full h-[600px]">
            <div className="relative max-w-full h-[400px]">
                <Image 
                    src={intro_img_url} 
                    alt="Profile background image"
                    fill />

                <div className="absolute top-1/4 left-0 lg:left-[20%] w-full lg:w-[60%] h-[500px] bg-white">
                    <div className="lg:flex ">
                        <div className="lg:basis-1/3 w-full">
                            <ProfileCard />
                        </div>

                        <div className="lg:basis-2/3 w-full">
                            <ProfileContentsCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutContents;