import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateStringProps, validateFunctionProps, validateData } from '@/app/shared/utils/validateUtilities';
import { useIntroData } from '@/app/contexts/introContext';
import Title from '@/app/components/common/Title';
import ErrorComponent from '@/app/components/common/ErrorComponent';
import ContactForm from '@/app/components/contact/ContactForm';
import { useContactLogic } from '@/app/features/contact/useContactLogic';

/**
 * Contactコンポーネント
 * @returns JSX
 */
const Contact = () => {
    // Context
    const { introData, refData } = useIntroData();
    // hooks(Redux toolkit)
    const {
        name: contactName, 
        email: contactEmail, 
        message: contactMessage,
        validationErrors,
        setName: setContactName,
        setEmail: setContactEmail,
        setMessage: setContactMessage,
        validate
     } = useContactLogic();


     // Props検証
     if (!introData || !refData) {
        return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />;
    }
    const functionError = validateFunctionProps([
        setContactName, 
        setContactEmail, 
        setContactMessage, 
        validate], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const dataError = validateData([
        introData.navbar_data,
        introData.contact_data,
    ], MESSAGES.ERRORS.NOT_DATA);
    const stringError   = validateStringProps([
        introData.contact_data.contact_name ?? "", 
        introData.contact_data.contact_email ?? "", 
        introData.contact_data.contact_contents ?? "", 
        introData.contact_data.contact_btn_name ?? ""], MESSAGES.ERRORS.NOT_STRING);
    const errors = [functionError, dataError, stringError].filter(e => e !== null);
    if (errors.length > 0) {
        consoleLog(`[Contact]: ${errors.join(' ')}`);
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }
    
    const {navbar_data: navbarData, contact_data: contactData} = introData;
    return (
        <div 
            className="w-cfull bg-white" 
            ref={refData.contactRef}>
            <div className="flex justify-center content-center pt-32 pb-6">
                <Title titleName={navbarData.contact_name} />
            </div>

            <div className="pb-10">
                <ContactForm 
                    contactData={contactData}
                    contactName={contactName}
                    contactEmail={contactEmail}
                    contactMessage={contactMessage}
                    validationErrors={validationErrors}
                    setContactName={setContactName}
                    setContactEmail={setContactEmail}
                    setContactMessage={setContactMessage}
                    validate={validate} />
            </div> 
        </div>
    );
};

export default Contact;