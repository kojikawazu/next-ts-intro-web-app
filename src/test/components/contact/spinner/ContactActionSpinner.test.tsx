import React from 'react';
import { render } from '@testing-library/react';
import { useContactLogic } from '@/app/features/contact/useContactLogic';
import ContactActionSpinner from '@/app/components/contact/spinner/ContactActionSpinner';

// useContactLogicをモック化
jest.mock('@/app/features/contact/useContactLogic');

/** ContactActionSpinnerのテストコード */
describe('<ContactActionSpinner />', () => {
    /** テストの前準備 */
    beforeEach(() => {
        (useContactLogic as jest.Mock).mockReturnValue({
            contactStatusStr: 'loading',
        });
    });

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {
        it('renders Notification component with correct props', () => {
            (useContactLogic as jest.Mock).mockReturnValue({
                contactStatusStr: 'loading',
            });

            const { container } = render( <ContactActionSpinner /> );

            const spinnerComponent = container.firstChild as HTMLElement;
            expect(spinnerComponent).toHaveClass('visible');
        });

        it('calls setOffNotificationVisible when onClose is triggered', () => {
            (useContactLogic as jest.Mock).mockReturnValue({
                contactStatusStr: '',
            });

            const { container } = render( <ContactActionSpinner /> );

            const spinnerComponent = container.firstChild as HTMLElement;
            expect(spinnerComponent).toHaveClass('invisible');
        });
    });
});