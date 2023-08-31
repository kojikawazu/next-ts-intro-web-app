import { useDispatch, useSelector } from 'react-redux';
import { useLoadLimitLogic } from '@/app/features/loadlimit/useLoadLimit';
import { incrementLoadLimit } from '@/app/features/loadlimit/loadLimitSlice';

// Mocks
jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

/** useLoadLimitLogicのテストコード */
describe('useLoadLimitLogic hook', () => {
    const mockDispatch = jest.fn();

    /** 各テストの前準備 */
    beforeEach(() => {
        (useDispatch as jest.Mock).mockClear();
        (useSelector as jest.Mock).mockClear();

        (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    });

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {
        it('should correctly retrieve currentLoadSum from state', () => {
            (useSelector as jest.Mock).mockReturnValue(9);
            const { currentLoadSum } = useLoadLimitLogic();
            expect(currentLoadSum).toBe(9);
        });

        it('should dispatch incrementLoadLimit action correctly when within limits', () => {
            (useSelector as jest.Mock).mockReturnValue(9);
            const { incrementWithLimit } = useLoadLimitLogic();
            incrementWithLimit(5, 20);
            expect(mockDispatch).toHaveBeenCalledWith(incrementLoadLimit({ addition: 5, sum: 20 }));
        });

        it('should not dispatch incrementLoadLimit action when already at or beyond limits', () => {
            (useSelector as jest.Mock).mockReturnValue(19);
            const { incrementWithLimit } = useLoadLimitLogic();
            incrementWithLimit(1, 20);
            expect(mockDispatch).not.toHaveBeenCalledWith(incrementLoadLimit({ addition: 1, sum: 20 }));
        });
    });

    describe('Negative Scenarios', () => {
        it('should not dispatch incrementLoadLimit action for negative plusIndex values', () => {
            (useSelector as jest.Mock).mockReturnValue(9);
            const { incrementWithLimit } = useLoadLimitLogic();
            incrementWithLimit(-5, 20);
            expect(mockDispatch).not.toHaveBeenCalledWith(incrementLoadLimit({ addition: -5, sum: 20 }));
        });
    
        it('should not dispatch incrementLoadLimit action for NaN plusIndex', () => {
            (useSelector as jest.Mock).mockReturnValue(9);
            const { incrementWithLimit } = useLoadLimitLogic();
            incrementWithLimit(NaN, 20);
            expect(mockDispatch).not.toHaveBeenCalledWith(incrementLoadLimit({ addition: NaN, sum: 20 }));
        });

        it('should not dispatch incrementLoadLimit action for negative sum values', () => {
            (useSelector as jest.Mock).mockReturnValue(9);
            const { incrementWithLimit } = useLoadLimitLogic();
            incrementWithLimit(5, -20);
            expect(mockDispatch).not.toHaveBeenCalledWith(incrementLoadLimit({ addition: 5, sum: -20 }));
        });
    
        it('should not dispatch incrementLoadLimit action for NaN cardSum', () => {
            (useSelector as jest.Mock).mockReturnValue(9);
            const { incrementWithLimit } = useLoadLimitLogic();
            incrementWithLimit(5, NaN);
            expect(mockDispatch).not.toHaveBeenCalledWith(incrementLoadLimit({ addition: 5, sum: NaN }));
        });
    });
});