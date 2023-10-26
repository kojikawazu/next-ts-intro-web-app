import React from 'react';
import { render } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MockedFunction } from 'jest-mock';
import { RootState } from '@/app/features/store';
import dialogReducer from '@/app/features/dialog/dialogSlice';
import loadLimitReducer from '@/app/features/loadlimit/loadLimitSlice';
import contactReducer from '@/app/features/contact/contactSlice';
import { useLoadLimitLogic } from '@/app/features/loadlimit/useLoadLimit';

// Mock
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

let store = configureStore({
  reducer: {
    dialog: dialogReducer,
    loadLimit: loadLimitReducer,
    contact: contactReducer
  }
});

const mockedUseSelector = useSelector as MockedFunction<typeof useSelector>;

describe('useLoadLimitLogic', () => {
  it('should get the currentLoadSum from the state', () => {
    // RootState の型を持つダミーのステートオブジェクト
    const mockState: RootState = {
      dialog: {
        isDialogOpen: false,
        currentIndex: 0
      },
      loadLimit: {
        currentLoadSum: 5,
      },
      contact: {
        contactName: '',
        contactEmail: '',
        contactMessage: '',
        contactStatus: 'idle',
        contactError: null,
        validationErrors: {},
        isNotificationVisible: false,
        isFadingOut: false
      }
    };

    // useSelectorのモックの戻り値を設定
    mockedUseSelector.mockImplementation((callback: (state: RootState) => any) => callback(mockState));

    const TestComponent = () => {
      const { currentLoadSum } = useLoadLimitLogic();
      return <div>{currentLoadSum}</div>;
    };

    const { getByText } = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );

    expect(getByText(mockState.loadLimit.currentLoadSum.toString())).toBeInTheDocument();
  });
});
