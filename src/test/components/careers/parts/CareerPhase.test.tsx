import React from 'react';
import { render, screen } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import CareerPhase from '@/app/components/careers/parts/CareerPhase';

// Mocks
jest.mock('@/app/components/careers/cards/StackCard', () => {
    return jest.fn(({ stackName }) => <div data-testid="stack-card">{stackName}</div>);
});

/** CareerPhaseのテストコード */
describe('<CareerPhase />', () => {
    
    const mockCareerTitle  = 'Software Engineer Phase';
    const mockCareerPhases = ['Phase 1', 'Phase 2', 'Phase 3'];
    const mockClassName    = 'sample-class';

    /** テストの前準備 */
    beforeEach(() => {
        render(<CareerPhase careerTitle={mockCareerTitle} careerPhases={mockCareerPhases} className={mockClassName} />);
    });

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {
        
        test('renders careerTitle correctly', () => {
            expect(screen.getByText(mockCareerTitle)).toBeInTheDocument();
        });
    
        test('renders the colon after the title', () => {
            expect(screen.getByText(':')).toBeInTheDocument();
        });
    
        test('renders each phase correctly with StackCard component', () => {
            mockCareerPhases.forEach(phase => {
                expect(screen.getByText(phase)).toBeInTheDocument();
                const cardElement = screen.getByText(phase).closest('[data-testid="stack-card"]');
                expect(cardElement).toBeInTheDocument();
            });
        });

        test('applies the correct className', () => {
            const careerElement = screen.getByText(mockCareerTitle).parentElement?.parentElement;
            expect(careerElement).toHaveClass(mockClassName);
        });

        it('applies the default className "flex pb-1" to the div', () => {
            const defaultProps = {
                careerTitle: mockCareerTitle,
                careerPhases: mockCareerPhases
            }

            const {container} = render(<CareerPhase {...defaultProps} />);
            const divElement = container.querySelector('div');
            expect(divElement).toHaveClass("pb-4");
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
                careerPhases: undefined as any
            }

            render(<CareerPhase {...defaultProps} />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
            console.error = originalError;
        });
    });
});