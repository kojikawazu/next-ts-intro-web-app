import React from 'react';
import { render, screen } from '@testing-library/react';
import StackCard from '@/app/components/careers/cards/StackCard';

/** StackCardのテストコード */
describe('<StackCard />', () => {
    const mockStackName = 'React';

    /** テストの前準備 */
    beforeEach(() => {
        render(<StackCard stackName={mockStackName} />);
    });

    describe('Positive Scenarios', () => {
        test('renders correctly with given stackName', () => {
            expect(screen.getByText(mockStackName)).toBeInTheDocument();
        });

        test('has the correct styling', () => {
            const element = screen.getByText(mockStackName);
            expect(element).toHaveClass('bg-lblue');
            expect(element).toHaveClass('px-4');
            expect(element).toHaveClass('mx-1');
            expect(element).toHaveClass('my-1');
            expect(element).toHaveClass('rounded-2xl');
        });
    });
});