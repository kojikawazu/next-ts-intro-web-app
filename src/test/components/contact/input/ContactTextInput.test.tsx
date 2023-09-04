import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
});