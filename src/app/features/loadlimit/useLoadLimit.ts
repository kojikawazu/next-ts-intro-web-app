import { useSelector, useDispatch } from 'react-redux';
import { incrementLoadLimit } from '@/app/features/loadlimit/loadLimitSlice';
import { RootState } from '@/app/features/store';

/** loadLimitのhook */
export const useLoadLimitLogic = () => {
    // dispatch
    const dispatch = useDispatch();

    // selector
    const currentLoadSum = useSelector((state: RootState) => state.loadLimit.currentLoadSum);

    /**
     * 指定されたインデックスでインクリメントし、最大カード数の制限を超えないように調整する
     * @param plusIndex インクリメントするインデックス数
     * @param cardSum カードの最大数
     */
    const incrementWithLimit = (plusIndex: number, cardSum: number) => {
        // 負数の場合は何もしない
        if( plusIndex <= 0 || !plusIndex || cardSum <= 0 || !cardSum) return;
        // ここで画面の表示制限をかけている
        // 現在のロード数が合計ロード数と同等かそれ以上の場合は何もしない
        // +1は配列インデックスが0から始まるため、合計のロード数と現在のロード数を適切に比較するために追加
        if (currentLoadSum + 1 >= cardSum) return;

        dispatch(incrementLoadLimit({addition: plusIndex, sum: cardSum}));
    };

    return {
        currentLoadSum,
        incrementWithLimit
    };
};