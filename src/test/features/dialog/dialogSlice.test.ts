import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import reducer, { CareerDialogState, openDialog, closeDialog } from '@/app/features/dialog/dialogSlice';

describe('dialogSlice', () => {
    describe('reducer, actions and selectors', () => {
        let store: EnhancedStore<{ dialog: CareerDialogState }>;

        beforeEach(() => {
            store = configureStore({ reducer: { dialog: reducer } });
        });

        it('should handle initial state', () => {
            expect(store.getState().dialog).toEqual({
                isDialogOpen: false,
                currentIndex: 0
            });
        });

        it('should handle openDialog action', () => {
            store.dispatch(openDialog(5));
            expect(store.getState().dialog).toEqual({
                isDialogOpen: true,
                currentIndex: 5
            });
        });

        it('should handle closeDialog action', () => {
            store.dispatch(openDialog(5));
            store.dispatch(closeDialog());
            expect(store.getState().dialog).toEqual({
                isDialogOpen: false,
                currentIndex: 0
            });
        });
    });
});