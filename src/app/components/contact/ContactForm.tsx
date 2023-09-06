import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateStringProps, validateFunctionProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';
import { ContactType } from '@/app/types/ContactType';
import { handleFieldChange } from '@/app/shared/utils/formUtilities';
import { ValidationErrors } from '@/app/features/contact/contactSlice';
import ContactTextInput from '@/app/components/contact/input/ContactTextInput';
import ContactInput from '@/app/components/contact/input/ContactInput';
import ContactFreeTextInput from '@/app/components/contact/input/ContactFreeTextInput';
import ContactButton from '@/app/components/contact/input/ContactButton';

/** Propsの型定義 */
type ContactFormProps = {
    contactData: ContactType;
    contactName: string;
    contactEmail: string;
    contactMessage: string;
    validationErrors: ValidationErrors;
    setContactName: (name: string) => void;
    setContactEmail: (email: string) => void;
    setContactMessage: (contents: string) => void;
    validate: () => boolean;
}

/** 定数 */ 
const LABEL_STYLE = "text-gray-500 font-bold text-sm xs:text-base mb-1 pr-2 sssm:text-right";
const INPUT_STYLE = "w-full sssm:w-11/12 border bg-gray-50 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5";

/**
 * 問い合わせフォームコンポーネント
 * @returns JSX
 */
const ContactForm: React.FC<ContactFormProps> = ({
    contactData,
    contactName,
    contactEmail,
    contactMessage,
    validationErrors,
    setContactName,
    setContactEmail,
    setContactMessage,
    validate
}) => {
    // Props検証
    const functionError = validateFunctionProps([
        setContactName, 
        setContactEmail, 
        setContactMessage, 
        validate], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const stringError   = validateStringProps([
        contactData.contact_name, 
        contactData.contact_email, 
        contactData.contact_contents, 
        contactData.contact_btn_name], MESSAGES.ERRORS.NOT_STRING);
    const errors = [functionError, stringError].filter(e => e !== null);
    if (errors.length > 0) {
        consoleLog(`[ContactForm]: ${errors.join(' ')}`);
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    // actions
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
          // TODO フォームの送信処理をここに書く
        }
    };

    return (
        <form 
            className="p-4"
            onSubmit={handleSubmit}>
            <ContactInput
                inputId="name"
                labelName={contactData.contact_name}
                labelStyle={LABEL_STYLE}
                isRequired={true}>
                    <ContactTextInput
                        inputId="name"
                        inputName="name"
                        inputType="text"
                        inputValue={contactName}
                        inputStyle={INPUT_STYLE}
                        placeholder={contactData.contact_name}
                        onChange={(e) => handleFieldChange(e, setContactName)}
                        error={validationErrors.name} />
            </ContactInput>

            <ContactInput
                inputId="email"
                labelName={contactData.contact_email}
                labelStyle={LABEL_STYLE}
                isRequired={true}>
                    <ContactTextInput
                        inputId="email"
                        inputName="email"
                        inputType="email"
                        inputValue={contactEmail}
                        inputStyle={INPUT_STYLE}
                        placeholder={contactData.contact_email}
                        onChange={(e) => handleFieldChange(e, setContactEmail)}
                        error={validationErrors.email} />
            </ContactInput>

            <ContactInput
                inputId="message"
                labelName={contactData.contact_contents}
                labelStyle={LABEL_STYLE}
                isRequired={true}>
                    <ContactFreeTextInput
                        inputId="message"
                        inputName="message"
                        inputValue={contactMessage}
                        inputStyle={INPUT_STYLE}
                        rows={5}
                        onChange={(e) => handleFieldChange(e, setContactMessage)}
                        error={validationErrors.message} />
            </ContactInput>
            
            <div className="flex justify-center mb-6">
                <ContactButton 
                    btnType="submit"
                    btnName={contactData.contact_btn_name} />
            </div>
        </form>
    );
};

export default ContactForm;