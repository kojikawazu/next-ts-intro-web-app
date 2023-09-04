import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
});