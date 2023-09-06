import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore  } from '@reduxjs/toolkit';
import { MESSAGES } from '@/app/shared/constants/constants';
import contactReducer from '@/app/features/contact/contactSlice';
import Contact from '@/app/components/contact/Contact';

// Mock
jest.mock('@/app/contexts/introContext', () => ({
    useIntroData: jest.fn(),
}));

const mockSetName = jest.fn();
    jest.mock('@/app/features/contact/useContactLogic', () => ({
        useContactLogic: () => ({
            name: "John Doe",
            email: "john.doe@example.com",
            message: "Hello, world!",
            validationErrors: [],
            setName: mockSetName,
            setEmail: jest.fn(),
            setMessage: jest.fn(),
            validate: jest.fn(),
            reset: jest.fn(),
        })
}));

/** Contactのテストコード */
describe('<Contact />', () => {
    // store
    let store: EnhancedStore;

    /** 各テストの前準備 */
    beforeEach(() => {
        store = configureStore({
            reducer: {
                contact: contactReducer
            }
        });

        const useIntroDataMock = require('@/app/contexts/introContext').useIntroData;
        useIntroDataMock.mockReturnValue({
            introData: {
                navbar_data: { 
                    contact_name: 'Contact',
                    link_title: 'Link',
                    about_name: 'About',
                    career_name: 'Career',
                    skills_name: 'Skills'
                },
                contact_data: {
                    contact_name: "contactName",
                    contact_email: "contactEmail",
                    contact_contents: "contactContents",
                    contact_btn_name: "contactBtnName"
                },
                hero_data: {},
                about_data: {},
                career_title_data: {},
                career_data: [],
                skills_data: {},
                footer_data: {}
            },
            refData: {}
        });
    });

    /** 各テストの後処理 */
    afterEach(() => {
        jest.resetAllMocks();
    });

     /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => { 
        it('renders an element with the expected placeholder text', () => {
            render(
                <Provider store={store}>
                    <Contact />
                </Provider>
            );
            expect(screen.getByPlaceholderText('contactName')).toBeInTheDocument();
        });

        it('renders contact form with pre-filled data', () => {
            render(
                <Provider store={store}>
                    <Contact />
                </Provider>
            );
            expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
            expect(screen.getByDisplayValue('john.doe@example.com')).toBeInTheDocument();
            expect(screen.getByDisplayValue('Hello, world!')).toBeInTheDocument();
        });
    });

     /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Negative Scenarios', () => {
        it('renders error component if given introData is incomplete or invalid', () => {
            const useIntroDataMock = require('@/app/contexts/introContext').useIntroData;
            useIntroDataMock.mockReturnValue({
                introData: {
                    navbar_data: { 
                        contact_name: 'Contact',
                        link_title: 'Link',
                        about_name: 'About',
                        career_name: 'Career',
                        skills_name: 'Skills'
                    },
                    contact_data: {
                        contact_name: "",
                        contact_email: "contactEmail",
                        contact_contents: "contactContents",
                        contact_btn_name: "contactBtnName"
                    },
                    hero_data: {},
                    about_data: {},
                    career_title_data: {},
                    career_data: [],
                    skills_data: {},
                    footer_data: {}
                },
                refData: {}
            });

            render(
                <Provider store={store}>
                    <Contact />
                </Provider>
            );
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
        });

        it('renders error component if given data is incomplete or invalid', () => {
            const useIntroDataMock = require('@/app/contexts/introContext').useIntroData;
            useIntroDataMock.mockReturnValue({
                introData: {
                    navbar_data: {},
                    contact_data: {},
                    hero_data: {},
                    about_data: {},
                    career_title_data: {},
                    career_data: [],
                    skills_data: {},
                    footer_data: {}
                },
                refData: {}
            });

            render(
                <Provider store={store}>
                    <Contact />
                </Provider>
            );
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
        });

        it('renders error component if introData is missing', () => {
            const useIntroDataMock = require('@/app/contexts/introContext').useIntroData;
            useIntroDataMock.mockReturnValue({
                introData: null,
                refData: {},
            });
    
            render(
                <Provider store={store}>
                    <Contact />
                </Provider>
            );
    
            expect(screen.getByText(MESSAGES.ERRORS.DATA_LOADING)).toBeInTheDocument();
        });

        it('renders error component if refData is missing', () => {
            const useIntroDataMock = require('@/app/contexts/introContext').useIntroData;
            useIntroDataMock.mockReturnValue({
                introData: {},
                refData: null,
            });

            render(
                <Provider store={store}>
                    <Contact />
                </Provider>
            );
            expect(screen.getByText(MESSAGES.ERRORS.DATA_LOADING)).toBeInTheDocument();
        });
    });
});