import React, { ChangeEvent } from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateStringProps, validateFunctionProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';

/** Propsの型定義 */
type ContactFreeTextInputProps = {
    inputId: string;
    inputName: string;
    inputValue: string;
    inputStyle: string;
    errorStyle?: string;
    rows?: number;
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
    errorStyle = "text-red-500",
    rows = 5,
    onChange,
    error
}) => {
    // Props検証
    const functionError = validateFunctionProps([onChange], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const stringError   = validateStringProps([inputId, inputName, inputStyle], MESSAGES.ERRORS.NOT_STRING);
    const errors = [functionError, stringError].filter(e => e !== null && e !== undefined);
    if (errors.length > 0) {
        consoleLog(`[ContactFreeTextInput]: ${errors.join(' ')}`);
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

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
            <p id={`${inputId}-error`} className={`py-1 ${errorStyle}`}>{error || '\u00A0'}</p>
        </>
    );
};

export default ContactFreeTextInput;