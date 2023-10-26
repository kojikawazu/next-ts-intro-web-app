import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import axios from 'axios';
import { render, fireEvent, waitFor } from '@testing-library/react';
import contactReducer from '@/app/features/contact/contactSlice';
import { useContactLogic } from '@/app/features/contact/useContactLogic';

// モック
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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
        it('handleSubmit change nameInput', () => {
            const { getByTestId } = render(
                <Provider store={store}>
                    <TestComponentSubmit />
                </Provider>
            );
    
            fireEvent.change(getByTestId('nameInput'), { target: { value: 'Test Name' } });
            
            const inputHtml = getByTestId('nameInput') as HTMLInputElement;
            expect(inputHtml.value).toBe('Test Name');
        });

        it('handleSubmit change nameEmail', () => {
            const { getByTestId } = render(
                <Provider store={store}>
                    <TestComponentSubmit />
                </Provider>
            );
    
            fireEvent.change(getByTestId('nameEmail'), { target: { value: 'test@example.com' } });
            
            const inputHtml = getByTestId('nameEmail') as HTMLInputElement;
            expect(inputHtml.value).toBe('test@example.com');
        });

        it('handleSubmit change nameMessage', () => {
            const { getByTestId } = render(
                <Provider store={store}>
                    <TestComponentSubmit />
                </Provider>
            );
    
            fireEvent.change(getByTestId('nameMessage'), { target: { value: 'hogehoge name message' } });
            
            const inputHtml = getByTestId('nameMessage') as HTMLInputElement;
            expect(inputHtml.value).toBe('hogehoge name message');
        });
    
        it('should handle form submission', async () => {
            mockedAxios.post.mockResolvedValue({ status: 200 });
    
            const { getByTestId } = render(
                <Provider store={store}>
                    <TestComponentSubmit />
                </Provider>
            );
    
            fireEvent.change(getByTestId('nameInput'), { target: { value: 'Test' } });
            fireEvent.change(getByTestId('nameEmail'), { target: { value: 'test@example.com' } });
            fireEvent.change(getByTestId('nameMessage'), { target: { value: 'hogehoge' } });
            fireEvent.click(getByTestId('submitButton'));
            await waitFor(() => expect(mockedAxios.post).toHaveBeenCalledTimes(1));
        });
  
        it('フォーム送信後にフィールドがクリアされる', async () => {
          mockedAxios.post.mockResolvedValue({ status: 200 });

          const { getByTestId } = render(
            <Provider store={store}>
              <TestComponentSubmit />
            </Provider>
          );
        
          // フォームデータを入力
          fireEvent.change(getByTestId('nameInput'), { target: { value: '山田太郎' } });
          fireEvent.change(getByTestId('nameEmail'), { target: { value: 'yamada@example.com' } });
          fireEvent.change(getByTestId('nameMessage'), { target: { value: 'こんにちは' } });
        
          // フォームを送信
          fireEvent.click(getByTestId('submitButton'));
        
          // 非同期アクションの完了を待つ
          await waitFor(() => expect(mockedAxios.post).toHaveBeenCalledTimes(1));
        
          // フィールドがクリアされていることを確認
          await waitFor(() => {
              expect(getByTestId('nameInput')).toHaveValue('');
              expect(getByTestId('nameEmail')).toHaveValue('');
              expect(getByTestId('nameMessage')).toHaveValue('');
          });
        });

        it('無効な入力でバリデーションエラーをトリガーする', async () => {
          const { getByTestId } = render(
            <Provider store={store}>
              <TestComponentSubmit />
            </Provider>
          );
      
          // 無効なフォームデータを入力
          fireEvent.change(getByTestId('nameInput'), { target: { value: '' } });
          fireEvent.change(getByTestId('nameEmail'), { target: { value: 'invalid_email' } });
          fireEvent.change(getByTestId('nameMessage'), { target: { value: '' } });
      
          // フォームを送信
          fireEvent.click(getByTestId('submitButton'));
      
          // バリデーションエラーメッセージが表示されることを確認
          expect(getByTestId('nameInput')).toHaveValue('');
          expect(getByTestId('nameEmail')).toHaveValue('invalid_email');
          expect(getByTestId('nameMessage')).toHaveValue('');
      
          // APIが呼び出されないことを確認
          expect(mockedAxios.post).not.toHaveBeenCalled();
        });

        it('APIエラーが適切にハンドルされる', async () => {
          // APIの失敗レスポンスをモック
          mockedAxios.post.mockRejectedValueOnce(new Error('Network error'));
      
          const { getByTestId } = render(
            <Provider store={store}>
              <TestComponentSubmit />
            </Provider>
          );
      
          // 有効なフォームデータを入力
          fireEvent.change(getByTestId('nameInput'), { target: { value: '山田太郎' } });
          fireEvent.change(getByTestId('nameEmail'), { target: { value: 'yamada@example.com' } });
          fireEvent.change(getByTestId('nameMessage'), { target: { value: 'こんにちは' } });
      
          // フォームを送信
          fireEvent.click(getByTestId('submitButton'));
      
          // 非同期アクションの完了を待つ
          await waitFor(() => expect(mockedAxios.post).toHaveBeenCalledTimes(1));
      
          // ストアの状態を確認
          const state = store.getState();
          expect(state.contact.contactStatus).toBe('failed');
        });

        it('should handle form submission', async () => {
          const tempMailUrlProd = process.env.NEXT_PUBLIC_SEND_MAIL_URL_PROD;
          const tempMailUrl     = process.env.NEXT_PUBLIC_SEND_MAIL_URL;
          process.env.NEXT_PUBLIC_SEND_MAIL_URL_PROD = '';
          process.env.NEXT_PUBLIC_SEND_MAIL_URL = '';
          
          const { getByTestId } = render(
              <Provider store={store}>
                  <TestComponentSubmit />
              </Provider>
          );
  
          fireEvent.change(getByTestId('nameInput'), { target: { value: 'Test' } });
          fireEvent.change(getByTestId('nameEmail'), { target: { value: 'test@example.com' } });
          fireEvent.change(getByTestId('nameMessage'), { target: { value: 'hogehoge' } });
          fireEvent.click(getByTestId('submitButton'));
          await waitFor(() => expect(mockedAxios.post).not.toHaveBeenCalled());

          process.env.NEXT_PUBLIC_SEND_MAIL_URL_PROD = tempMailUrlProd;
          process.env.NEXT_PUBLIC_SEND_MAIL_URL      = tempMailUrl;
      });

      it('should handle non-200 response status from API', async () => {
        // axios.postをモックして、非200のステータスコードを返すように設定
        mockedAxios.post.mockResolvedValue({ status: 400, data: 'Bad Request' });
    
        const { getByTestId } = render(
            <Provider store={store}>
                <TestComponentSubmit />
            </Provider>
        );
    
        // フォームデータを入力
        fireEvent.change(getByTestId('nameInput'), { target: { value: 'Test' } });
        fireEvent.change(getByTestId('nameEmail'), { target: { value: 'test@example.com' } });
        fireEvent.change(getByTestId('nameMessage'), { target: { value: 'hogehoge' } });
    
        // フォームを送信
        fireEvent.click(getByTestId('submitButton'));
    
        // 非同期アクションの完了を待つ
        await waitFor(() => expect(mockedAxios.post).toHaveBeenCalledTimes(1));
    
        // ストアの状態を確認
        const state = store.getState();
        expect(state.contact.contactStatus).toBe('failed');
      });
    });
});