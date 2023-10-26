import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { useContactLogic } from '@/app/features/contact/useContactLogic';
import contactReducer, { 
  setNotificationVisible,
  sendContactStart,
  sendContactSuccess,
  sendContactFailed,
  resetContactForm
 } from '@/app/features/contact/contactSlice';

// モック
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
}));
jest.mock('@/app/shared/utils/utilities', () => ({
  isEnvProd: jest.fn(() => true),
  isEnvDev: jest.fn(() => false),
}));

// store
let store = configureStore({
    reducer: {
        contact: contactReducer
    }
});

// テストコンポーネント
const TestComponentSubmit = () => {
    const {
      contactName,
      contactEmail,
      contactMessage,
      setContactName,
      setContactEmail,
      setContactMessage,
      handleSubmit,
      setOffNotificationVisible,
      sendContactStart,
      sendContactSuccess,
      sendContactFailed,
      contactReset
    } = useContactLogic();
  
    return (
      <div>
        <input 
          data-testid="nameInput" 
          value={contactName} 
          onChange={(e) => setContactName(e.target.value)} 
        />
        <input 
          data-testid="nameEmail" 
          value={contactEmail} 
          onChange={(e) => setContactEmail(e.target.value)} 
        />
        <input 
          data-testid="nameMessage" 
          value={contactMessage} 
          onChange={(e) => setContactMessage(e.target.value)} 
        />

        <button data-testid="submitButton" onClick={handleSubmit}>
          Submit
        </button>
        <button data-testid="setOffNotificationButton" onClick={setOffNotificationVisible}>
          Set Off Notification
        </button>
        <button data-testid="sendContactStartButton" onClick={sendContactStart}>
          Send Contact Start
        </button>
        <button data-testid="sendContactSuccessButton" onClick={sendContactSuccess}>
          Send Contact Success
        </button>
        <button data-testid="sendContactFailedButton" onClick={sendContactFailed}>
          Send Contact Failed
        </button>
        <button data-testid="contactResetButton" onClick={contactReset}>
          Reset Contact Form
        </button>
      </div>
    );
}

describe('useContactLogic hook', () => {
    beforeEach(() => {
        process.env.NEXT_PUBLIC_SEND_MAIL_URL_PROD = 'http://dummy.api/send';
        window.confirm = jest.fn(() => true);
        mockedAxios.post.mockReset();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('handleSubmit', () => {
        it('should dispatch setNotificationVisible with false', () => {
          const mockDispatch = jest.fn();
          (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
          
          const { getByTestId } = render(
            <Provider store={store}>
                <TestComponentSubmit />
            </Provider>
          );

          fireEvent.click(getByTestId('setOffNotificationButton'));
          expect(mockDispatch).toHaveBeenCalledWith(setNotificationVisible(false));
        });

        it('should dispatch sendContactStart', () => {
            const mockDispatch = jest.fn();
            (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
            
            const { getByTestId } = render(
                <Provider store={store}>
                    <TestComponentSubmit />
                </Provider>
            );
    
            fireEvent.click(getByTestId('sendContactStartButton'));
            expect(mockDispatch).toHaveBeenCalledWith(sendContactStart());
        });
    
        it('should dispatch sendContactSuccess', () => {
            const mockDispatch = jest.fn();
            (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
            
            const { getByTestId } = render(
                <Provider store={store}>
                    <TestComponentSubmit />
                </Provider>
            );
    
            fireEvent.click(getByTestId('sendContactSuccessButton'));
            expect(mockDispatch).toHaveBeenCalledWith(sendContactSuccess());
        });
    
        it('should dispatch sendContactFailed', () => {
            const mockDispatch = jest.fn();
            (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
            
            const { getByTestId } = render(
                <Provider store={store}>
                    <TestComponentSubmit />
                </Provider>
            );
    
            fireEvent.click(getByTestId('sendContactFailedButton'));
            expect(mockDispatch).toHaveBeenCalledWith(sendContactFailed("error"));
        });
    
        it('should dispatch resetContactForm', () => {
            const mockDispatch = jest.fn();
            (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
            
            const { getByTestId } = render(
                <Provider store={store}>
                    <TestComponentSubmit />
                </Provider>
            );
    
            fireEvent.click(getByTestId('contactResetButton'));
            expect(mockDispatch).toHaveBeenCalledWith(resetContactForm());
        });
    });
});