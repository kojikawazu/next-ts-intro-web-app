import React from 'react';

/** Propsの型定義 */
type ContactInputProps = {
    inputId: string;
    labelName: string;
    labelStyle: string;
    isRequired?: boolean;
    children: React.ReactNode;
}

/**
 * お問い合わせ入力コンポーネント
 * @returns JSX
 */
const ContactInput: React.FC<ContactInputProps> = ({
    inputId,
    labelName,
    labelStyle,
    isRequired = false,
    children
}) => {
  return (
    <div className="flex justify-center w-full">
        <div className="sssm:flex sssm:justify-center w-full mx-10 mb-6">
            <div className="w-full sssm:w-2/5">
                <label 
                    htmlFor={inputId}
                    className={`form-label block ${labelStyle}`}>
                    {labelName}
                    {isRequired && <span className="text-red-600 pr-1">*</span>}
                    :
                </label>
            </div>
            <div className="w-full sssm:w-3/5">
                {children}
            </div>
        </div>
    </div>
  );
};

export default ContactInput;