import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { validatePropsFilter, validateFunctionProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/error/ErrorComponent';
import ScrollTopIcon from '@/app/components/common/icons/ScrollTopIcon';
import { customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';

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
    componentStart(FooterArrowLink);

    // Props検証
    const functionError = validateFunctionProps([onClick], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const errors        = validatePropsFilter([functionError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(FooterArrowLink, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    componentJSX(FooterArrowLink);
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