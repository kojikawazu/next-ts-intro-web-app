import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import Navigator from '@/app/components/common/slides/Navigator';

// Mocks
jest.mock('@/app/components/common/icons/ArrowIcon', () => { 
    return jest.fn(props => <div data-testid="arrow-icon">OK</div>)
});

/** Navigatorのテストコード */
describe('<Navigator />', () => {
    let mockClickHandler: jest.Mock;
    const mockDirection = 'prev';
    const mockComponentClassName = '';
    const mockBtnclassName       = '';

    /** テストの前準備 */
    beforeEach(() => {
        mockClickHandler = jest.fn();
    });

    describe('Direction "prev" Scenario', () => {
        
        /** テストの前準備 */
        beforeEach(() => {
            render(
                <Navigator 
                    direction={mockDirection} 
                    onClick={mockClickHandler} 
                    componentClassName={mockComponentClassName} 
                    btnclassName={mockBtnclassName} />);
        });

        describe('Positive Scenarios', () => {
            it('renders ArrowIcon with correct angleCSS for "prev"', () => {
                const icon = screen.getByTestId('arrow-icon');
                expect(icon).toBeInTheDocument();
            });

            it('fires onClick handler when clicked', () => {
                const button = screen.getByRole('button', { name: /Previous/i });
                fireEvent.click(button);
                expect(mockClickHandler).toHaveBeenCalledTimes(1);
            });
        });
    });

    describe('Direction "next" Scenario', () => {

        /** テストの前準備 */
        beforeEach(() => {
            render(
                <Navigator 
                    direction="next" 
                    onClick={mockClickHandler} 
                    componentClassName={mockComponentClassName} 
                    btnclassName={mockBtnclassName} />);
        });

        describe('Positive Scenarios', () => {
            it('renders ArrowIcon with correct angleCSS for "next"', () => {
                const icon = screen.getByTestId('arrow-icon');
                expect(icon).toBeInTheDocument();
            });

            it('fires onClick handler when clicked', () => {
                const button = screen.getByRole('button', { name: /Next/i });
                fireEvent.click(button);
                expect(mockClickHandler).toHaveBeenCalledTimes(1);
            });
        });
    });

    /** デフォルト系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Default Scenarios', () => {
        it('renders error message for missing props', () => {
            const defaultProps = {
                direction: 'prev' as 'prev' | 'next',
                componentClassName:"bg-black",
                btnclassName: "bg-white",
                onClick: () => {}
            }

            const {container} = render(<Navigator {...defaultProps} />);
            const divElement = container.querySelector('div');
            expect(divElement).toHaveClass("bg-black");

            const button = screen.getByRole('button', { name: /Previous/i });
            expect(button).toHaveClass("bg-white");
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Negative Scenarios', () => {
        it('renders error message for missing props', () => {
            const originalError = console.error;
            console.error = () => {};
            const defaultProps = {
                direction: 'prev' as 'prev' | 'next',
                onClick: undefined as any
            }

            render(<Navigator {...defaultProps} />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
            console.error = originalError;
        });
    });
});