import React from 'react';
import { render } from '@testing-library/react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useWindowWidth } from '@/app/hooks/useWindowWidth';
import dialogReducer, { openDialog, closeDialog } from '@/app/features/dialog/dialogSlice';
import loadLimitReducer from '@/app/features/loadlimit/loadLimitSlice';
import contactReducer from '@/app/features/contact/contactSlice';
import { useDialogLogic } from '@/app/features/dialog/useDialogLogic';

// useSelectorとuseDispatchのモック
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// useWindowWidthのモック
jest.mock('@/app/hooks/useWindowWidth', () => ({
  useWindowWidth: jest.fn(),
}));

let store = configureStore({
    reducer: {
      dialog: dialogReducer,
      loadLimit: loadLimitReducer,
      contact: contactReducer
    }
});

const TestComponent: React.FC = () => {
    const { isDialogOpen, dialogIndex, setCurrentIndexOpen, setCloseDialog } = useDialogLogic();
    return (
      <div>
        <div data-testid="isDialogOpen">{isDialogOpen.toString()}</div>
        <div data-testid="dialogIndex">{dialogIndex}</div>
        <button onClick={() => setCurrentIndexOpen(1)}>Open Dialog</button>
        <button onClick={setCloseDialog}>Close Dialog</button>
      </div>
    );
};

describe('useDialogLogic', () => {
  let mockDispatch: jest.Mock = jest.fn();

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
        dialog: {
          isDialogOpen: false,
          currentIndex: 0,
        },
    }));
    (useWindowWidth as jest.Mock).mockReturnValue(767);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch openDialog when clicked on Open Dialog', () => {
    const { getByText } = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );

    getByText('Open Dialog').click();
    expect(mockDispatch).toHaveBeenCalledWith(openDialog(1));
  });

  it('should not dispatch openDialog if isDialogOpen is true', () => {
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      dialog: {
        isDialogOpen: true,
        currentIndex: 0,
      },
    }));

    const { getByText } = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );

    getByText('Open Dialog').click();
    expect(mockDispatch).not.toHaveBeenCalledWith(openDialog(1));
  });

  it('should not dispatch openDialog if windowWidth is >= 768', () => {
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      dialog: {
        isDialogOpen: false,
        currentIndex: 0,
      },
    }));
    (useWindowWidth as jest.Mock).mockReturnValue(768);

    const { getByText } = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );

    getByText('Open Dialog').click();
    expect(mockDispatch).not.toHaveBeenCalledWith(openDialog(1));
  });

  it('should dispatch closeDialog when clicked on Close Dialog and isDialogOpen is true', () => {
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      dialog: {
        isDialogOpen: true,
        currentIndex: 0,
      },
    }));

    const { getByText } = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );

    getByText('Close Dialog').click();
    expect(mockDispatch).toHaveBeenCalledWith(closeDialog());
  });

  it('should not dispatch closeDialog when clicked on Close Dialog and isDialogOpen is false', () => {
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      dialog: {
        isDialogOpen: false,
        currentIndex: 0,
      },
    }));

    const { getByText } = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );

    getByText('Close Dialog').click();
    expect(mockDispatch).not.toHaveBeenCalledWith(closeDialog());
  });
});
