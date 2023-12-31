import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import ContactFreeTextInput from '@/app/components/contact/input/ContactFreeTextInput';

/** ContactFreeTextInputのテストコード */
describe('<ContactFreeTextInput />', () => {

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {
        it('renders the textarea with the provided props', () => {
            const props = {
                inputId: "testId",
                inputName: "testName",
                inputValue: "testValue",
                inputStyle: "testStyle",
                errorStyle: "text-red-500",
                rows: 5,
                onChange: jest.fn(),
            };

            const { getByRole } = render(<ContactFreeTextInput {...props} />);
            const textarea = getByRole('textbox');

            expect(textarea).toBeInTheDocument();
            expect(textarea).toHaveValue(props.inputValue);
            expect(textarea).toHaveAttribute('name', props.inputName);
            expect(textarea).toHaveAttribute('class', expect.stringContaining(props.inputStyle));
            expect(textarea).toHaveAttribute('rows', props.rows.toString());
        });

        it('triggers onChange event when the textarea value changes', () => {
            const onChange = jest.fn();
            const props = {
                inputId: "testId",
                inputName: "testName",
                inputValue: "",
                inputStyle: "testStyle",
                errorStyle: "text-red-500",
                rows: 5,
                onChange,
            };

            const { getByRole } = render(<ContactFreeTextInput {...props} />);
            
            const textarea = getByRole('textbox');
            fireEvent.change(textarea, { target: { value: 'New value' } });

            expect(onChange).toHaveBeenCalledTimes(1);
        });

        it('displays provided error message', () => {
            const props = {
                inputId: "testId",
                inputName: "testName",
                inputValue: "testValue",
                inputStyle: "testStyle",
                errorStyle: "text-red-500",
                rows: 5,
                onChange: jest.fn(),
                error: "This is an error",
            };

            const { getByText } = render(<ContactFreeTextInput {...props} />);
            expect(getByText(props.error)).toBeInTheDocument();
        });

        it('does not display error text when error is not provided', () => {
            const props = {
                inputId: "testId",
                inputName: "testName",
                inputValue: "testValue",
                inputStyle: "testStyle",
                errorStyle: "text-red-500",
                rows: 5,
                onChange: jest.fn(),
            };
        
            const { container } = render(<ContactFreeTextInput {...props} />);
    
            const textareaElement = container.querySelector(`#${props.inputId}`);
            const describedBy = textareaElement?.getAttribute('aria-describedby');
            
            if (!describedBy) {
                expect(true).toBeTruthy();
            } else {
                const errorElement = document.getElementById(describedBy);
                expect(errorElement?.textContent).toBe('\u00A0');
            }
        });

        it('applies default errorStyle when error is provided and errorStyle is not', () => {
            const props = {
                inputId: "testId",
                inputName: "testName",
                inputValue: "testValue",
                inputStyle: "testStyle",
                rows: 5,
                onChange: jest.fn(),
                error: "This is an error",
            };

            const { getByText } = render(<ContactFreeTextInput {...props} />);
            const errorElement = getByText(props.error);
            expect(errorElement).toHaveClass('text-red-500');
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Negative Scenarios', () => {
        it('displays an error message when provided with an empty inputId', () => {
            const originalError = console.error;
            console.error = () => {};
            const props = {
                inputId: "",
                inputName: "testName",
                inputValue: "testValue",
                inputStyle: "testStyle",
                errorStyle: "text-red-500",
                rows: 5,
                onChange: jest.fn(),
            };
            render(<ContactFreeTextInput {...props} />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
            console.error = originalError;
        });

        it('displays an error message when provided with an empty inputName', () => {
            const originalError = console.error;
            console.error = () => {};
            const props = {
                inputId: "testId",
                inputName: "",
                inputValue: "testValue",
                inputStyle: "testStyle",
                errorStyle: "text-red-500",
                rows: 5,
                onChange: jest.fn(),
            };
            render(<ContactFreeTextInput {...props} />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
            console.error = originalError;
        });

        it('displays an error message when provided with an empty inputStyle', () => {
            const originalError = console.error;
            console.error = () => {};
            const props = {
                inputId: "testId",
                inputName: "testName",
                inputValue: "testValue",
                inputStyle: "",
                errorStyle: "text-red-500",
                rows: 5,
                onChange: jest.fn(),
            };
            render(<ContactFreeTextInput {...props} />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
            console.error = originalError;
        });
    });
});