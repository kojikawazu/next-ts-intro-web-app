import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { MESSAGES } from '@/app/shared/constants/constants';
import { SkillsCardType } from '@/app/types/SkillsType';
import { validatePropsFilter, validateDataProps, validateStringProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';
import { customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';

/** 定数 */
const SKILL_CARD_IMAGE_DEFAULT_SIZE  = 50;
const SKILL_CARD_IMAGE_DEFAULT_SCALE = "10%";
const IMAGE_SCALE_REGEX              = /^\d{1,2}%$/;

/** Propsの型定義 */
type SkillCardProps = {
    skill: SkillsCardType;
    imageAlt?: string;
    imageSize?: number;
    imageScale?: string;
}

/**
 * スキルカードコンポーネント
 * @returns JSX
 */
const SkillCard: React.FC<SkillCardProps> = ({
    skill,
    imageAlt   = "skill_icon",
    imageSize  = SKILL_CARD_IMAGE_DEFAULT_SIZE,
    imageScale = SKILL_CARD_IMAGE_DEFAULT_SCALE
}) => {
    componentStart(SkillCard);

    // エラーハンドリング
    const dataError   = validateDataProps([skill], MESSAGES.ERRORS.NOT_DATA);
    const stringError = validateStringProps([skill.skills_card_icon, skill.skills_card_name, skill.skills_card_contents], MESSAGES.ERRORS.NOT_STRING);
    const errors      = validatePropsFilter([dataError,stringError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(SkillCard, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    // css
    const baseClasses      = ['m-2', 'p-2', 'rounded-2xl'];
    const flexClasses      = ['flex', 'justify-center', 'items-center'];
    const sizeClasses      = ['w-[210px]', 'xs:w-[250px]', 'ssssm:w-[280px]', 'sssm:w-[350px]', 'h-[130px]'];
    const textSizeClasses  = ['text-xxs', 'xxs:text-xs', 'xs:text-xs', 'ssssm:text-sm', 'sssm:text-base'];
    const colorClasses     = ['bg-white', 'text-black'];
    const className        = classNames(baseClasses, flexClasses, sizeClasses, textSizeClasses, colorClasses);
    const imageSizeValue   = (imageSize <= 0 ? SKILL_CARD_IMAGE_DEFAULT_SIZE : imageSize);
    const imageScaleValue  = (IMAGE_SCALE_REGEX.test(imageScale) ? imageScale : SKILL_CARD_IMAGE_DEFAULT_SCALE);

    componentJSX(SkillCard);
    return (
        <div className={`${className}`}>
            <div className="basis-1/3">
                <figure className="flex justify-center items-center">
                    <Image
                        className="m-auto"
                        src={skill.skills_card_icon} 
                        alt={imageAlt}
                        width={imageSizeValue}
                        height={imageSizeValue}
                        sizes={imageScaleValue}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iNTAiIGZpbGw9IiNDRUNFQ0UiLz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgZHk9Ii4zZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiPuODreODvOODh+OCo+ODs+OCsOS4rTwvdGV4dD4KPC9zdmc+" />  
                </figure>
            </div>
            <div className="basis-2/3">
                <div>
                    <h3 className="p-2 pt-0">
                        {skill.skills_card_name}
                    </h3>
                    <p className="pl-2 pr-4">
                        {skill.skills_card_contents}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default React.memo(SkillCard);