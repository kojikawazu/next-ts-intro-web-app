import React from 'react'
import Image from 'next/image';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { AboutType } from '@/app/types/AboutType';
import ErrorComponent from '@/app/components/common/ErrorComponent';
import ProfileCard from '@/app/components/about/ProfileCard';
import ProfileContentsCard from '@/app/components/about/ProfileContentsCard';

/** Propsの型定義 */
type AboutContentsProps = {
    aboutData: AboutType;
    introImgUrl: string;
};

/**
 * AboutContentsコンポーネント
 * @returns JSX
 */
const AboutContents: React.FC<AboutContentsProps> = ({
    aboutData,
    introImgUrl
}) => {
    // エラーハンドリング
    if (!aboutData || !introImgUrl) {
        consoleLog("[AboutContents]: " + MESSAGES.ERRORS.DATA_ERROR);
        return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />
    }

    const className      = "w-full h-[1000px] xs:h-[900px] ssssm:h-[800px] md:h-[900px] lg:h-[800px]";
    const childClassName = "w-full h-[400px]";
    const innerClassname = "w-full lg:w-[60%] h-[500px]";

    return (
        <div className={`${className}`}>
            <div className={`relative ${childClassName}`}>
                <Image 
                    src={introImgUrl} 
                    alt="Profile background image"
                    fill />

                <div className={`absolute top-1/4 left-0 lg:left-[20%] bg-white ${innerClassname}`}>
                    <div className="lg:flex">
                        <div className="lg:basis-1/3 w-full">
                            <ProfileCard profileData={aboutData} />
                        </div>

                        <div className="lg:basis-2/3 w-full">
                            <ProfileContentsCard profileContents={aboutData.about_contents} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutContents;