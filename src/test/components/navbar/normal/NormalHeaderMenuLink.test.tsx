import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import NormalHeaderMenuLink from '@/app/components/navbar/normal/NormalHeaderMenuLink';

/** NormalHeaderMenuLinkコンポーネントテスト */
describe('<NormalHeaderMenuLink />', () => {

    describe('Positive Scenarios', () => {
        test('renders the NormalHeaderMenuLink component with provided properties', () => {
            const mockOnClick = jest.fn();
            const { getByText, getByLabelText } = render(
                <NormalHeaderMenuLink 
                    menuClass="testMenuClass"
                    ariaLabel="テストメニュー"
                    btnClass="testBtnClass"
                    onClick={mockOnClick}
                    btnLabel="テストボタン"
                />
            );

            expect(getByText("テストボタン")).toBeInTheDocument();        
            expect(getByLabelText("テストメニュー")).toBeInTheDocument();
            expect(getByText("テストボタン")).toHaveClass("testBtnClass");
        });

        test('calls onClick when the button is clicked', () => {
            const mockOnClick = jest.fn();
            const { getByText } = render(
                <NormalHeaderMenuLink 
                    menuClass="testMenuClass"
                    ariaLabel="テストメニュー"
                    btnClass="testBtnClass"
                    onClick={mockOnClick}
                    btnLabel="テストボタン"
                />
            );

            fireEvent.click(getByText("テストボタン"));
            expect(mockOnClick).toHaveBeenCalledTimes(1);
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Negative Scenarios', () => {
        it('displays an error message when provided with an empty menuClass', () => {
            const mockOnClick = jest.fn();
            render(<NormalHeaderMenuLink 
                ariaLabel="テストメニュー"
                btnClass="testBtnClass"
                onClick={mockOnClick}
                btnLabel="テストボタン"
             />);
            expect(screen.getByText("テストボタン")).toBeInTheDocument();
        });

        it('displays an error message when provided with an empty ariaLabel', () => {
            const mockOnClick = jest.fn();
            render(<NormalHeaderMenuLink 
                menuClass="testMenuClass"
                ariaLabel=""
                btnClass="testBtnClass"
                onClick={mockOnClick}
                btnLabel="テストボタン"
             />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
        });

        it('displays an error message when provided with an empty btnClass', () => {
            const mockOnClick = jest.fn();
            render(<NormalHeaderMenuLink 
                menuClass="testMenuClass"
                ariaLabel="テストメニュー"
                onClick={mockOnClick}
                btnLabel="テストボタン"
             />);
            expect(screen.getByText("テストボタン")).toBeInTheDocument();
        });

        it('displays an error message when provided with an empty btnLabel', () => {
            const mockOnClick = jest.fn();
            render(<NormalHeaderMenuLink 
                menuClass="testMenuClass"
                ariaLabel="テストメニュー"
                btnClass="testBtnClass"
                onClick={mockOnClick}
                btnLabel=""
             />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
        });
    });
});