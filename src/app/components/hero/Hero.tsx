import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { useIntroData } from '@/app/contexts/introContext';
import ErrorComponent from '@/app/components/common/ErrorComponent';
import { customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';
import HeroBackground from './background/HeroBackground';

/**
 * Heroコンポーネント
 * @returns JSX
 */
const Hero = () => {
  componentStart(Hero);

  // context
  const { introData } = useIntroData();

  // エラーハンドリング
  if (!introData || !introData.hero_data) {
    const errorJoin = MESSAGES.ERRORS.DATA_ERROR;
    customLog(Hero, 'error', errorJoin);
    sendLogsToGCF([errorJoin], 'ERROR');
    return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />
  }

  const heroData = introData.hero_data;

  componentJSX(Hero);
  return (
    <HeroBackground 
      url={heroData.hero_img_url}
      alt="hero_background"
      coverBackgroundColor="bg-hero" />
  );
};

export default Hero;