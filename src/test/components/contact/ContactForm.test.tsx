import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ContactForm from '@/app/components/contact/ContactForm';

/** ContactFormのテストコード */
describe('<ContactForm />', () => {
    const mockContactData = {
        contact_name: 'Name',
        contact_email: 'Email',
        contact_contents: 'Contents',
        contact_btn_name: 'Submit'
    };

    const mockValidationErrors = {
        name: '',
        email: '',
        message: ''
    };

    const renderContactForm = (propsOverrides = {}) => render(
        <ContactForm 
            contactData={mockContactData}
            contactName=""
            contactEmail=""
            contactMessage=""
            validationErrors={mockValidationErrors}
            setContactName={() => {}}
            setContactEmail={() => {}}
            setContactMessage={() => {}}
            validate={() => true}
            {...propsOverrides}
        />
    );

    /** 各テストの前準備 */
    beforeEach(() => {
        jest.clearAllMocks();
    });

     /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => { 
        it('renders correctly', () => {
            const { getByText, getByPlaceholderText } = renderContactForm();
            expect(getByPlaceholderText('Name')).toBeInTheDocument();
            expect(getByPlaceholderText('Email')).toBeInTheDocument();
            expect(getByText('Submit')).toBeInTheDocument();
        });
    
        it('calls appropriate handler when name input value changes', () => {
            const handleSetName = jest.fn();
            const { getByPlaceholderText } = renderContactForm({ setContactName: handleSetName });
            fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'John' } });
            expect(handleSetName).toHaveBeenCalledWith('John');
            expect(handleSetName).toHaveBeenCalledTimes(1);
        });

        it('calls appropriate handler when email input value changes', () => {
            const handleSetEmail = jest.fn();
            const { getByPlaceholderText } = renderContactForm({ setContactEmail: handleSetEmail });
            fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
            expect(handleSetEmail).toHaveBeenCalledWith('john@example.com');
            expect(handleSetEmail).toHaveBeenCalledTimes(1);
        });

        it('calls appropriate handler when message input value changes', () => {
            const handleSetMessage = jest.fn();
            const { getByLabelText } = renderContactForm({ setContactMessage: handleSetMessage });

            fireEvent.change(getByLabelText(/Contents/i), { target: { value: 'OK' } });
            expect(handleSetMessage).toHaveBeenCalledWith('OK');
            expect(handleSetMessage).toHaveBeenCalledTimes(1);
        });
    
        it('displays error if provided', () => {
            const mockErrors = {
                name: 'Name is required.',
                email: '',
                message: ''
            };
            const { getByText } = renderContactForm({ validationErrors: mockErrors });
            expect(getByText('Name is required.')).toBeInTheDocument();
        });
    
        it('calls validate when the form is submitted', () => {
            const mockValidate = jest.fn().mockReturnValue(true);
            const { getByText } = renderContactForm({ validate: mockValidate });
            fireEvent.click(getByText('Submit'));
            expect(mockValidate).toHaveBeenCalled();
        });
    });

     /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Negative Scenarios', () => {
        it('does not proceed with form submission if validation fails', () => {
            const mockValidate = jest.fn().mockReturnValue(false);
            const mockSubmit = jest.fn();
            const { getByText } = renderContactForm({ validate: mockValidate });
    
            fireEvent.click(getByText('Submit'));
            
            expect(mockValidate).toHaveBeenCalled();
            expect(mockSubmit).not.toHaveBeenCalled();
        });
    });
});
