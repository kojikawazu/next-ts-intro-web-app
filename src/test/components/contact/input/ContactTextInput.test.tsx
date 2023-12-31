import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import ContactTextInput from '@/app/components/contact/input/ContactTextInput';

/** ContactTextInputのテストコード */
describe('<ContactTextInput />', () => {

     /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {
        it('renders correctly', () => {
            const { getByPlaceholderText } = render(
                <ContactTextInput 
                    inputId="testId"
                    inputName="testName"
                    inputType="text"
                    inputValue=""
                    inputStyle="testStyle"
                    errorStyle="text-red-500"
                    placeholder="Test Placeholder"
                    onChange={() => {}}
                />
            );
    
            expect(getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
        });
    
        it('displays an error if provided', () => {
            const { getByText } = render(
                <ContactTextInput 
                    inputId="testId"
                    inputName="testName"
                    inputType="text"
                    inputValue=""
                    inputStyle="testStyle"
                    errorStyle="text-red-500"
                    placeholder="Test Placeholder"
                    onChange={() => {}}
                    error="Test Error"
                />
            );
    
            expect(getByText('Test Error')).toBeInTheDocument();
        });
    
        it('calls onChange handler when input value changes', () => {
            const handleChange = jest.fn();
            const { getByPlaceholderText } = render(
                <ContactTextInput 
                    inputId="testId"
                    inputName="testName"
                    inputType="text"
                    inputValue=""
                    inputStyle="testStyle"
                    errorStyle="text-red-500"
                    placeholder="Test Placeholder"
                    onChange={handleChange}
                />
            );
    
            fireEvent.change(getByPlaceholderText('Test Placeholder'), { target: { value: 'New Value' } });
            expect(handleChange).toHaveBeenCalledTimes(1);
        });

        it('applies default errorStyle when errorStyle is not provided', () => {
            const mockOnChange = jest.fn();
    
            const { container } = render(
                <ContactTextInput 
                    inputId="test-id"
                    inputName="test-name"
                    inputType="text"
                    inputValue="test-value"
                    inputStyle="test-style"
                    placeholder="test-placeholder"
                    onChange={mockOnChange}
                    error="This is a test error."
                />
            );
    
            const errorElement = container.querySelector(`#test-id-error`);
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
                inputType: "text",
                inputValue: "",
                inputStyle: "testStyle",
                errorStyle: "text-red-500",
                placeholder: "Test Placeholder",
                onChange: () => {}
            };
            render( <ContactTextInput {...props} />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
            console.error = originalError;
        });

        it('displays an error message when provided with an empty inputName', () => {
            const originalError = console.error;
            console.error = () => {};
            const props = {
                inputId: "testId",
                inputName: "",
                inputType: "text",
                inputValue: "",
                inputStyle: "testStyle",
                errorStyle: "text-red-500",
                placeholder: "Test Placeholder",
                onChange: () => {}
            };
            render( <ContactTextInput {...props} />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
            console.error = originalError;
        });

        it('displays an error message when provided with an empty inputType', () => {
            const originalError = console.error;
            console.error = () => {};
            const props = {
                inputId: "testId",
                inputName: "testName",
                inputType: "",
                inputValue: "",
                inputStyle: "testStyle",
                errorStyle: "text-red-500",
                placeholder: "Test Placeholder",
                onChange: () => {}
            };
            render( <ContactTextInput {...props} />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
            console.error = originalError;
        });

        it('displays an error message when provided with an empty inputStyle', () => {
            const originalError = console.error;
            console.error = () => {};
            const props = {
                inputId: "testId",
                inputName: "testName",
                inputType: "text",
                inputValue: "",
                inputStyle: "",
                errorStyle: "text-red-500",
                placeholder: "Test Placeholder",
                onChange: () => {}
            };
            render( <ContactTextInput {...props} />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
            console.error = originalError;
        });

        it('displays an error message when provided with an empty placeholder', () => {
            const originalError = console.error;
            console.error = () => {};
            const props = {
                inputId: "testId",
                inputName: "testName",
                inputType: "text",
                inputValue: "",
                inputStyle: "testStyle",
                errorStyle: "text-red-500",
                placeholder: "",
                onChange: () => {}
            };
            render( <ContactTextInput {...props} />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
            console.error = originalError;
        });
    });
});