import React from 'react';
import { render, screen } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import CareerStacks from '@/app/components/careers/parts/CareerStacks';

// Mocks
jest.mock('@/app/components/careers/cards/StackCard', () => {
    return jest.fn(({ stackName }) => <div data-testid="stack-card">{stackName}</div>);
});

/** CareerStacksのテストコード */
describe('<CareerStacks />', () => {
    
    const mockCareerTitle  = 'Software Engineer Stacks';
    const mockCareerStacks = ['Stack 1', 'Stack 2', 'Stack 3'];
    const mockClassName    = 'sample-class';

    /** テストの前準備 */
    beforeEach(() => {
        render(<CareerStacks careerTitle={mockCareerTitle} careerStacks={mockCareerStacks} className={mockClassName} />);
    });

    describe('Positive Scenarios', () => {
        
        it('renders careerTitle correctly', () => {
            expect(screen.getByText(mockCareerTitle)).toBeInTheDocument();
        });
    
        it('renders the colon after the title', () => {
            expect(screen.getByText(':')).toBeInTheDocument();
        });
    
        it('renders each technology stack correctly with StackCard component', () => {
            mockCareerStacks.forEach(stack => {
                expect(screen.getByText(stack)).toBeInTheDocument();
                const cardElement = screen.getByText(stack).closest('[data-testid="stack-card"]');
                expect(cardElement).toBeInTheDocument();
            });
        });

        it('applies the correct className', () => {
            const careerElement = screen.getByText(mockCareerTitle).parentElement?.parentElement;
            expect(careerElement).toHaveClass(mockClassName);
        });

        it('applies the default className "pb-4" to the div', () => {
            const defaultProps = {
                careerTitle: mockCareerTitle,
                careerStacks: mockCareerStacks
            }

            const {container} = render(<CareerStacks {...defaultProps} />);
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
                careerStacks: undefined as any
            }

            render(<CareerStacks {...defaultProps} />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
        });
    });
});