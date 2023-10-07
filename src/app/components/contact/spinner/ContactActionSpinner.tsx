import React from 'react';
import { useContactLogic } from '@/app/features/contact/useContactLogic';
import { componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import LoadingSpinner from '@/app/components/common/spinner/LoadingSpinner';

/**
 * お問い合わせ実行用スピナーコンポーネント
 * @returns JSX
 */
const ContactActionSpinner = () => {
    componentStart(ContactActionSpinner);

    // hooks(Redux toolkit)
    const {
        contactStatusStr
    } = useContactLogic();
    const isVisible = contactStatusStr === 'loading';

    componentJSX(ContactActionSpinner);
    return (
        <LoadingSpinner isVisible={isVisible} />
    );
};

export default ContactActionSpinner;