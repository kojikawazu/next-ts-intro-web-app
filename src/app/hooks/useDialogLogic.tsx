import { useState, useCallback } from 'react';

/**
 * dialogのhook
 * @returns 
 */
export const useDialogLogic = () => {
    // State
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [dialogIndex, setDialogIndex] = useState(0);

    /**
     * 現在の番号でダイアログを開く
     * @param currentIndex 
     * @returns 
     */
    const setCurrentIndexOpen = useCallback((currentIndex: number) => {
        console.log(currentIndex);
        console.log(isDialogOpen);
        //if (isDialogOpen)   return;

        setDialogIndex(currentIndex);
        setDialogOpen(true);
    }, [isDialogOpen]);

    const setCloseDialog = () => { 
        if (!isDialogOpen)  return;
        setDialogOpen(false);
    }

    return {
        isDialogOpen,
        dialogIndex,
        setCurrentIndexOpen,
        setCloseDialog
    };
};