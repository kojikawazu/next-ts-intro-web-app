import React from 'react';
import { Image } from 'next/dist/client/image-component';
import { MESSAGES } from '@/app/shared/constants/constants';
import { useIntroData } from '@/app/contexts/introContext';
import { HeroType } from '@/app/types/IntroType';
import ErrorComponent from '@/app/components/common/ErrorComponent';

/**
 * Heroコンポーネント
 * @returns JSX
 */
const Hero = () => {
  // context
  const { introData } = useIntroData();

  // エラーハンドリング
  if (!introData || !introData.hero_data) {
    return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />
  }
  const heroData: HeroType = introData.hero_data;

  return (
    <div className='relative max-w-full h-screen'>
      <Image 
        src={heroData.hero_img_url} 
        alt="hero_background"
        fill />
      <div className='absolute top-0 left-0 w-full h-screen bg-hero'></div>
    </div>
  );
};

export default Hero;