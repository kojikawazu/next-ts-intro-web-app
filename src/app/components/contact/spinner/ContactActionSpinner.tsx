import React from 'react';
import { useContactLogic } from '@/app/features/contact/useContactLogic';
import LoadingSpinner from '@/app/components/common/spinner/LoadingSpinner';

/**
 * お問い合わせ実行用スピナーコンポーネント
 * @returns JSX
 */
const ContactActionSpinner = () => {
    // hooks(Redux toolkit)
    const {
        contactStatusStr
    } = useContactLogic();
    const isVisible = contactStatusStr === 'loading';

    return (
        <LoadingSpinner isVisible={isVisible} />
    );
};

export default ContactActionSpinner;