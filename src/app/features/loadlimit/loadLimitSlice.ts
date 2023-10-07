import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/** ロード制限の状態 */
export interface LoadLimitState {
    currentLoadSum: number;
}

/** 初期化 */
const initialState: LoadLimitState = {
    currentLoadSum: 9,
};

/** slice */
const loadLimitSlice = createSlice({
    name: 'loadLimit',
    initialState,
    reducers: {
        incrementLoadLimit: (state, action: PayloadAction<{addition: number, sum: number}>) => {
            const { addition, sum } = action.payload;

            // 負数の場合は何もしない
            if( addition <= 0 || !addition || sum <= 0 || !sum) return;
            
            // ここで画面の表示制限をかけている
            // 現在のロード数が合計ロード数と同等かそれ以上の場合は何もしない
            // +1は配列インデックスが0から始まるため、合計のロード数と現在のロード数を適切に比較するために追加
            if (state.currentLoadSum + 1 >= sum) return;

            state.currentLoadSum = state.currentLoadSum + addition;
            // インクリメント後に許容範囲を超える場合、最大数に調整する
            // +1は配列インデックスが0から始まるため、合計のロード数と現在のロード数を適切に比較するために追加
            if (state.currentLoadSum + 1 > sum) state.currentLoadSum = sum - 1;
        },
    }
});

/** 外部エクスポート */
export const { incrementLoadLimit } = loadLimitSlice.actions;
export default loadLimitSlice.reducer;