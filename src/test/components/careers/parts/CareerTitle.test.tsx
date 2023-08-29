import React from 'react';
import { render, screen } from '@testing-library/react';
import CareerTitle from '@/app/components/careers/parts/CareerTitle';

/** CareerTitleのテストコード */
describe('<CareerTitle />', () => {

    const mockCareerTitle = 'Software Engineer Title';
    const mockClassName   = '';

    /** テストの前準備 */
    beforeEach(() => {
        render(<CareerTitle careerTitle={mockCareerTitle} className={mockClassName} />);
    });

    describe('Positive Scenarios', () => {

        test('renders careerTitle correctly', () => {
            const titleElement = screen.getByText(mockCareerTitle);
            expect(titleElement).toBeInTheDocument();
            expect(titleElement.tagName).toBe('H3'); 
            expect(titleElement).toHaveClass('text-xxs xs:text-xs md:text-xl underline decoration-1 decoration-solid underline-offset-8');
        });
    
    });
});