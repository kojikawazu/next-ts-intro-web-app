import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateStringProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';

/** Propsの型定義 */
type ContactButtonProps = {
    btnType?: "button" | "submit";
    btnName: string;
    className?: string;
    onClick?: () => void;
    ariaLabel?: string;
}

function defaultHandler() {}

/**
 * お問い合わせボタンコンポーネント
 * @returns JSX
 */
const ContactButton: React.FC<ContactButtonProps> = ({
    btnType = "submit",
    btnName,
    className = "",
    onClick = defaultHandler,
    ariaLabel
}) => {
  
  // Props検証
  const stringError   = validateStringProps([btnName], MESSAGES.ERRORS.NOT_STRING);
  const errors = [stringError].filter(e => e !== null && e !== undefined);
  if (errors.length > 0) {
    consoleLog(`[ContactButton]: ${errors.join(' ')}`);
    return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
  }

  return (
    <button 
        type={btnType}
        className={`btn btn-primary bg-lblue hover:bg-lblue-btn-hover rounded-xl shadow-lg active:shadow-sm ${className}`}
        onClick={onClick}
        aria-label={ariaLabel || btnName}>
        {btnName}
    </button>
  );
};

export default ContactButton;