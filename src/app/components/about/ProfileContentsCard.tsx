import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';
import { isEnvTest } from '@/app/shared/utils/utilities';

/** Propsの型定義 */
type ProfileContentsCardProps = {
  profileContents: Array<string>;
}

/**
 * ProfileContentsカードコンポーネント
 * @returns JSX
 */
const ProfileContentsCard: React.FC<ProfileContentsCardProps> = ({
  profileContents,
}) => {
  // エラーハンドリング
  if (!Array.isArray(profileContents) || profileContents.length === 0) {
      consoleLog("[ProfileContentsCard]: " + MESSAGES.ERRORS.DATA_ERROR);
      return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />
  }
  const className = "text-xs sm:text-sm md:text-base";

  return (
    <div className={`p-8 pb-4 ${className}`}
      {...(isEnvTest() ? { "data-testid": "profile-contents-card" } : {})}>
      {profileContents.map((content, index) => (
          <div 
            key={index}
            className="mb-5 last:mb-0">
              <div>{content}</div>
          </div>
      ))}
    </div>
  );
};

export default ProfileContentsCard;