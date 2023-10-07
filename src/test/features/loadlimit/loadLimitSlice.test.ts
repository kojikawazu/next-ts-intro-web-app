import reducer, { incrementLoadLimit, LoadLimitState } from '@/app/features/loadlimit/loadLimitSlice';

/** loadLimitSliceのテストコード */
describe('loadLimitSlice test', () => {
    let initialState: LoadLimitState;

    /** 各テストの前準備 */
    beforeEach(() => {
        initialState = {
            currentLoadSum: 9,
        };
    });

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {
        it('should handle initial state', () => {
            expect(reducer(undefined, { type: 'unknown' })).toEqual({
                currentLoadSum: 9,
            });
        });

        it('should increment within limit', () => {
            const result = reducer(initialState, incrementLoadLimit({ addition: 5, sum: 20 }));
            expect(result.currentLoadSum).toBe(14);
        });

        it('should not increment beyond limit', () => {
            const result = reducer(initialState, incrementLoadLimit({ addition: 12, sum: 20 }));
            expect(result.currentLoadSum).toBe(19);
        });

        it('should not increment if already at or beyond limit', () => {
            const state: LoadLimitState = {
                currentLoadSum: 19,
            };

            const result = reducer(state, incrementLoadLimit({ addition: 1, sum: 20 }));
            expect(result.currentLoadSum).toBe(19);
        });
    });

    /** 異常系・境界値 */
    /** ----------------------------------------------------------------------------------- */

    describe('Boundary & Error Scenarios', () => {
        it('should not change state for negative addition values', () => {
            const result = reducer(initialState, incrementLoadLimit({ addition: -5, sum: 20 }));
            expect(result.currentLoadSum).toBe(9);
        });

        it('should not change state for zero addition', () => {
            const result = reducer(initialState, incrementLoadLimit({ addition: 0, sum: 20 }));
            expect(result.currentLoadSum).toBe(9);
        });

        it('should handle NaN values without changing state', () => {
            const result = reducer(initialState, incrementLoadLimit({ addition: NaN, sum: 20 }));
            expect(result.currentLoadSum).toBe(9);
        });

        it('should not change state for negative sum values', () => {
            const result = reducer(initialState, incrementLoadLimit({ addition: 5, sum: -20 }));
            expect(result.currentLoadSum).toBe(9);
        });

        it('should not change state for zero sum', () => {
            const result = reducer(initialState, incrementLoadLimit({ addition: 5, sum: 0 }));
            expect(result.currentLoadSum).toBe(9);
        });

        it('should handle NaN values for sum without changing state', () => {
            const result = reducer(initialState, incrementLoadLimit({ addition: 5, sum: NaN }));
            expect(result.currentLoadSum).toBe(9);
        });
    });
});
