import React from 'react';
import { Image } from 'next/dist/client/image-component';

/** Propsの型定義 */
type HeroBackgroundProps = {
    url: string,
    alt?: string,
    coverBackgroundColor: string
}

/**
 * ヒーロー背景コンポーネント
 * @returns JSX
 */
const HeroBackground: React.FC<HeroBackgroundProps> = ({
    url,
    alt = "hero background",
    coverBackgroundColor
}) => {
    const className      = "w-full h-[50vh] sssm:h-screen";
    const imageClassName = "w-full h-[50vh] sssm:h-screen";

    return (
        <div className={`relative ${className}`}>
            <Image 
                src={url} 
                alt={alt}
                fill />
            <div className={`absolute top-0 left-0 ${imageClassName} ${coverBackgroundColor}`}></div>
        </div>
    );
};

export default HeroBackground;