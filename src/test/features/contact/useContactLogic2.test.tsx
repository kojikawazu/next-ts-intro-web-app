import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, fireEvent } from '@testing-library/react';
import { useContactLogic } from '@/app/features/contact/useContactLogic';
import contactReducer from '@/app/features/contact/contactSlice';

// store
let store = configureStore({
    reducer: {
        contact: contactReducer
    }
});

// テストコンポーネント
const TestComponentWithAction = () => {
    const { handleSendNotice } = useContactLogic();

    // 新しい関数を作成して、handleSendNoticeを呼び出します
    const triggerAction = () => {
        handleSendNotice();
    };

    return (
        <div>
            <button onClick={triggerAction} data-testid="triggerAction">Trigger</button>
        </div>
    );
}

describe('useContactLogic hook 02', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('handleSendNotice', () => {
        it('should dispatch setFadingOut with true after VISIBLE_COUNT milliseconds', () => {
            const COUNTER = 4500;
    
            // jestのタイマーモックを使用
            jest.useFakeTimers();
    
            // レンダリング
            const { getByTestId } = render(
                <Provider store={store}>
                    <TestComponentWithAction />
                </Provider>
            );
    
            // 新しい関数を呼び出すボタンをクリック
            fireEvent.click(getByTestId('triggerAction'));
        
            // VISIBLE_COUNTミリ秒後まで時間を進める
            jest.advanceTimersByTime(COUNTER);
        
            // ストアの状態を確認する
            const currentState = store.getState();
            expect(currentState.contact.isNotificationVisible).toBe(true);
            expect(currentState.contact.isFadingOut).toBe(true);
        
            // タイマーモックをリセット
            jest.useRealTimers();
        });

        it('should dispatch setFadingOut with true after VISIBLE_COUNT milliseconds', () => {
            const COUNTER = 5000;
    
            // jestのタイマーモックを使用
            jest.useFakeTimers();
    
            // レンダリング
            const { getByTestId } = render(
                <Provider store={store}>
                    <TestComponentWithAction />
                </Provider>
            );
    
            // 新しい関数を呼び出すボタンをクリック
            fireEvent.click(getByTestId('triggerAction'));
        
            // COUNTERミリ秒後まで時間を進める
            jest.advanceTimersByTime(COUNTER);
        
            // ストアの状態を確認する
            const currentState = store.getState();
            expect(currentState.contact.isNotificationVisible).toBe(false);
            expect(currentState.contact.isFadingOut).toBe(false);
        
            // タイマーモックをリセット
            jest.useRealTimers();
        });
    });
});