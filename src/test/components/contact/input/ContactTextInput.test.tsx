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
                    placeholder="Test Placeholder"
                    onChange={handleChange}
                />
            );
    
            fireEvent.change(getByPlaceholderText('Test Placeholder'), { target: { value: 'New Value' } });
            expect(handleChange).toHaveBeenCalledTimes(1);
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Negative Scenarios', () => {
        it('displays an error message when provided with an empty inputId', () => {
            const props = {
                inputId: "",
                inputName: "testName",
                inputType: "text",
                inputValue: "",
                inputStyle: "testStyle",
                placeholder: "Test Placeholder",
                onChange: () => {}
            };
            render( <ContactTextInput {...props} />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
        });

        it('displays an error message when provided with an empty inputName', () => {
            const props = {
                inputId: "testId",
                inputName: "",
                inputType: "text",
                inputValue: "",
                inputStyle: "testStyle",
                placeholder: "Test Placeholder",
                onChange: () => {}
            };
            render( <ContactTextInput {...props} />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
        });

        it('displays an error message when provided with an empty inputType', () => {
            const props = {
                inputId: "testId",
                inputName: "testName",
                inputType: "",
                inputValue: "",
                inputStyle: "testStyle",
                placeholder: "Test Placeholder",
                onChange: () => {}
            };
            render( <ContactTextInput {...props} />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
        });

        it('displays an error message when provided with an empty inputStyle', () => {
            const props = {
                inputId: "testId",
                inputName: "testName",
                inputType: "text",
                inputValue: "",
                inputStyle: "",
                placeholder: "Test Placeholder",
                onChange: () => {}
            };
            render( <ContactTextInput {...props} />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
        });

        it('displays an error message when provided with an empty placeholder', () => {
            const props = {
                inputId: "testId",
                inputName: "testName",
                inputType: "text",
                inputValue: "",
                inputStyle: "testStyle",
                placeholder: "",
                onChange: () => {}
            };
            render( <ContactTextInput {...props} />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
        });
    });
});