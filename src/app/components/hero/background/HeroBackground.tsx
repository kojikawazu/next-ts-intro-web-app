import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { MESSAGES } from '@/app/shared/constants/constants';
import { validatePropsFilter, validateStringProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';
import { customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';

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
    componentStart(HeroBackground);

    // Propsの検証
    const stringError = validateStringProps([url, coverBackgroundColor], MESSAGES.ERRORS.NOT_STRING);
    const errors      = validatePropsFilter([stringError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(HeroBackground, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    const className      = classNames(["w-full", "h-[50vh]", "sssm:h-screen"]);
    const imageClassName = classNames(["w-full", "h-[50vh]", "sssm:h-screen"]);

    componentJSX(HeroBackground);
    return (
        <div className={`relative ${className}`} >
            <Image 
                src={url} 
                alt={alt}
                fill />
            <div className={`absolute top-0 left-0 ${imageClassName} ${coverBackgroundColor}`}></div>
        </div>
    );
};

export default HeroBackground;