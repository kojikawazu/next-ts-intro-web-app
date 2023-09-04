import React, { ChangeEvent } from 'react';

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