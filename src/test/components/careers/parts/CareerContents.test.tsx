import React from 'react';
import { render, screen } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import CareerContents from '@/app/components/careers/parts/CareerContents';

/** CareerContentsのテストコード */
describe('<CareerContents />', () => {

    const mockCareerTitle       = 'Software Engineer Contents';
    const mockCareerDescription = 'Developed various web applications.';
    const mockClassName         = 'sample-class';

    /** テストの前準備 */
    beforeEach(() => {
        render(<CareerContents 
            careerTitle={mockCareerTitle} 
            careerDescription={mockCareerDescription} 
            className={mockClassName} />);
    });

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {
        
        it('renders careerTitle correctly', () => {
            expect(screen.getByText(mockCareerTitle)).toBeInTheDocument();
        });

        it('renders careerDescription correctly', () => {
            expect(screen.getByText(mockCareerDescription)).toBeInTheDocument();
        });

        it('renders the colon between title and description', () => {
            const colonElement = screen.getByText(':');
            expect(colonElement).toBeInTheDocument();
        });

        it('applies the correct className', () => {
            const careerElement = screen.getByText(mockCareerTitle).parentElement?.parentElement;
            expect(careerElement).toHaveClass(mockClassName);
        });

        it('applies the default className', () => {
            const defaultProps = {
                careerTitle: mockCareerTitle, 
                careerDescription: mockCareerDescription 
            }

            const { container } = render(<CareerContents 
                {...defaultProps} />);

            const divElement = container.querySelector('div');
            expect(divElement).toHaveClass("pb-4");
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Negative Scenarios', () => {
        it('renders error message for missing props', () => {
            const defaultProps = {
                careerTitle: undefined as any,
                careerDescription: undefined as any,
                className: mockClassName
            }
            render(<CareerContents {...defaultProps} />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
        });
    });
});