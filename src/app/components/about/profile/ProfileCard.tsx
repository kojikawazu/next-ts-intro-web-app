import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { AboutType } from '@/app/types/AboutType';
import { validateData } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';
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
    // Propsの検証
    const dataError = validateData([profileData], MESSAGES.ERRORS.NOT_DATA);
    const errors = [dataError].filter(e => e !== null && e !== undefined);
    if (errors.length > 0) {
        consoleLog(`[ProfileCard]: ${errors.join(' ')}`);
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

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