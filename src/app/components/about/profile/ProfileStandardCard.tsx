import React from 'react';
import classNames from 'classnames';
import { MESSAGES } from '@/app/shared/constants/constants';
import { AboutType } from '@/app/types/AboutType';
import { isEnvTest } from '@/app/shared/utils/utilities';
import { validatePropsFilter, validateStringProps, validateArraysProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/error/ErrorComponent';
import { customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';
import SnsIconLink from '@/app/components/common/icons/SnsIconLink';
import ProfileIcon from '@/app/components/common/icons/ProfileIcon';

/** Propsの型定義 */
type ProfileStandardCardProps = {
    profileData: AboutType;
    profileIconSize?: number;
    snsIconSize?: number;
}

/** 不明な名前 */
const NO_NAME = "unknown name";

/**
 * ProfileStandardCardコンポーネント
 * @returns JSX
 */
const ProfileStandardCard: React.FC<ProfileStandardCardProps> = ({
    profileData,
    profileIconSize = 120,
    snsIconSize = 15
}) => {
    componentStart(ProfileStandardCard);

    // Props検証
    const stringError = validateStringProps([profileData.about_icon_url, profileData.about_img_url], MESSAGES.ERRORS.NOT_STRING);
    const arrayError  = validateArraysProps([profileData.sns_list], MESSAGES.ERRORS.NOT_ARRAYS)
    const errors      = validatePropsFilter([stringError, arrayError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(ProfileStandardCard, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    const textStyles       = ["text-sm", "sm:text-base", "md:text-lg"];
    const profileClassName = classNames(textStyles);
    
    componentJSX(ProfileStandardCard);
    return (
        <div className="flex flex-col justify-center items-center pt-24" 
            {...(isEnvTest() ? { "data-testid": "profile-standard-card" } : {})}>
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

export default ProfileStandardCard;