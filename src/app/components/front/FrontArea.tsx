import React from 'react';
import CareerDialogArea from '@/app/components/careers/dialog/CareerDialogArea';
import ContactSendNotification from '@/app/components/contact/notice/ContactSendNotification';
import ContactActionSpinner from '@/app/components/contact/spinner/ContactActionSpinner';

/**
 * 最前面エリアコンポーネント
 * @returns JSX
 */
const FrontArea = () => {
    return (
        <>
            <CareerDialogArea />
            <ContactActionSpinner />
            <ContactSendNotification />
        </>
    );
};

export default FrontArea;