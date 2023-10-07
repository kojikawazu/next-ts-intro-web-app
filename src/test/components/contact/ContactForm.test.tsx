import React from 'react';
import axios from 'axios';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore  } from '@reduxjs/toolkit';
import { MESSAGES } from '@/app/shared/constants/constants';
import contactReducer from '@/app/features/contact/contactSlice';
import ContactForm from '@/app/components/contact/ContactForm';

// Mocks
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAxiosPost = mockedAxios.post;

/** ContactFormのテストコード */
describe('<ContactForm />', () => {
    // store
    let store: EnhancedStore;

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
        <Provider store={store}>
            <ContactForm 
                contactData={mockContactData}
                {...propsOverrides} />
        </Provider>
    );

    /** 各テストの前準備 */
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => {});

        store = configureStore({
            reducer: {
                contact: contactReducer
            }
        });
    });

    afterEach(() => {
        (console.error as jest.Mock).mockRestore();
    });

     /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => { 
        it('should render the form with correct fields and button', () => {
            const { getByText, getByPlaceholderText } = renderContactForm();
            expect(getByPlaceholderText('Name')).toBeInTheDocument();
            expect(getByPlaceholderText('Email')).toBeInTheDocument();
            expect(getByText('Submit')).toBeInTheDocument();
        });
    
        it('should update the name field when value changes', () => {
            const { getByPlaceholderText } = renderContactForm();
            const nameInput = getByPlaceholderText('Name') as HTMLInputElement;
            fireEvent.change(nameInput, { target: { value: 'John' } });
            expect(nameInput.value).toBe('John');
        });

        it('should update the email field when value changes', () => {
            const { getByPlaceholderText } = renderContactForm();
            const emailInput = getByPlaceholderText('Email') as HTMLInputElement;
            fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
            expect(emailInput.value).toBe('john@example.com');
        });

        it('should update the message field when value changes', () => {
            const { getByLabelText } = renderContactForm();
            const contentsText = getByLabelText(/Contents/i) as HTMLInputElement;
            fireEvent.change(contentsText, { target: { value: 'OK' } });
            expect(contentsText.value).toBe('OK');
        });
    
        it('should prompt for confirmation when the form is submitted', () => {
            const mockCallWindow = jest.fn();
            global.window.confirm = mockCallWindow;

            const { getByText, getByPlaceholderText, getByLabelText } = renderContactForm();
            const nameInput = getByPlaceholderText('Name') as HTMLInputElement;
            fireEvent.change(nameInput, { target: { value: 'John' } });
            const emailInput = getByPlaceholderText('Email') as HTMLInputElement;
            fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
            const contentsText = getByLabelText(/Contents/i) as HTMLInputElement;
            fireEvent.change(contentsText, { target: { value: 'OK' } });
            const btnName = getByText('Submit');
            fireEvent.click(btnName);

            expect(mockCallWindow).toHaveBeenCalledWith('メッセージを送信してもよろしいですか？');
        });

        it('should reset the form fields after a successful submission', async () => {
            const mockCallWindow = jest.fn(() => true);
            global.window.confirm = mockCallWindow;
            mockedAxiosPost.mockResolvedValueOnce({ status: 200 } as any);

            // input change
            const { getByText, getByPlaceholderText, getByLabelText } = renderContactForm();
            const nameInput = getByPlaceholderText('Name') as HTMLInputElement;
            fireEvent.change(nameInput, { target: { value: 'John' } });
            const emailInput = getByPlaceholderText('Email') as HTMLInputElement;
            fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
            const contentsText = getByLabelText(/Contents/i) as HTMLInputElement;
            fireEvent.change(contentsText, { target: { value: 'OK' } });
            
            // button click
            const btnName = getByText('Submit');
            fireEvent.click(btnName);

            // input init
            await waitFor(() => {
                expect(nameInput.value).toBe('');
                expect(emailInput.value).toBe('');
                expect(contentsText.value).toBe('');
            });
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Negative Scenarios', () => {
        it('should display an error message for an empty contact_name', () => {
            const originalError = console.error;
            console.error = () => {};
            const mockErrorContactData = {
                contact_name: "",
                contact_email: "contactEmail",
                contact_contents: "contactContents",
                contact_btn_name: "contactBtnName"
            }
            const props = {contactData: mockErrorContactData};
            render( 
                <Provider store={store}>
                    <ContactForm {...props} />
                </Provider> 
            );
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
            console.error = originalError;
        });

        it('should display an error message for an empty contact_email', () => {
            const originalError = console.error;
            console.error = () => {};
            const mockErrorContactData = {
                contact_name: "contactName",
                contact_email: "",
                contact_contents: "contactContents",
                contact_btn_name: "contactBtnName"
            }
            const props = {contactData: mockErrorContactData};
            render( 
                <Provider store={store}>
                    <ContactForm {...props} />
                </Provider> 
            );
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
            console.error = originalError;
        });

        it('should display an error message for an empty contact_contents', () => {
            const originalError = console.error;
            console.error = () => {};
            const mockErrorContactData = {
                contact_name: "contactName",
                contact_email: "contactEmail",
                contact_contents: "",
                contact_btn_name: "contactBtnName"
            }
            const props = {contactData: mockErrorContactData};
            render( 
                <Provider store={store}>
                    <ContactForm {...props} />
                </Provider> 
            );
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
            console.error = originalError;
        });

        it('should display an error message for an empty contact_btn_name', () => {
            const originalError = console.error;
            console.error = () => {};
            const mockErrorContactData = {
                contact_name: "contactName",
                contact_email: "contactEmail",
                contact_contents: "contactContents",
                contact_btn_name: ""
            }
            const props = {contactData: mockErrorContactData};
            render( 
                <Provider store={store}>
                    <ContactForm {...props} />
                </Provider> 
            );
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
            console.error = originalError;
        });

        it('should display an error message for missing name input during form submission', () => {
            const originalError = console.error;
            console.error = () => {};
            const { getByText } = renderContactForm();
            const btnName = getByText('Submit');
            fireEvent.click(btnName);

            expect(getByText('名前の入力が正しくありません。再度入力してください。')).toBeInTheDocument();
            console.error = originalError;
        });

        it('should display an error message for missing email input during form submission', () => {
            const originalError = console.error;
            console.error = () => {};
            const { getByText, getByPlaceholderText  } = renderContactForm();
            const nameInput = getByPlaceholderText('Name') as HTMLInputElement;
            fireEvent.change(nameInput, { target: { value: 'John' } });
            const btnName = getByText('Submit');
            fireEvent.click(btnName);

            expect(getByText('Eメールアドレスの入力が正しくありません。再度入力してください。')).toBeInTheDocument();
            console.error = originalError;
        });

        it('should display an error message for missing message input during form submission', () => {
            const originalError = console.error;
            console.error = () => {};
            const { getByText, getByPlaceholderText, getByLabelText } = renderContactForm();
            const nameInput = getByPlaceholderText('Name') as HTMLInputElement;
            fireEvent.change(nameInput, { target: { value: 'John' } });
            const emailInput = getByPlaceholderText('Email') as HTMLInputElement;
            fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
            const btnName = getByText('Submit');
            fireEvent.click(btnName);

            expect(getByText('お問い合わせ内容の入力が正しくありません。再度入力してください。')).toBeInTheDocument();
            console.error = originalError;
        });

        it('should retain form field values if submission is cancelled by user', () => {
            const originalError = console.error;
            console.error = () => {};
            const mockCallWindow = jest.fn(() => false);
            global.window.confirm = mockCallWindow;

            const { getByText, getByPlaceholderText, getByLabelText } = renderContactForm();
            const nameInput = getByPlaceholderText('Name') as HTMLInputElement;
            fireEvent.change(nameInput, { target: { value: 'John' } });
            const emailInput = getByPlaceholderText('Email') as HTMLInputElement;
            fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
            const contentsText = getByLabelText(/Contents/i) as HTMLInputElement;
            fireEvent.change(contentsText, { target: { value: 'OK' } });
            const btnName = getByText('Submit');
            fireEvent.click(btnName);

            expect(nameInput.value).toBe('John');
            expect(emailInput.value).toBe('john@example.com');
            expect(contentsText.value).toBe('OK');
            console.error = originalError;
        });

        it('should log an error and retain form values when form submission fails', async () => {
            const mockCallWindow = jest.fn(() => true);
            global.window.confirm = mockCallWindow;
            mockedAxiosPost.mockRejectedValueOnce(new Error('Bad Request'));

            const { getByText, getByPlaceholderText, getByLabelText } = renderContactForm();
            const nameInput = getByPlaceholderText('Name') as HTMLInputElement;
            fireEvent.change(nameInput, { target: { value: 'John' } });
            const emailInput = getByPlaceholderText('Email') as HTMLInputElement;
            fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
            const contentsText = getByLabelText(/Contents/i) as HTMLInputElement;
            fireEvent.change(contentsText, { target: { value: 'OK' } });
            const btnName = getByText('Submit');
            fireEvent.click(btnName);

             await waitFor(() => {
                expect(console.error).toHaveBeenCalledWith("[str]: error : ", "Error send email catch:", new Error('Bad Request'));
                expect(nameInput.value).toBe('John');
                expect(emailInput.value).toBe('john@example.com');
                expect(contentsText.value).toBe('OK');
            });
        });
    });
});
