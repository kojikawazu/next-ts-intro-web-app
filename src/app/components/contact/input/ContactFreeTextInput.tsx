import React, { ChangeEvent } from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateStringProps, validateNumberProps, validateFunctionProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';

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
    // Props検証
    const functionError = validateFunctionProps([onChange], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const numberError   = validateNumberProps([rows], MESSAGES.ERRORS.NOT_NUMBERS);
    const stringError   = validateStringProps([inputId, inputName, inputStyle], MESSAGES.ERRORS.NOT_STRING);
    const errors = [functionError, numberError, stringError].filter(e => e !== null && e !== undefined);
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
            <p id={`${inputId}-error`} className="text-red-500 py-1">{error || '\u00A0'}</p>
        </>
    );
};

export default ContactFreeTextInput;