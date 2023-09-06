import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateStringProps, validateFunctionProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';

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
  // Props検証
  const functionError = validateFunctionProps([onClick], MESSAGES.ERRORS.NOT_FUNCTIONS);
  const stringError   = validateStringProps([ariaLabel, btnLabel], MESSAGES.ERRORS.NOT_STRING);
  const errors = [functionError, stringError].filter(e => e !== null && e !== undefined);
  if (errors.length > 0) {
      consoleLog(`[NormalHeaderMenuLink]: ${errors.join(' ')}`);
      return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
  }

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