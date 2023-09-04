import React, { ChangeEvent } from 'react';

/** Propsの型定義 */
type ContactFreeTextInputProps = {
    inputId: string;
    inputName: string;
    inputValue: string;
    inputStyle: string;
    rows: number;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
}

/**
 * お問い合わせフリーテキストコンポーネント
 * @returns JSX  
 */
const ContactFreeTextInput: React.FC<ContactFreeTextInputProps> = ({
    inputId,
    inputName,
    inputValue,
    inputStyle,
    rows,
    onChange,
    error
}) => {
    return (
        <>
            <textarea 
                id={inputId}
                name={inputName} 
                className={`form-control ${inputStyle}`} 
                rows={rows}
                onChange={onChange}
                value={inputValue}
                aria-describedby={error ? `${inputId}-error` : undefined} />
            <p id={`${inputId}-error`} className="text-red-500 py-1">{error || '\u00A0'}</p>
        </>
    );
};

export default ContactFreeTextInput;