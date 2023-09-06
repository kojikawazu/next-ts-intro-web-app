import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateFunctionProps } from '@/app/shared/utils/validateUtilities';
import SkillsAndMore from '@/app/components/skills/SkillsAndMore';

// Mocks
jest.mock('@/app/shared/utils/validateUtilities');
jest.mock('@/app/shared/utils/utilities', () => ({
    ...jest.requireActual('@/app/shared/utils/utilities'),
    consoleLog: jest.fn(),
}));

/** SkillsAndMoreコンポーネントのテスト */
describe('<SkillsAndMore />', () => {
    const mockFn    = jest.fn();
    const LOAD_MORE = "もっとスキルを読み込む";

    /** 各テストの前準備 */
    beforeEach(() => {
        mockFn.mockReset();
    });

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {
        it('displays the button with the default label', () => {
            render(<SkillsAndMore updateCardDisplayLimit={mockFn} currentIndex={0} cardAdditionCount={6} cardTotal={10} buttonLabel={LOAD_MORE} />);
            const button = screen.getByRole('button', { name: new RegExp(LOAD_MORE, 'i') });
            expect(button).toBeInTheDocument();
        });
        
        it('displays the button with the custom label from prop', () => {
            const testLabel = "Test Label";
            render(<SkillsAndMore updateCardDisplayLimit={mockFn} currentIndex={0} cardAdditionCount={6} cardTotal={10} buttonLabel={testLabel} />);
            const button = screen.getByRole('button', { name: new RegExp(LOAD_MORE, 'i') });
            expect(button).toBeInTheDocument();
        });

        it('invokes the updateCardDisplayLimit function with correct arguments on click', () => {
            render(<SkillsAndMore updateCardDisplayLimit={mockFn} currentIndex={0} cardAdditionCount={6} cardTotal={10} buttonLabel={LOAD_MORE} />);
            const button = screen.getByRole('button', { name: new RegExp(LOAD_MORE, 'i') });
            fireEvent.click(button);
            expect(mockFn).toHaveBeenCalledWith(6, 10);
        });

        it('disables the button when the currentIndex matches the cardTotal', () => {
            render(<SkillsAndMore updateCardDisplayLimit={mockFn} currentIndex={10} cardAdditionCount={6} cardTotal={10} buttonLabel={LOAD_MORE} />);
            const button = screen.getByRole('button', { name: new RegExp(LOAD_MORE, 'i') });
            expect(button).toBeDisabled();
        });

        it('ensures the button is enabled when currentIndex is below the cardTotal', () => {
            render(<SkillsAndMore updateCardDisplayLimit={mockFn} currentIndex={8} cardAdditionCount={6} cardTotal={10} buttonLabel={LOAD_MORE} />);
            const button = screen.getByRole('button', { name: new RegExp(LOAD_MORE, 'i') });
            expect(button).not.toBeDisabled();
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Negative Scenarios', () => {
        it('logs an error when validateFunctionProps indicates a missing function', () => {
            (validateFunctionProps as jest.Mock).mockReturnValueOnce(MESSAGES.ERRORS.NOT_FUNCTIONS);
            render(<SkillsAndMore updateCardDisplayLimit={mockFn} currentIndex={0} cardAdditionCount={6} cardTotal={10} buttonLabel={LOAD_MORE} />);
            expect(consoleLog).toHaveBeenCalledWith(expect.stringContaining(`[SkillsAndMore]: ${MESSAGES.ERRORS.NOT_FUNCTIONS}`));
        });
        
        it('does not invoke the updateCardDisplayLimit function when the button is disabled', () => {
            render(<SkillsAndMore updateCardDisplayLimit={mockFn} currentIndex={10} cardAdditionCount={6} cardTotal={10} buttonLabel={LOAD_MORE} />);
            const button = screen.getByRole('button', { name: new RegExp(LOAD_MORE, 'i') });
            fireEvent.click(button);
            expect(mockFn).not.toHaveBeenCalled();
        });
    });
});