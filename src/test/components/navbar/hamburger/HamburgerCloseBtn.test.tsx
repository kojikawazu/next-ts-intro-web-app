import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
    });
});