import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateStringProps, validateRefProps } from '@/app/shared/utils/validateUtilities';
import { useScrollToRef } from '@/app/hooks/useScroll';
import ErrorComponent from '@/app/components/common/ErrorComponent';

/** Propsの型定義 */
type FooterLinkProps = {
    linkTitle: string;
    isEnd: boolean;
    refData: React.RefObject<HTMLDivElement> | undefined;
}

/**
 * Footerリンクコンポーネント
 * @returns JSX
 */
const FooterLink: React.FC<FooterLinkProps> = ({ 
    linkTitle, 
    isEnd, 
    refData 
}) => {
    // hooks
    const scrollToRef = useScrollToRef(refData);

    // Props検証
    const stringError = validateStringProps([linkTitle], MESSAGES.ERRORS.NOT_STRING);
    const refError    = validateRefProps([refData], MESSAGES.ERRORS.NOT_REF);
    const errors = [ stringError, refError ].filter(e => e !== null && e !== undefined);
    if (errors.length > 0) {
        consoleLog(`[FooterLink]: ${errors.join(' ')}`);
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    const baseStyles = "text-white";
    const textStyles = "text-xxs sssm:text-xs sm:text-base md:text-xl";
    const pmStyles   = "px-2 xs:px-3 ssssm:px-5 sm:px-8 mx-1 sm:mx-2 my-4 sm:my-8"; 
    const conditionalStyles = isEnd ? "" : "border-r";
    const styles = `${baseStyles} ${textStyles} ${pmStyles} ${conditionalStyles}`;
    
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