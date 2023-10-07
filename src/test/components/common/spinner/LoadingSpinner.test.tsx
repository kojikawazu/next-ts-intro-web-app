import React from 'react';
import { render } from '@testing-library/react';
import { useContactLogic } from '@/app/features/contact/useContactLogic';
import LoadingSpinner from '@/app/components/common/spinner/LoadingSpinner';

/** LoadingSpinnerのテストコード */
describe('<ContactActionSpinner />', () => {

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {
        it('renders spinner as visible when isVisible prop is true', () => {
            const { container } = render( <LoadingSpinner isVisible={true} /> );

            const spinnerComponent = container.firstChild as HTMLElement;
            expect(spinnerComponent).toHaveClass('visible');
        });

        it('renders spinner as invisible when isVisible prop is false', () => {
            const { container } = render( <LoadingSpinner isVisible={false} /> );

            const spinnerComponent = container.firstChild as HTMLElement;
            expect(spinnerComponent).toHaveClass('invisible');
        });

        it('renders spinner as invisible when isVisible prop is not provided', () => {
            const { container } = render( <LoadingSpinner /> );

            const spinnerComponent = container.firstChild as HTMLElement;
            expect(spinnerComponent).toHaveClass('invisible');
        });
    });
});