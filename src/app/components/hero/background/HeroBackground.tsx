import React from 'react';
import Image from 'next/image';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateStringProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';

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
    // Propsの検証
    const stringError = validateStringProps([url, coverBackgroundColor], MESSAGES.ERRORS.NOT_STRING);
    const errors = [stringError].filter(e => e !== null && e !== undefined);
    if (errors.length > 0) {
        consoleLog(`[HeroBackground]: ${errors.join(' ')}`);
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

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