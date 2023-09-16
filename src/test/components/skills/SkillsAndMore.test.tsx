import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateFunctionProps } from '@/app/shared/utils/validateUtilities';
import SkillsAndMore from '@/app/components/skills/SkillsAndMore';

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
        it('does not invoke the updateCardDisplayLimit function when the button is disabled', () => {
            const originalError = console.error;
            console.error = () => {};
            render(<SkillsAndMore updateCardDisplayLimit={mockFn} currentIndex={10} cardAdditionCount={6} cardTotal={10} buttonLabel={LOAD_MORE} />);
            const button = screen.getByRole('button', { name: new RegExp(LOAD_MORE, 'i') });
            fireEvent.click(button);
            expect(mockFn).not.toHaveBeenCalled();
            console.error = originalError;
        });
        
        
        it('does not invoke the updateCardDisplayLimit function when the button is disabled', () => {
            const originalError = console.error;
            console.error = () => {};
            const errorProps = {
                updateCardDisplayLimit: undefined as any,
                currentIndex: undefined as any,
                cardAdditionCount: undefined as any,
                cardTotal: undefined as any,
                buttonLabel: undefined as any
            }

            render(<SkillsAndMore {...errorProps} />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
            console.error = originalError;
        });
    });
});