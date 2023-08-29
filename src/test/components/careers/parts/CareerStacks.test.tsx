import React from 'react';
import { render, screen } from '@testing-library/react';
import CareerStacks from '@/app/components/careers/parts/CareerStacks';

// Mocks
jest.mock('@/app/components/careers/cards/StackCard', () => {
    return jest.fn(({ stackName }) => <div data-testid="stack-card">{stackName}</div>);
});

/** CareerStacksのテストコード */
describe('<CareerStacks />', () => {
    
    const mockCareerTitle  = 'Software Engineer Stacks';
    const mockCareerStacks = ['Stack 1', 'Stack 2', 'Stack 3'];
    const mockClassName    = '';

    /** テストの前準備 */
    beforeEach(() => {
        render(<CareerStacks careerTitle={mockCareerTitle} careerStacks={mockCareerStacks} className={mockClassName} />);
    });

    describe('Positive Scenarios', () => {
        
        test('renders careerTitle correctly', () => {
            expect(screen.getByText(mockCareerTitle)).toBeInTheDocument();
        });
    
        test('renders the colon after the title', () => {
            expect(screen.getByText(':')).toBeInTheDocument();
        });
    
        test('renders each technology stack correctly with StackCard component', () => {
            mockCareerStacks.forEach(stack => {
                expect(screen.getByText(stack)).toBeInTheDocument();
                const cardElement = screen.getByText(stack).closest('[data-testid="stack-card"]');
                expect(cardElement).toBeInTheDocument();
            });
        });

    });
});