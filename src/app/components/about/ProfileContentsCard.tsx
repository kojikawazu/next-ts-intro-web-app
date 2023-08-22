import React from 'react';

import { MESSAGES } from '@/app/shared/constants/constants';
import { useIntroData } from '@/app/contexts/introContext';
import { AboutType } from '@/app/types/AboutType';
import ErrorComponent from '@/app/components/common/ErrorComponent';

/**
 * ProfileContentsカードコンポーネント
 * @returns JSX
 */
const ProfileContentsCard = () => {
  // Context
  const { introData } = useIntroData();

  // エラーハンドリング
  if (!introData || !introData.about_data) {
    return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />
  }

  const aboutData: AboutType = introData.about_data;

  return (
    <div 
      className="p-8 pb-4 text-xs sm:text-sm md:text-base" 
      {...(process.env.NODE_ENV === 'test' ? { "data-testid": "profile-contents-card" } : {})}>
      {aboutData.intro_contents.map((content) => (
          <div 
            key={content}
            className="mb-5 last:mb-0">
              <div>{content}</div>
          </div>
      ))}
    </div>
  );
};

export default ProfileContentsCard;