import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

/** Propsの型定義 */
type SnsIconLinkProps = {
    url: string;
    imageSrc: string;
    imageAlt?: string;
    imageSize?: number;
    imageClassName?: string; 
}

/** デフォルトサイズ */
const SNS_ICON_DEFAULT_SIZE = 48;

/**
 * SNSアイコンリンクコンポーネント
 * @returns JSX
 */
const SnsIconLink: React.FC<SnsIconLinkProps> = ({
    url,
    imageSrc,
    imageAlt = "SNS icon",
    imageSize = SNS_ICON_DEFAULT_SIZE,
    imageClassName = ""
}) => {
    const iconSize = imageSize <= 0 ? SNS_ICON_DEFAULT_SIZE : imageSize;

    return (
        <Link href={url}>
             <div style={{ position: 'relative', width: iconSize, height: iconSize }}>
                <Image
                    className={`m-auto ${imageClassName}`}
                    src={imageSrc}
                    alt={imageAlt}
                    layout="fill"
                    objectFit="cover" />
            </div>
        </Link>
    );
};

export default SnsIconLink;