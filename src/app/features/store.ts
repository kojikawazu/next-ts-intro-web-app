import { configureStore } from '@reduxjs/toolkit';
import dialogReducer from '@/app/features/dialog/dialogSlice';

/** store */
export const store = configureStore({
    reducer: {
        dialog: dialogReducer
    }
});

// storeの型
export type RootState = ReturnType<typeof store.getState>;