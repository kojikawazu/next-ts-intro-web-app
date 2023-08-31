import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SkillsAndMore from '@/app/components/skills/SkillsAndMore';

/** SkillsAndMoreコンポーネントのテスト */
describe('<SkillsAndMore />', () => {
    const mockFn = jest.fn();

    /** 各テストの前準備 */
    beforeEach(() => {
        render(<SkillsAndMore updateCardDisplayLimit={mockFn} currentIndex={6} cardTotal={10} buttonLabel="Test Label" />);
    });

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {
        it('renders the provided button label', () => {
            const button = screen.getByRole('button', { name: /もっとスキルを読み込む/i });
            expect(button).toBeInTheDocument();
        });
    
        it('calls the updateCardDisplayLimit function with correct arguments when clicked', () => {
            const button = screen.getByRole('button', { name: /もっとスキルを読み込む/i });
            fireEvent.click(button);
        
            expect(mockFn).toHaveBeenCalledWith(6, 10);
        });
    });
});