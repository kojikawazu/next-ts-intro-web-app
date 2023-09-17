import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { validatePropsFilter, validateStringProps, validateFunctionProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/error/ErrorComponent';
import { customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';

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
    componentStart(Notification);

    const functionError = validateFunctionProps([onClose], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const stringError   = validateStringProps([message], MESSAGES.ERRORS.NOT_STRING);
    const errors        = validatePropsFilter([functionError, stringError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(Notification, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    const visibilityClass = isVisible ? 'visible' : 'invisible';
    const opacityClass = isFadingOut ? 'opacity-0' : 'opacity-100';

    componentJSX(Notification);
    return (
        <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-4 ${bgColor} text-white rounded transition-opacity duration-500 ${visibilityClass} ${opacityClass}`}>
            {message}
            <button className="ml-2" onClick={onClose}>✕</button>
        </div>
    );
};

export default Notification;