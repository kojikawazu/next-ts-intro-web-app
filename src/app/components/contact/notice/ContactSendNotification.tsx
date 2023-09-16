import React from 'react';
import { useContactLogic } from '@/app/features/contact/useContactLogic';
import { componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import Notification from '@/app/components/common/notice/Notification';

/**
 * 送信通知コンポーネント
 * @returns JSX
 */
const ContactSendNotification = () => {
    componentStart(ContactSendNotification);

    // hooks(Redux toolkit)
    const {
        contactStatusStr,
        isNotificationVisible,
        isFadingOut,
        setOffNotificationVisible
    } = useContactLogic();
    const bgColor = contactStatusStr === 'failed' ? 'bg-red-500' : 'bg-green-500';
    const notice  = ((contactStatusStr === 'failed' ? process.env.NEXT_PUBLIC_NOTICE_FAILED : process.env.NEXT_PUBLIC_NOTICE_SUCCESSED) || "notice") as string;

    componentJSX(ContactSendNotification);
    return (
        <Notification
            isVisible={isNotificationVisible}
            isFadingOut={isFadingOut}
            bgColor={bgColor}
            message={notice}
            onClose={setOffNotificationVisible} />
    );
};

export default ContactSendNotification;