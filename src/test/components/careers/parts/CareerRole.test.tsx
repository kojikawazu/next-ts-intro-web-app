import React from 'react';
import { render, screen } from '@testing-library/react';
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

    describe('Positive Scenarios', () => {

        test('renders careerTitle correctly', () => {
            expect(screen.getByText(mockCareerTitle)).toBeInTheDocument();
        });

        test('renders careerRole correctly', () => {
            expect(screen.getByText(mockCareerRole)).toBeInTheDocument();
        });

        test('should display a colon between the career title and role', () => {
            const colonElement = screen.getByText(':');
            expect(colonElement).toBeInTheDocument();
        });
    
        test('applies the correct className', () => {
            const careerElement = screen.getByText(mockCareerTitle).parentElement?.parentElement;
            expect(careerElement).toHaveClass(mockClassName);
        });
    });
});