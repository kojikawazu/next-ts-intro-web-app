import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
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

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Negative Scenarios', () => {
        it('displays an error message when provided with an empty ariaLabel', () => {
            const originalError = console.error;
            console.error = () => {};
            const mockOnClick = jest.fn();
            render(
                <NavBarTitle 
                    ariaLabel=""
                    btnClass="testBtnClass"
                    onClick={mockOnClick}
                    label="テスト"
                />
            );
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
            console.error = originalError;
        });

        it('displays an error message when provided with an empty btnClass', () => {
            const originalError = console.error;
            console.error = () => {};
            const mockOnClick = jest.fn();
            render(
                <NavBarTitle 
                    ariaLabel="テストタイトル"
                    onClick={mockOnClick}
                    label="テスト"
                />
            );
            expect(screen.getByText("テスト")).toBeInTheDocument();
            console.error = originalError;
        });

        it('displays an error message when provided with an empty label', () => {
            const originalError = console.error;
            console.error = () => {};
            const mockOnClick = jest.fn();
            render(
                <NavBarTitle 
                    ariaLabel="テストタイトル"
                    btnClass="testBtnClass"
                    onClick={mockOnClick}
                    label=""
                />
            );
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
            console.error = originalError;
        });
    });
});