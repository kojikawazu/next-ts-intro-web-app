import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HumbergerMenu from '@/app/components/navbar/HumbergerMenu';
import { useIntroData } from '@/app/contexts/introContext';
import { useScrollToRef } from '@/app/hooks/useScroll';

// Mocks
jest.mock('@/app/contexts/introContext');
jest.mock('@/app/hooks/useScroll');

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

        (useScrollToRef as jest.Mock).mockImplementation((refData) => {
            if (refData === 'aboutRef') return mockAboutScroll;
            if (refData === 'careerRef') return mockCareerScroll;
            if (refData === 'skillsRef') return mockSkillsScroll;
            if (refData === 'contactRef') return mockContactScroll;
            return () => {};
        });

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
                aboutRef: 'aboutRef',
                careerRef: 'careerRef',
                skillsRef: 'skillsRef',
                contactRef: 'contactRef'
            }
        });
    });

    it('displays the menu items with the correct data', () => {
        render(<HumbergerMenu />);
        
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Career')).toBeInTheDocument();
        expect(screen.getByText('Skills')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
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

    it('calls the appropriate scroll function when each menu item is clicked', async () => {
        render(<HumbergerMenu />);

        const openingButton = screen.getByRole('button', { name: "openingHumbergerButton" });
        fireEvent.click(openingButton);

        await waitFor(() => {
            const openMenu = screen.getByRole('navigation');
            expect(openMenu).not.toHaveClass('top-[-100%]');
        });

        fireEvent.click(screen.getByText('About'));
        expect(mockAboutScroll).toHaveBeenCalledTimes(1);

        fireEvent.click(screen.getByText('Career'));
        expect(mockCareerScroll).toHaveBeenCalledTimes(1);

        fireEvent.click(screen.getByText('Skills'));
        expect(mockSkillsScroll).toHaveBeenCalledTimes(1);

        fireEvent.click(screen.getByText('Contact'));
        expect(mockContactScroll).toHaveBeenCalledTimes(1);
    });
});