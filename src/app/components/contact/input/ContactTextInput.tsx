import React, { ChangeEvent } from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validatePropsFilter, validateStringProps, validateFunctionProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';
import { customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';

/** Propsの型定義 */
type ContactTextInputProps = {
    inputId: string;
    inputName: string;
    inputType: string;
    inputValue: string;
    inputStyle: string;
    errorStyle?: string;
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
    errorStyle = "text-red-500",
    placeholder,
    onChange,
    error
}) => {
    componentStart(ContactTextInput);

    // Props検証
    const functionError = validateFunctionProps([onChange], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const stringError   = validateStringProps([inputId, inputName, inputType, inputStyle, placeholder], MESSAGES.ERRORS.NOT_STRING);
    const errors        = validatePropsFilter([functionError, stringError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(ContactTextInput, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    componentJSX(ContactTextInput);
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
            <p id={`${inputId}-error`} className={`py-1 ${errorStyle}`}>{error || '\u00A0'}</p>
        </>
    );
};

export default ContactTextInput;