import React from 'react'
import Image from 'next/image';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { AboutType } from '@/app/types/AboutType';
import { validateData } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';
import ProfileCard from '@/app/components/about/profile/ProfileCard';

/** Propsの型定義 */
type AboutContentsProps = {
    aboutData: AboutType;
};

/**
 * AboutContentsコンポーネント
 * @returns JSX
 */
const AboutContents: React.FC<AboutContentsProps> = ({
    aboutData
}) => {
    // Propsの検証
    const dataError = validateData([aboutData], MESSAGES.ERRORS.NOT_DATA);
    const errors = [dataError].filter(e => e !== null && e !== undefined);
    if (errors.length > 0) {
        consoleLog(`[AboutContents]: ${errors.join(' ')}`);
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    const className      = "w-full h-[1000px] xs:h-[900px] ssssm:h-[800px] md:h-[900px] lg:h-[800px]";
    const childClassName = "w-full h-[400px]";
    const innerClassname = "w-full lg:w-[60%] h-[500px]";

    return (
        <div className={className}>
            <div className={`relative ${childClassName}`}>
                <Image 
                    src={aboutData.about_img_url} 
                    alt="Profile background image"
                    fill />

                <div className={`absolute top-1/4 left-0 lg:left-[20%] bg-white ${innerClassname}`}>
                   <ProfileCard profileData={aboutData} />
                </div>
            </div>
        </div>
    );
};

export default AboutContents;