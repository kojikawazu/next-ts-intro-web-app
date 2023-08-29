import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
            test('renders ArrowIcon with correct angleCSS for "prev"', () => {
                const icon = screen.getByTestId('arrow-icon');
                expect(icon).toBeInTheDocument();
            });

            test('fires onClick handler when clicked', () => {
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
            test('renders ArrowIcon with correct angleCSS for "next"', () => {
                const icon = screen.getByTestId('arrow-icon');
                expect(icon).toBeInTheDocument();
            });

            test('fires onClick handler when clicked', () => {
                const button = screen.getByRole('button', { name: /Next career/i });
                fireEvent.click(button);
                expect(mockClickHandler).toHaveBeenCalledTimes(1);
            });
        });
    });
});