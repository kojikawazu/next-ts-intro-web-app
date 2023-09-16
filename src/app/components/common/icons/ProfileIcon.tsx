import React from 'react';
import Image from 'next/image';

/** Propsの型定義 */
type ProfileIconProps = {
    src: string;
    alt: string;
    size?: number;
    className?: string;
}

/** デフォルトサイズ */
const PROFILE_ICON_DEFAULT_SIZE = 48;

/**
 * プロフィールアイコンコンポーネント
 * @returns JSX
 */
const ProfileIcon: React.FC<ProfileIconProps> = ({
    src,
    alt,
    size = PROFILE_ICON_DEFAULT_SIZE,
    className = ""
}) => {
    const imageSize = size <= 0 ? PROFILE_ICON_DEFAULT_SIZE : size;
    
    return (
        <div style={{ position: 'relative', width: imageSize, height: imageSize }}>
            <Image 
                className={`rounded-full ${className}`}
                src={src} 
                alt={alt}
                fill
                sizes={`${imageSize}, ${imageSize}`}
                style={{
                    objectFit: 'cover'
                }}
            />
        </div>
    );
};

export default ProfileIcon;