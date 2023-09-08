import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import HamburgerCloseBtn from '@/app/components/navbar/hamburger/HamburgerCloseBtn';

/** HamburgerCloseBtnコンポーネントテスト */
describe('<HamburgerCloseBtn />', () => {
    
    describe('Positive Scenarios', () => {
        test('renders the HamburgerCloseBtn component', () => {
            const mockOnClick = jest.fn();
            const { getByLabelText } = render(<HamburgerCloseBtn onClick={mockOnClick} ariaLabel="テストボタン" />);
            
            expect(getByLabelText("テストボタン")).toBeInTheDocument();
        });

        test('calls onClick when the button is clicked', () => {
            const mockOnClick = jest.fn();
            const { getByLabelText } = render(<HamburgerCloseBtn onClick={mockOnClick} ariaLabel="テストボタン" />);
            
            fireEvent.click(getByLabelText("テストボタン"));
            
            expect(mockOnClick).toHaveBeenCalledTimes(1);
        });

        it('displays an error message when provided with an empty ariaLabel', () => {
            const mockOnClick = jest.fn();
            render(<HamburgerCloseBtn onClick={mockOnClick} />);
            expect(screen.getByLabelText("メニューを閉じる")).toBeInTheDocument();
        });

        
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Negative Scenarios', () => {
        test('renders the HamburgerCloseBtn component', () => {
            render(<HamburgerCloseBtn onClick={undefined as any} />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
        });
    });
});