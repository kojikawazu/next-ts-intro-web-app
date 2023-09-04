import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NavBarTitle from '@/app/components/navbar/title/NavBarTitle';

/** NavBarTitleコンポーネントテスト */
describe('<NavBarTitle />', () => {

    describe('Positive Scenarios', () => {
        test('renders the NavBarTitle component with provided properties', () => {
            const mockOnClick = jest.fn();
            const { getByText, getByLabelText } = render(
                <NavBarTitle 
                    ariaLabel="テストタイトル"
                    btnClass="testBtnClass"
                    onClick={mockOnClick}
                    label="テスト"
                />
            );

            expect(getByText("テスト")).toBeInTheDocument();
            expect(getByLabelText("テストタイトル")).toBeInTheDocument();
            expect(getByText("テスト").closest('button')).toHaveClass("testBtnClass");
        });

        test('calls onClick when the title is clicked', () => {
            const mockOnClick = jest.fn();
            const { getByText } = render(
                <NavBarTitle 
                    ariaLabel="テストタイトル"
                    btnClass="testBtnClass"
                    onClick={mockOnClick}
                    label="テスト"
                />
            );

            fireEvent.click(getByText("テスト"));
            expect(mockOnClick).toHaveBeenCalledTimes(1);
        });
    });
});