import { configureStore } from '@reduxjs/toolkit';
import dialogReducer from '@/app/features/dialog/dialogSlice';
import loadLimitReducer from '@/app/features/loadlimit/loadLimitSlice';
import contactReducer from '@/app/features/contact/contactSlice';

/** store */
export const store = configureStore({
    reducer: {
        dialog: dialogReducer,
        loadLimit: loadLimitReducer,
        contact: contactReducer
    }
});

// storeの型
export type RootState = ReturnType<typeof store.getState>;