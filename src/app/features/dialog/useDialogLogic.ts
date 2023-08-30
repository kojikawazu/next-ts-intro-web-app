import { useSelector, useDispatch } from 'react-redux';
import { useWindowWidth } from '@/app/hooks/useWindowWidth';
import { openDialog, closeDialog } from '@/app/features/dialog/dialogSlice';
import { RootState } from '@/app/features/store';

/** dialogのhook */
export const useDialogLogic = () => {
    // dispatch
    const dispatch = useDispatch();

    // selector
    const isDialogOpen = useSelector((state: RootState) => state.dialog.isDialogOpen);
    const dialogIndex  = useSelector((state: RootState) => state.dialog.currentIndex);

    // hook
    const windowWidth = useWindowWidth();

    /**
     * 現在の番号でダイアログを開く
     * @param currentIndex 
     */
    const setCurrentIndexOpen = (currentIndex: number) => {
        if (isDialogOpen)         return;
        if (windowWidth >= 768)   return;

        dispatch(openDialog(currentIndex));
    };

    /**
     * ダイアログを閉じる
     */
    const setCloseDialog = () => { 
        if (!isDialogOpen)  return;
        dispatch(closeDialog());
    }

    return {
        isDialogOpen,
        dialogIndex,
        setCurrentIndexOpen,
        setCloseDialog
    };
};