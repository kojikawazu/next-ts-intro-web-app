import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { validatePropsFilter, validateStringProps, validateFunctionProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/error/ErrorComponent';
import { customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';

/** Propsの型定義 */
type NormalHeaderMenuLinkProps = {
  menuClass?: string;
  ariaLabel: string;
  btnClass?: string;
  onClick: () => void;
  btnLabel: string;
}

/**
 * ノーマルヘッダーメニューリンクコンポーネント
 * @returns JSX
 */
const NormalHeaderMenuLink: React.FC<NormalHeaderMenuLinkProps> = ({
  menuClass = "",
  ariaLabel,
  btnClass = "",
  onClick,
  btnLabel
}) => {
  componentStart(NormalHeaderMenuLink);

  // Props検証
  const functionError = validateFunctionProps([onClick], MESSAGES.ERRORS.NOT_FUNCTIONS);
  const stringError   = validateStringProps([ariaLabel, btnLabel], MESSAGES.ERRORS.NOT_STRING);
  const errors        = validatePropsFilter([functionError, stringError]);
  if (errors.length > 0) {
    const errorJoin = errors.join(' ');
    customLog(NormalHeaderMenuLink, 'error', errorJoin);
    sendLogsToGCF([errorJoin], 'ERROR');
    return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
  }

  componentJSX(NormalHeaderMenuLink);
  return (
    <div className={menuClass}>
        <button
            type="button"
            aria-label={ariaLabel}
            className={btnClass}
            onClick={onClick}>{btnLabel}</button>
    </div>
  );
};

export default NormalHeaderMenuLink;