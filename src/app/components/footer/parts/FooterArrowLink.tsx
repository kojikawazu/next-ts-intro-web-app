import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateFunctionProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';
import ScrollTopIcon from '@/app/components/common/icons/ScrollTopIcon';

/** Propsの型定義 */
type FooterArrowLinkProps = {
    className?: string;
    ariaLabel?: string;
    onClick: () => void;
    icon?: React.ReactNode;
}

/**
 * Footer矢印リンクコンポーネント
 * @returns JSX
 */
const FooterArrowLink: React.FC<FooterArrowLinkProps> = ({
    className = "",
    ariaLabel = "footer arrow link",
    onClick,
    icon = <ScrollTopIcon />
}) => {
    // Props検証
    const functionError = validateFunctionProps([onClick], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const errors = [functionError].filter(e => e !== null && e !== undefined);
    if (errors.length > 0) {
        consoleLog(`[FooterArrowLink]: ${errors.join(' ')}`);
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    return (
        <button 
            className={className}
            aria-label={ariaLabel}
            onClick={onClick}>
            {icon}
        </button>
    );
};

export default FooterArrowLink;