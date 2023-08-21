import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HumbergerMenu from '@/app/components/navbar/HumbergerMenu';
import { useIntroData } from '@/app/contexts/introContext';
import { useScrollToRef } from '@/app/hooks/useScrol';

// Mocks
jest.mock('@/app/contexts/introContext');
jest.mock('@/app/hooks/useScrol');

/** ハンバーガーメニューコンポーネントのテスト */
describe('<HumbergerMenu />', () => {
    // Mocks
    let mockAboutScroll: jest.Mock;
    let mockCareerScroll: jest.Mock;
    let mockSkillsScroll: jest.Mock;
    let mockContactScroll: jest.Mock;

    /** 各テストの前準備 */
    beforeEach(() => {
        mockAboutScroll = jest.fn();
        mockCareerScroll = jest.fn();
        mockSkillsScroll = jest.fn();
        mockContactScroll = jest.fn();

        (useIntroData as jest.Mock).mockReturnValue({
            introData: {
                navbar_data: {
                    about_name: "About",
                    career_name: "Career",
                    skills_name: "Skills",
                    contact_name: "Contact"
                }
            },
            refData: {
                aboutRef: { current: {} },
                careerRef: { current: {} },
                skillsRef: { current: {} },
                contactRef: { current: {} }
            }
        });

        (useScrollToRef as jest.Mock)
            .mockReturnValueOnce(mockAboutScroll)
            .mockReturnValueOnce(mockCareerScroll)
            .mockReturnValueOnce(mockSkillsScroll)
            .mockReturnValueOnce(mockContactScroll);
    });

    it('toggles the menu when hamburger button is clicked', async () => {
        render(<HumbergerMenu />);

        // メニューが閉じているか確認
        const closedMenu = screen.getByRole('navigation', { hidden: true });
        expect(closedMenu).toHaveClass('top-[-100%]');

        // ハンバーガーボタンをクリックしてメニューを開く
        const openingButton = screen.getByRole('button', { name: "openingHumbergerButton" });
        fireEvent.click(openingButton);

        // メニューが開いているか確認
        await waitFor(() => {
            const openMenu = screen.getByRole('navigation');
            expect(openMenu).not.toHaveClass('top-[-100%]');
        });

        // ハンバーガーボタンを再度クリックしてメニューを閉じる
        const closingButton = screen.getByRole('button', { name: "closingHumbergerButton" });
        fireEvent.click(closingButton);

        // メニューが再び閉じているか確認
        await waitFor(() => {
            expect(closedMenu).toHaveClass('top-[-100%]');
        });
    });
});