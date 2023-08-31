import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Skills from '@/app/components/skills/Skills';
import { useIntroData } from '@/app/contexts/introContext';
import { useLoadLimitLogic } from '@/app/features/loadlimit/useLoadLimit';

// Mocks
jest.mock('@/app/contexts/introContext');
jest.mock('@/app/features/loadlimit/useLoadLimit');

/** Skillsコンポーネントのテスト */
describe('<Skills />', () => {
    const mockIntroData = {
        navbar_data: { skills_name: 'Test Skills' },
        skills_data: {
            skills_cards: Array(10).fill({
                skills_card_icon: '/test-path.jpg',
                skills_card_name: 'Test Skill Name',
                skills_card_contents: 'Test Skill Description',
            }),
            skills_more: 'More Skills',
        },
    };

    const mockRefData = { skillsRef: React.createRef() };
    const mockLoadLimitLogic = { currentLoadSum: 6, incrementWithLimit: jest.fn() };

    /** 各テストの前準備 */
    beforeEach(() => {
        (useIntroData as jest.Mock).mockReturnValue({ introData: mockIntroData, refData: mockRefData });
        (useLoadLimitLogic as jest.Mock).mockReturnValue(mockLoadLimitLogic);
    });

    /** 各テストの後処理 */
    afterEach(() => {
        jest.clearAllMocks();
    });

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {
        it('renders the title correctly', () => {
            render(<Skills />);
            expect(screen.getByText('Test Skills')).toBeInTheDocument();
        });

        it('renders the correct number of skill cards', () => {
            render(<Skills />);
            expect(screen.getAllByText('Test Skill Name').length).toBe(6);
        });

        it('renders SkillsAndMore with correct props', () => {
            render(<Skills />);
            expect(screen.getByText('More Skills')).toBeInTheDocument();
        });

        it('calls changeAndMore correctly', () => {
            render(<Skills />);
            fireEvent.click(screen.getByText('More Skills'));

            expect(mockLoadLimitLogic.incrementWithLimit).toHaveBeenCalled();
            expect(mockLoadLimitLogic.incrementWithLimit).toHaveBeenCalledTimes(1);
            expect(mockLoadLimitLogic.incrementWithLimit).toHaveBeenCalledWith(6, 10);
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Negative Scenarios', () => {
        it('renders ErrorComponent if data is insufficient', () => {
            (useIntroData as jest.Mock).mockReturnValueOnce({ introData: undefined, refData: mockRefData });
            render(<Skills />);
            expect(screen.getByText('Error loading profile data')).toBeInTheDocument();
        });
    });
});