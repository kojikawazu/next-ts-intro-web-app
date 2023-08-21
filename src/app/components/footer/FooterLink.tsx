import React from 'react';
import { useScrollToRef } from '@/app/hooks/useScrol';

/** Propsの型定義 */
type Props = {
    linkTitle: string;
    isEnd: Boolean;
    refData: React.RefObject<HTMLDivElement> | undefined;
}

/**
 * Footerリンクコンポーネント
 * @param props Props
 * @returns JSX
 */
const FooterLink = (props: Props) => {
    const { linkTitle, isEnd, refData } = props;
    // hooks
    const scrolToRef = useScrollToRef(refData);

    const styles = (isEnd 
        ? "text-white text-xs sm:text-base lg:text-xl px-5 sm:px-8 mx-1 sm:mx-2 my-4 sm:my-8"
        : "text-white text-xs sm:text-base lg:text-xl px-5 sm:px-8 mx-1 sm:mx-2 my-4 sm:my-8 border-r"
    );
    
    return (
        <div>
            <button 
                className={styles} 
                onClick={scrolToRef!}>
                {linkTitle}
            </button>
        </div>
    );
};

export default FooterLink;