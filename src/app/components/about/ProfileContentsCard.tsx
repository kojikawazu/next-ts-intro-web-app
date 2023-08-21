import React from 'react'
import { useIntroData } from '@/app/contexts/introContext';
import { AboutType } from '@/app/types/AboutType';

/**
 * ProfileContentsカードコンポーネント
 * @returns 
 */
const ProfileContentsCard = () => {
  // Context
  const { introData } = useIntroData();
  const aboutData: AboutType = introData!.about_data;

  return (
    <div className="p-8 pb-4">
      {aboutData.intro_contents.map((content, index) => (
          <div key={index}>
              <div>{content}</div>
              <br />
          </div>
      ))}
    </div>
  );
};

export default ProfileContentsCard;