import React from 'react';
import { render, screen } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import Notification from '@/app/components/common/notice/Notification';

/** Notificationのテストコード */
describe('<Notification />', () => {
    const defaultFunction = () => {

    }

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {
        it('renders visible fading out Notification with given message and color', () => {
            const props = {
                isVisible: true,
                isFadingOut: true,
                bgColor: "bg-green-500",
                message: "メッセージ",
                onClose: defaultFunction
            };
            render( <Notification {...props} /> );

            const notificationComponent = screen.getByText('メッセージ');
            expect(notificationComponent).toBeInTheDocument();
            expect(notificationComponent).toHaveClass('visible');
            expect(notificationComponent).toHaveClass('opacity-0');
            expect(notificationComponent).toHaveClass('bg-green-500');
        });

        it('renders invisible Notification with given message and color', () => {
            const props = {
                isVisible: false,
                isFadingOut: false,
                bgColor: "bg-green-500",
                message: "メッセージ",
                onClose: defaultFunction
            };
            render( <Notification {...props} /> );

            const notificationComponent = screen.getByText('メッセージ');
            expect(notificationComponent).toBeInTheDocument();
            expect(notificationComponent).toHaveClass('invisible');
            expect(notificationComponent).toHaveClass('opacity-100');
            expect(notificationComponent).toHaveClass('bg-green-500');
        });

        it('renders Notification with default visibility and color', () => {
            const props = {
                message: "メッセージ",
                onClose: defaultFunction
            };
            render( <Notification {...props} /> );

            const notificationComponent = screen.getByText('メッセージ');
            expect(notificationComponent).toBeInTheDocument();
            expect(notificationComponent).toHaveClass('invisible');
            expect(notificationComponent).toHaveClass('opacity-100');
            expect(notificationComponent).toHaveClass('bg-green-500');
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Negative Scenarios', () => {
        it('displays an error when no message is provided', () => {
            const props = {
                message: "",
                onClose: defaultFunction
            };
            render( <Notification {...props} /> );
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
        });
    });
});