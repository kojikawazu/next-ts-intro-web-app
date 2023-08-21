import React from 'react';
import { Image } from 'next/dist/client/image-component';
import { useIntroData } from '@/app/contexts/introContext';
import { HeroType } from '@/app/types/IntroType';

/**
 * Heroコンポーネント
 * @returns 
 */
const Hero = () => {
  const { introData } = useIntroData();
  const heroData: HeroType = introData!.hero_data;

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