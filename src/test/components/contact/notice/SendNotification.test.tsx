import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useContactLogic } from '@/app/features/contact/useContactLogic';
import SendNotification from '@/app/components/contact/notice/ContactSendNotification';

// useContactLogicをモック化
jest.mock('@/app/features/contact/useContactLogic');

/** SendNotificationのテストコード */
describe('<SendNotification />', () => {
    /** テストの前準備 */
    beforeEach(() => {
        (useContactLogic as jest.Mock).mockReturnValue({
            isNotificationVisible: true,
            isFadingOut: false,
            setOffNotificationVisible: jest.fn()
        });
    });

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {
        it('renders Notification component with correct props', () => {
            render( <SendNotification /> );

            const notificationComponent = screen.getByText('送信しました！');
            expect(notificationComponent).toBeInTheDocument();
            expect(notificationComponent).toHaveClass('visible');
            expect(notificationComponent).toHaveClass('opacity-100');
            expect(notificationComponent).toHaveClass('bg-green-500');
        });

        it('calls setOffNotificationVisible when onClose is triggered', () => {
            const mockSetOffNotificationVisible = jest.fn();

            (useContactLogic as jest.Mock).mockReturnValue({
                isNotificationVisible: true,
                isFadingOut: false,
                setOffNotificationVisible: mockSetOffNotificationVisible
            });

            render( <SendNotification /> );

            const notificationComponent = screen.getByText('✕');
            fireEvent.click(notificationComponent);
            expect(mockSetOffNotificationVisible).toHaveBeenCalled();
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Negative Scenarios', () => {
        it('renders failure notification with correct props', () => {
            (useContactLogic as jest.Mock).mockReturnValue({
                isNotificationVisible: true,
                isFadingOut: false,
                contactStatusStr: 'failed',
                setOffNotificationVisible: jest.fn()
            });

            render( <SendNotification /> );

            const notificationComponent = screen.getByText('送信に失敗しました');
            expect(notificationComponent).toBeInTheDocument();
            expect(notificationComponent).toHaveClass('visible');
            expect(notificationComponent).toHaveClass('opacity-100');
            expect(notificationComponent).toHaveClass('bg-red-500');
        });

        it('renders default notification when failure message env variable is missing', () => {
            (useContactLogic as jest.Mock).mockReturnValue({
                isNotificationVisible: true,
                isFadingOut: false,
                contactStatusStr: 'failed',
                setOffNotificationVisible: jest.fn()
            });
            delete process.env.NEXT_PUBLIC_NOTICE_FAILED;

            render( <SendNotification /> );

            const notificationComponent = screen.getByText('notice');
            expect(notificationComponent).toBeInTheDocument();
            expect(notificationComponent).toHaveClass('visible');
            expect(notificationComponent).toHaveClass('opacity-100');
            expect(notificationComponent).toHaveClass('bg-red-500');
        });
    });
});