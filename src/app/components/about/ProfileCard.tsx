import React from 'react';
import { Image } from 'next/dist/client/image-component';
import Link from 'next/link';

import { MESSAGES } from '@/app/shared/constants/constants';
import { useIntroData } from '@/app/contexts/introContext';
import { AboutType } from '@/app/types/AboutType';
import ErrorComponent from '@/app/components/common/ErrorComponent';

/**
 * ProfileCardコンポーネント
 * @returns JSX
 */
const ProfileCard = () => {
    // Context
    const { introData } = useIntroData();

    // エラーハンドリング
    if (!introData || !introData.about_data) {
        return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />
    }

    const aboutData: AboutType = introData.about_data;

    return (
        <div className="flex flex-col justify-center items-center pt-24" 
            {...(process.env.NODE_ENV === 'test' ? { "data-testid": "profile-card" } : {})}>
            <figure className="flex flex-col justify-center items-center">
                <div className="p-4">
                    <Image 
                        className="rounded-full"
                        src={aboutData.intro_icon_url} 
                        alt="about_icon"
                        width={120}
                        height={120} />
                </div>
                <figcaption className="p-2 text-sm sm:text-base md:text-lg">
                    {aboutData.intro_name}
                </figcaption>
            </figure>
            
            <div className="flex p-2">
                <div className="pr-2">
                    <Link href={aboutData.intro_x_url}>
                        <Image
                            className="m-auto"
                            src={aboutData.intro_x_img}
                            alt="skill_icon_x"
                            width={15}
                            height={15} />
                    </Link>
                </div>
                <div>
                    <Link href={aboutData.intro_github_url}>
                        <Image
                            className="m-auto"
                            src={aboutData.intro_github_img}
                            alt="skill_icon_github"
                            width={15}
                            height={15} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;