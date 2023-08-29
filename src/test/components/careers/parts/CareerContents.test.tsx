import React from 'react';
import { render, screen } from '@testing-library/react';
import CareerContents from '@/app/components/careers/parts/CareerContents';

/** CareerContentsのテストコード */
describe('<CareerContents />', () => {

    const mockCareerTitle       = 'Software Engineer Contents';
    const mockCareerDescription = 'Developed various web applications.';
    const mockClassName         = '';

    /** テストの前準備 */
    beforeEach(() => {
        render(<CareerContents careerTitle={mockCareerTitle} careerDescription={mockCareerDescription} className={mockClassName} />);
    });

    describe('Positive Scenarios', () => {
        
        test('renders careerTitle and careerDescription correctly', () => {
            expect(screen.getByText(mockCareerTitle)).toBeInTheDocument();
            expect(screen.getByText(mockCareerDescription)).toBeInTheDocument();
        });

        test('renders the colon between title and description', () => {
            const colonElement = screen.getByText(':');
            expect(colonElement).toBeInTheDocument();
        });

    });
});