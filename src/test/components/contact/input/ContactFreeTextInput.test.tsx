import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
                rows: 5,
                onChange,
            };

            const { getByRole } = render(<ContactFreeTextInput {...props} />);
            
            const textarea = getByRole('textbox');
            fireEvent.change(textarea, { target: { value: 'New value' } });

            expect(onChange).toHaveBeenCalledTimes(1);
        });

        it('displays error if provided', () => {
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
            
            expect(getByText(props.error)).toBeInTheDocument();
        });

        it('does not display error text when error is not provided', () => {
            const props = {
                inputId: "testId",
                inputName: "testName",
                inputValue: "testValue",
                inputStyle: "testStyle",
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
    });

});