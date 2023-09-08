import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateStringProps, validateNumberProps, validateFunctionProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';

/** Propsの型定義 */
type ContactInputProps = {
    inputId: string;
    labelName: string;
    labelStyle: string;
    requireStyle?: string;
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
    requireStyle = "text-red-600",
    isRequired = false,
    children
}) => {
    // Props検証
    const stringError   = validateStringProps([inputId, labelName, labelStyle], MESSAGES.ERRORS.NOT_STRING);
    const errors = [stringError].filter(Boolean);
    if (errors.length > 0) {
        consoleLog(`[ContactInput]: ${errors.join(' ')}`);
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    return (
        <div className="flex justify-center w-full">
            <div className="sssm:flex sssm:justify-center w-full mx-10 mb-6">
                <div className="w-full sssm:w-2/5">
                    <label 
                        htmlFor={inputId}
                        className={`form-label block ${labelStyle}`}>
                        {labelName}
                        {isRequired && <span className={`pr-1 ${requireStyle}`}>*</span>}
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