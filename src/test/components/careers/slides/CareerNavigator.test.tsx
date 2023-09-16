import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import CareerNavigator from '@/app/components/careers/slides/CareerNavigator';

// Mocks
jest.mock('@/app/components/common/icons/ArrowIcon', () => { return jest.fn(props => <div data-testid="arrow-icon">OK</div>)});

/** CareerNavigatorのテストコード */
describe('<CareerNavigator />', () => {
    let mockClickHandler: jest.Mock;
    const mockComponentClassName = '';
    const mockBtnclassName       = '';

    /** テストの前準備 */
    beforeEach(() => {
        mockClickHandler = jest.fn();
    });

    describe('Direction "prev" Scenario', () => {
        
        /** テストの前準備 */
        beforeEach(() => {
            render(<CareerNavigator direction="prev" onClick={mockClickHandler} componentClassName={mockComponentClassName} btnclassName={mockBtnclassName} />);
        });

        describe('Positive Scenarios', () => {
            it('renders ArrowIcon with correct angleCSS for "prev"', () => {
                const icon = screen.getByTestId('arrow-icon');
                expect(icon).toBeInTheDocument();
            });

            it('fires onClick handler when clicked', () => {
                const button = screen.getByRole('button', { name: /Previous career/i });
                fireEvent.click(button);
                expect(mockClickHandler).toHaveBeenCalledTimes(1);
                });
        });
    });

    describe('Direction "next" Scenario', () => {

        /** テストの前準備 */
        beforeEach(() => {
            render(<CareerNavigator direction="next" onClick={mockClickHandler} componentClassName={mockComponentClassName} btnclassName={mockBtnclassName} />);
        });

        describe('Positive Scenarios', () => {
            it('renders ArrowIcon with correct angleCSS for "next"', () => {
                const icon = screen.getByTestId('arrow-icon');
                expect(icon).toBeInTheDocument();
            });

            it('fires onClick handler when clicked', () => {
                const button = screen.getByRole('button', { name: /Next career/i });
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
                onClick: () => {}
            }

            const {container} = render(<CareerNavigator {...defaultProps} />);
            const divElement = container.querySelector('div');
            expect(divElement).toHaveClass("basis-0 xl:basis-2/12 flex justify-center items-center z-10");

            const button = screen.getByRole('button', { name: /Previous career/i });
            expect(button).toHaveClass("bg-white hover:bg-gray-100 text-black rounded-full");
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

            render(<CareerNavigator {...defaultProps} />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
            console.error = originalError;
        });
    });
});