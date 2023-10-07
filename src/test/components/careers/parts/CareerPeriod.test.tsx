import React from 'react';
import { render, screen } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import CareerPeriod from '@/app/components/careers/parts/CareerPeriod';

/** CareerPeriodのテストコード */
describe('<CareerPeriod />', () => {

    const mockCareerTitle = 'Software Engineer Period';
    const mockCareerStart = '01/01/2020';
    const mockCareerEnd   = '12/31/2022';
    const mockClassName   = 'sample-class';

    /** テストの前準備 */
    beforeEach(() => {
        render(<CareerPeriod careerTitle={mockCareerTitle} careerStart={mockCareerStart} careerEnd={mockCareerEnd} className={mockClassName} />);
    });

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {
        
        it('renders careerTitle correctly', () => {
            expect(screen.getByText(mockCareerTitle)).toBeInTheDocument();
        });

        it('renders careerStart correctly', () => {
            expect(screen.getByText(mockCareerStart)).toBeInTheDocument();
        });

        it('renders careerEnd correctly', () => {
            expect(screen.getByText(mockCareerEnd)).toBeInTheDocument();
        });

        it('renders the colon and tilde correctly', () => {
            const colonElement = screen.getByText(':');
            const tildeElement = screen.getByText('~');
            expect(colonElement).toBeInTheDocument();
            expect(tildeElement).toBeInTheDocument();
        });

        it('applies the given className to the parent element', () => {
            const careerElement = screen.getByText(mockCareerTitle).parentElement;
            expect(careerElement).toHaveClass(mockClassName);
        });

        it('applies the default className "flex pb-1" to the div', () => {
            const defaultProps = {
                careerTitle: mockCareerTitle,
                careerStart: mockCareerStart,
                careerEnd: mockCareerEnd
            }

            const {container} = render(<CareerPeriod {...defaultProps} />);
            const divElement = container.querySelector('div');
            expect(divElement).toHaveClass("flex pb-1");
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
                careerStart: undefined as any,
                careerEnd: undefined as any
            }

            render(<CareerPeriod {...defaultProps} />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
            console.error = originalError;
        });
    });
});