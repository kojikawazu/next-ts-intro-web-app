import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/** 型定義 */
export type ValidationErrors = {
    contactName?: string;
    contactEmail?: string;
    contactMessage?: string;
}

/** 問い合わせフォームの状態 */
interface ContactState {
    contactName: string;
    contactEmail: string;
    contactMessage: string;
    contactStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    contactError: string | null;
    validationErrors: ValidationErrors;
    isNotificationVisible: boolean;
    isFadingOut: boolean;
}

/** 初期状態 */ 
const initialState: ContactState = {
    contactName: '',
    contactEmail: '',
    contactMessage: '',
    contactStatus: 'idle',
    contactError: null,
    validationErrors: {},
    isNotificationVisible: false,
    isFadingOut: false
};

/** slice */
const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        setContactName: (state, action: PayloadAction<string>) => {
            state.contactName = action.payload;
        },
        setContactEmail: (state, action: PayloadAction<string>) => {
            state.contactEmail = action.payload;
        },
        setContactMessage: (state, action: PayloadAction<string>) => {
            state.contactMessage = action.payload;
        },
        setNotificationVisible: (state, action: PayloadAction<boolean>) => {
            state.isNotificationVisible = action.payload;
        },
        setFadingOut: (state, action: PayloadAction<boolean>) => {
            state.isFadingOut = action.payload;
        },
        sendContactStart: (state) => {
            state.contactStatus = 'loading';
            state.contactError  = null;
        },
        sendContactSuccess: (state) => {
            state.contactStatus = 'succeeded';
        },
        sendContactFailed: (state, action: PayloadAction<string>) => {
            state.contactStatus = 'failed';
            state.contactError  = action.payload;
        },
        resetContactForm: (state) => {
            state.contactName      = '';
            state.contactEmail     = '';
            state.contactMessage   = '';
            state.contactStatus    = 'idle';
            state.contactError     = null;
            state.validationErrors = {};
        },
        setValidationErrors: (state, action: PayloadAction<ContactState['validationErrors']>) => {
            state.validationErrors = action.payload;
        },
    }
  });
  
/** 外部エクスポート */
  export const {
    setContactName,
    setContactEmail,
    setContactMessage,
    setNotificationVisible,
    setFadingOut,
    sendContactStart,
    sendContactSuccess,
    sendContactFailed,
    resetContactForm,
    setValidationErrors
  } = contactSlice.actions;
  
  export default contactSlice.reducer;