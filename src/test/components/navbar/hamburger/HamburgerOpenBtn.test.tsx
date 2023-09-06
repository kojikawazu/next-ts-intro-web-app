import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import HamburgerOpenBtn from '@/app/components/navbar/hamburger/HamburgerOpenBtn';

/** HamburgerOpenBtnコンポーネントテスト */
describe('<HamburgerOpenBtn />', () => {
    
    describe('Positive Scenarios', () => {
        test('renders the HamburgerOpenBtn component', () => {
            const mockOnClick = jest.fn();
            const { getByLabelText } = render(<HamburgerOpenBtn onClick={mockOnClick} ariaLabel="メニューを開く" />);
            
            expect(getByLabelText("メニューを開く")).toBeInTheDocument();
        });

        test('calls onClick when the button is clicked', () => {
            const mockOnClick = jest.fn();
            const { getByLabelText } = render(<HamburgerOpenBtn onClick={mockOnClick} ariaLabel="メニューを開く" />);
            
            fireEvent.click(getByLabelText("メニューを開く"));
            
            // onClickが一度だけ呼び出されたことを確認
            expect(mockOnClick).toHaveBeenCalledTimes(1);
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Negative Scenarios', () => {
        it('displays an error message when provided with an empty ariaLabel', () => {
            const mockOnClick = jest.fn();
            render(<HamburgerOpenBtn onClick={mockOnClick} ariaLabel="" />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
        });
    });
});