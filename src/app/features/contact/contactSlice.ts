import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/** 型定義 */
export type ValidationErrors = {
    name?: string;
    email?: string;
    message?: string;
}

/** 問い合わせフォームの状態 */
interface ContactState {
    name: string;
    email: string;
    message: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    validationErrors: ValidationErrors;
}

/** 初期状態 */ 
const initialState: ContactState = {
    name: '',
    email: '',
    message: '',
    status: 'idle',
    error: null,
    validationErrors: {},
};

/** slice */
const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
        },
        sendContactStart: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        sendContactSuccess: (state) => {
            state.status = 'succeeded';
        },
        sendContactFailed: (state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        resetContactForm: (state) => {
            state.name = '';
            state.email = '';
            state.message = '';
            state.status = 'idle';
            state.error = null;
            state.validationErrors = {};
        },
        setValidationErrors: (state, action: PayloadAction<ContactState['validationErrors']>) => {
            state.validationErrors = action.payload;
        },
    }
  });
  
/** 外部エクスポート */
  export const {
    setName,
    setEmail,
    setMessage,
    sendContactStart,
    sendContactSuccess,
    sendContactFailed,
    resetContactForm,
    setValidationErrors
  } = contactSlice.actions;
  
  export default contactSlice.reducer;