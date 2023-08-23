import React from 'react';
import { useScrollToRef } from '@/app/hooks/useScroll';

/** Propsの型定義 */
type FooterLinkProps = {
    linkTitle: string;
    isEnd: boolean;
    refData: React.RefObject<HTMLDivElement> | undefined;
}

/**
 * Footerリンクコンポーネント
 * @param props Props
 * @returns JSX
 */
const FooterLink = (props: FooterLinkProps) => {
    const { linkTitle, isEnd, refData } = props;
    // hooks
    const scrollToRef = useScrollToRef(refData);

    const baseStyles = "text-white text-xs sm:text-base lg:text-xl px-5 sm:px-8 mx-1 sm:mx-2 my-4 sm:my-8";
    const conditionalStyles = isEnd ? "" : "border-r";
    const styles = `${baseStyles} ${conditionalStyles}`;
    
    return (
        <div>
            <button 
                className={styles} 
                onClick={scrollToRef}>
                {linkTitle}
            </button>
        </div>
    );
};

export default FooterLink;