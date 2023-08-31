import { configureStore } from '@reduxjs/toolkit';
import dialogReducer from '@/app/features/dialog/dialogSlice';
import loadLimitReducer from '@/app/features/loadlimit/loadLimitSlice';

/** store */
export const store = configureStore({
    reducer: {
        dialog: dialogReducer,
        loadLimit: loadLimitReducer
    }
});

// storeの型
export type RootState = ReturnType<typeof store.getState>;