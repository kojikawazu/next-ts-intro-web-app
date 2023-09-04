import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog, isEnvTest } from '@/app/shared/utils/utilities';
import { AboutType } from '@/app/types/AboutType';
import ErrorComponent from '@/app/components/common/ErrorComponent';
import SnsIconLink from '@/app/components/common/icons/SnsIconLink';
import ProfileIcon from '../common/icons/ProfileIcon';

/** Propsの型定義 */
type ProfileCardProps = {
    profileData: AboutType;
    profileIconSize?: number;
    snsIconSize?: number;
}

/** 不明な名前 */
const NO_NAME = "unknown name";

/**
 * ProfileCardコンポーネント
 * @returns JSX
 */
const ProfileCard: React.FC<ProfileCardProps> = ({
    profileData,
    profileIconSize = 120,
    snsIconSize = 15
}) => {
    // エラーハンドリング
    if (!profileData.about_icon_url || !profileData.about_img_url ||
        !Array.isArray(profileData.sns_list) || profileData.sns_list.length === 0) {
        consoleLog("[ProfileCard]: " + MESSAGES.ERRORS.DATA_ERROR);
        return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />
    }
    const profileClassName = "text-sm sm:text-base md:text-lg";
    
    return (
        <div className="flex flex-col justify-center items-center pt-24" 
            {...(isEnvTest() ? { "data-testid": "profile-card" } : {})}>
            <figure className="flex flex-col justify-center items-center">
                <div className="p-4">
                    <ProfileIcon 
                        src={profileData.about_icon_url} 
                        alt="profile_icon"
                        size={profileIconSize} />
                </div>
                <figcaption className={`p-2 ${profileClassName}`}>
                    {profileData.about_name || NO_NAME}
                </figcaption>
            </figure>
            
            <div className="flex p-2">
                {profileData.sns_list.map((sns, index) => {
                    const snsClassName =  index !== profileData.sns_list.length - 1 ? "pr-2" : "";

                    return (
                        <div 
                            className={snsClassName}
                            key={sns.sns_name + index}>
                            <SnsIconLink
                                url={sns.sns_url}
                                imageSrc={sns.sns_img}
                                imageAlt={sns.sns_name + "_image"}
                                imageSize={snsIconSize}
                                imageClassName="hover:bg-gray-100" />
                        </div>
                    );  
                })}
            </div>
        </div>
    );
};

export default ProfileCard;