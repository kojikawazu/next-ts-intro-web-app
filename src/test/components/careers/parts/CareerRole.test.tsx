import React from 'react';
import { render, screen } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import CareerRole from '@/app/components/careers/parts/CareerRole';

/** CareerRoleのテストコード */
describe('<CareerRole />', () => {

    const mockCareerTitle = 'Software Engineer Role';
    const mockCareerRole  = 'role samples';
    const mockClassName   = 'sample-class';

    /** テストの前準備 */
    beforeEach(() => {
        render(<CareerRole careerTitle={mockCareerTitle} careerRole={mockCareerRole} className={mockClassName} />);
    });

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {

        it('renders careerTitle correctly', () => {
            expect(screen.getByText(mockCareerTitle)).toBeInTheDocument();
        });

        it('renders careerRole correctly', () => {
            expect(screen.getByText(mockCareerRole)).toBeInTheDocument();
        });

        it('should display a colon between the career title and role', () => {
            const colonElement = screen.getByText(':');
            expect(colonElement).toBeInTheDocument();
        });
    
        it('applies the correct className', () => {
            const careerElement = screen.getByText(mockCareerTitle).parentElement?.parentElement;
            expect(careerElement).toHaveClass(mockClassName);
        });

        it('applies the default className "pb-4" to the div', () => {
            const defaultProps = {
                careerTitle: mockCareerTitle,
                careerRole: mockCareerRole
            }

            const {container} = render(<CareerRole {...defaultProps} />);
            const divElement = container.querySelector('div');
            expect(divElement).toHaveClass("pb-4");
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Negative Scenarios', () => {
        it('renders error message for missing props', () => {
            const originalError = console.error;
            console.error = () => {};
            const defaultProps = {
                careerTitle: undefined as any,
                careerRole: undefined as any
            }

            render(<CareerRole {...defaultProps} />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
            console.error = originalError;
        });
    });
});