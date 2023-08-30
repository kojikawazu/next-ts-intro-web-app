import React from 'react';
import { render, screen } from '@testing-library/react';
import CareerMember from '@/app/components/careers/parts/CareerMember';

/** CareerMemberのテストコード */
describe('<CareerMember />', () => {

    const mockCareerTitle  = 'Software Engineer Member';
    const mockCareerDetail = 'Managed a team of 5 developers';
    const mockClassName    = 'sample-class';

    /** テストの前準備 */
    beforeEach(() => {
        render(<CareerMember careerTitle={mockCareerTitle} careerDetail={mockCareerDetail} className={mockClassName} />);
    });

    describe('Positive Scenarios', () => {

        test('renders careerTitle correctly', () => {
            expect(screen.getByText(mockCareerTitle)).toBeInTheDocument();
        });

        test('renders careerDetail correctly', () => {
            expect(screen.getByText(mockCareerDetail)).toBeInTheDocument();
        });

        test('renders the colon between title and detail', () => {
            const colonElement = screen.getByText(':');
            expect(colonElement).toBeInTheDocument();
        });

        test('applies the correct className', () => {
            const careerElement = screen.getByText(mockCareerTitle).parentElement;
            expect(careerElement).toHaveClass(mockClassName);
        });
    });
});