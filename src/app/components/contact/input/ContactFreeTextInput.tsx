import React, { ChangeEvent } from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { validatePropsFilter, validateStringProps, validateFunctionProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';
import { customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';

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
    componentStart(ContactFreeTextInput);

    // Props検証
    const functionError = validateFunctionProps([onChange], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const stringError   = validateStringProps([inputId, inputName, inputStyle], MESSAGES.ERRORS.NOT_STRING);
    const errors        = validatePropsFilter([functionError, stringError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(ContactFreeTextInput, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    componentJSX(ContactFreeTextInput);
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