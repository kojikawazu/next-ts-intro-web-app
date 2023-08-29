import React from 'react';
import { render, screen } from '@testing-library/react';
import CareerPeriod from '@/app/components/careers/parts/CareerPeriod';

/** CareerPeriodのテストコード */
describe('<CareerPeriod />', () => {

    const mockCareerTitle = 'Software Engineer Period';
    const mockCareerStart = '01/01/2020';
    const mockCareerEnd   = '12/31/2022';
    const mockClassName   = '';


    /** テストの前準備 */
    beforeEach(() => {
        render(<CareerPeriod careerTitle={mockCareerTitle} careerStart={mockCareerStart} careerEnd={mockCareerEnd} className={mockClassName} />);
    });

    describe('Positive Scenarios', () => {
        
        test('renders careerTitle correctly', () => {
            expect(screen.getByText(mockCareerTitle)).toBeInTheDocument();
        });

        test('renders careerStart correctly', () => {
            expect(screen.getByText(mockCareerStart)).toBeInTheDocument();
        });

        test('renders careerEnd correctly', () => {
            expect(screen.getByText(mockCareerEnd)).toBeInTheDocument();
        });

        test('renders the colon and tilde correctly', () => {
            const colonElement = screen.getByText(':');
            const tildeElement = screen.getByText('~');
            expect(colonElement).toBeInTheDocument();
            expect(tildeElement).toBeInTheDocument();
        });

    });
});