import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { useIntroData } from '@/app/contexts/introContext';
import ErrorComponent from '@/app/components/common/ErrorComponent';
import HeroBackground from './background/HeroBackground';

/**
 * Heroコンポーネント
 * @returns JSX
 */
const Hero = () => {
  // context
  const { introData } = useIntroData();

  // エラーハンドリング
  if (!introData || !introData.hero_data) {
    consoleLog("[Hero]: " + MESSAGES.ERRORS.DATA_ERROR);
    return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />
  }
  const heroData = introData.hero_data;

  return (
    <HeroBackground 
      url={heroData.hero_img_url}
      alt="hero_background"
      coverBackgroundColor="bg-hero" />
  );
};

export default Hero;