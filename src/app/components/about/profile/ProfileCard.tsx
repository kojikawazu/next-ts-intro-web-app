import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { AboutType } from '@/app/types/AboutType';
import { validatePropsFilter, validateDataProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/error/ErrorComponent';
import { customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';
import ProfileStandardCard from '@/app/components/about/profile/ProfileStandardCard';
import ProfileContentsCard from '@/app/components/about/profile/ProfileContentsCard';

/** Propsの型定義 */
type ProfileCardProps = {
    profileData: AboutType;
};

/**
 * プロフィールカードコンポーネント
 * @returns JSX
 */
const ProfileCard: React.FC<ProfileCardProps> = ({
    profileData
}) => {
    componentStart(ProfileCard);

    // Propsの検証
    const dataError = validateDataProps([profileData], MESSAGES.ERRORS.NOT_DATA);
    const errors    = validatePropsFilter([dataError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(ProfileCard, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    componentJSX(ProfileCard);
    return (
        <div className="lg:flex">
            <div className="lg:basis-1/3 w-full">
                <ProfileStandardCard profileData={profileData} />
            </div>

            <div className="lg:basis-2/3 w-full">
                <ProfileContentsCard profileContents={profileData.about_contents} />
            </div>
        </div>
    );
};

export default ProfileCard;