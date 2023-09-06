import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateStringProps, validateFunctionProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';

/** Propsの型定義 */
type ContactButtonProps = {
    btnType?: "button" | "submit";
    btnName: string;
    className?: string;
    onClick?: () => void;
    ariaLabel?: string;
}

/**
 * お問い合わせボタンコンポーネント
 * @returns JSX
 */
const ContactButton: React.FC<ContactButtonProps> = ({
    btnType = "submit",
    btnName,
    className = "",
    onClick,
    ariaLabel
}) => {
  // Props検証
  //const functionError = validateFunctionProps([onClick], MESSAGES.ERRORS.NOT_FUNCTIONS);
  const stringError   = validateStringProps([btnName], MESSAGES.ERRORS.NOT_STRING);
  const errors = [stringError].filter(e => e !== null && e !== undefined);
  if (errors.length > 0) {
    consoleLog(`[ContactButton]: ${errors.join(' ')}`);
    return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
  }

  return (
    <button 
        type={btnType}
        className={`btn btn-primary bg-lblue p-3 w-3/4 ssm:w-[350px] h-[60px] rounded-xl shadow-lg ${className}`}
        onClick={onClick}
        aria-label={ariaLabel || btnName}>
        {btnName}
    </button>
  );
};

export default ContactButton;