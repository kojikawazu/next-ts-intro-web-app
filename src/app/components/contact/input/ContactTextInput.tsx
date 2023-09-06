import React, { ChangeEvent } from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateStringProps, validateFunctionProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';

/** Propsの型定義 */
type ContactTextInputProps = {
    inputId: string;
    inputName: string;
    inputType: string;
    inputValue: string;
    inputStyle: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

/**
 * お問い合わせテキストコンポーネント
 * @returns JSX 
 */
const ContactTextInput: React.FC<ContactTextInputProps> = ({
    inputId,
    inputName,
    inputType,
    inputValue,
    inputStyle,
    placeholder,
    onChange,
    error
}) => {
  // Props検証
  const functionError = validateFunctionProps([onChange], MESSAGES.ERRORS.NOT_FUNCTIONS);
  const stringError   = validateStringProps([inputId, inputName, inputType, inputStyle, placeholder], MESSAGES.ERRORS.NOT_STRING);
  const errors = [functionError, stringError].filter(e => e !== null && e !== undefined);
  if (errors.length > 0) {
      consoleLog(`[ContactTextInput]: ${errors.join(' ')}`);
      return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
  }

  return (
    <>
        <input 
            id={inputId}
            name={inputName} 
            type={inputType}
            className={`form-control ${inputStyle}`} 
            placeholder={placeholder} 
            onChange={onChange}
            value={inputValue}
            aria-describedby={error ? `${inputId}-error` : undefined} />
        <p id={`${inputId}-error`} className="text-red-500 py-1">{error || '\u00A0'}</p>
    </>
  );
};

export default ContactTextInput;