import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateStringProps, validateFunctionProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';

/** Propsの型定義 */
type NotificationProps = {
    isVisible?: boolean;
    isFadingOut?: boolean;
    bgColor?: string;
    message: string;
    onClose: () => void
}

/**
 * 通知コンポーネント 
 * @returns JSX
 */
const Notification: React.FC<NotificationProps> = ({
    isVisible = false,
    isFadingOut = false,
    bgColor = 'bg-green-500',
    message,
    onClose
}) => {
    const functionError = validateFunctionProps([onClose], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const stringError   = validateStringProps([message], MESSAGES.ERRORS.NOT_STRING);
    const errors = [functionError, stringError].filter(e => e !== null && e !== undefined);
    if (errors.length > 0) {
        consoleLog(`[Notification]: ${errors.join(' ')}`);
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    const visibilityClass = isVisible ? 'visible' : 'invisible';
    const opacityClass = isFadingOut ? 'opacity-0' : 'opacity-100';
    return (
        <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-4 ${bgColor} text-white rounded transition-opacity duration-500 ${visibilityClass} ${opacityClass}`}>
            {message}
            <button className="ml-2" onClick={onClose}>✕</button>
        </div>
    );
};

export default Notification;