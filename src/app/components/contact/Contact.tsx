import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/consoleLog';
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
    
    // エラーハンドリング
    if (!introData?.navbar_data || !introData?.contact_data || !refData) {
        consoleLog("Contactコンポーネントのデータが不足しています");
        return <ErrorComponent errorData={MESSAGES.ERRORS.DATA_LOADING} />
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