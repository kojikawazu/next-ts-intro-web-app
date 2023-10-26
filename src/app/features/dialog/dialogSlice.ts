import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/** ダイアログの状態 */
export interface CareerDialogState {
    isDialogOpen: boolean;
    currentIndex: number;
}

/** 初期化 */
const initialState: CareerDialogState = {
    isDialogOpen: false,
    currentIndex: 0
};

/** slice */
const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        openDialog: (state, action: PayloadAction<number>) => {
            state.isDialogOpen = true;
            state.currentIndex = action.payload;
        },
        closeDialog: (state) => {
            state.isDialogOpen = false;
            state.currentIndex = 0;
        }
    }
});

/** 外部エクスポート */
export const { openDialog, closeDialog } = dialogSlice.actions;
export default dialogSlice.reducer;