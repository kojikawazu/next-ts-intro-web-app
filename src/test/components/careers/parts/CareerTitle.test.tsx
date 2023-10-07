import React from 'react';
import { render, screen } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import CareerTitle from '@/app/components/careers/parts/CareerTitle';

/** CareerTitleのテストコード */
describe('<CareerTitle />', () => {

    const mockCareerTitle = 'Software Engineer Title';
    const mockClassName   = 'sample-class';

    /** テストの前準備 */
    beforeEach(() => {
        render(<CareerTitle careerTitle={mockCareerTitle} className={mockClassName} />);
    });

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {

        it('renders careerTitle correctly', () => {
            const titleElement = screen.getByText(mockCareerTitle);
            expect(titleElement).toBeInTheDocument();
            expect(titleElement.tagName).toBe('H3'); 
            expect(titleElement).toHaveClass('text-xxs xs:text-xs md:text-xl underline decoration-1 decoration-solid underline-offset-8');
        });

        it('applies the correct className', () => {
            const careerElement = screen.getByText(mockCareerTitle).parentElement;
            expect(careerElement).toHaveClass(mockClassName);
        });

        it('applies the default className "flex" to the div', () => {
            const defaultProps = {
                careerTitle: mockCareerTitle
            }

            const {container} = render(<CareerTitle {...defaultProps} />);
            const divElement = container.querySelector('div');
            expect(divElement).toHaveClass("flex");
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Negative Scenarios', () => {
        it('renders error message for missing props', () => {
            const originalError = console.error;
            console.error = () => {};
            const defaultProps = {
                careerTitle: undefined as any
            }

            render(<CareerTitle {...defaultProps} />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
            console.error = originalError;
        });
    });
});