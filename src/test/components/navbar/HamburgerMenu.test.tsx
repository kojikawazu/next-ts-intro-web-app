import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { useIntroData } from '@/app/contexts/introContext';
import { useScrollToRef } from '@/app/hooks/useScroll';
import { mockInitialData, mockRefData } from '@/test/mocks/mockData';
import { NavBarMenuType } from '@/app/types/NavBarMenuType';
import NavBarTitle from '@/app/components/navbar/title/NavBarTitle';
import HamburgerMenu from '@/app/components/navbar/HamburgerMenu';

// Mocks
jest.mock('@/app/contexts/introContext');
jest.mock('@/app/hooks/useScroll');

/** ハンバーガーメニューコンポーネントのテスト */
describe('<HamburgerMenu />', () => {
    const initialHeight = 'top-[-120%]';
    // Mocks
    let mockAboutScroll: jest.Mock;
    let mockCareerScroll: jest.Mock;
    let mockSkillsScroll: jest.Mock;
    let mockContactScroll: jest.Mock;
    let menuList: NavBarMenuType[] = [];
    let mockTitleScroll: jest.Mock;

    const renderHamburgerMenu = () => {
        render(<HamburgerMenu 
            menuList={menuList} 
            navBarTitleAriaLabel="Scroll to top" 
            navBarTitleBtnClass="sampleBtnClass"
            navBarTitleOnClick={mockTitleScroll}
            navBarTitleLabel="sampleLabel"
            />);
    }

    const renderErrorHamburgerMenu = () => {
        render(<HamburgerMenu 
            menuList={menuList} 
            navBarTitleAriaLabel="Scroll to top" 
            navBarTitleBtnClass=""
            navBarTitleOnClick={mockTitleScroll}
            navBarTitleLabel=""
            />);
    }

    /** 各テストの前準備 */
    beforeEach(() => {
        // Mock設定
        mockAboutScroll = jest.fn();
        mockCareerScroll = jest.fn();
        mockSkillsScroll = jest.fn();
        mockContactScroll = jest.fn();
        mockTitleScroll = jest.fn();

        (useIntroData as jest.Mock).mockReturnValue({
            introData: mockInitialData,
            refData: mockRefData
        });

        (useScrollToRef as jest.Mock)
            .mockReturnValueOnce(mockAboutScroll)
            .mockReturnValueOnce(mockCareerScroll)
            .mockReturnValueOnce(mockSkillsScroll)
            .mockReturnValueOnce(mockContactScroll);
        mockTitleScroll.mockReturnValueOnce(() => {});
        
        menuList = [
            { label: mockInitialData.navbar_data.about_name,   ariaLabel: "About",   action: mockAboutScroll },
            { label: mockInitialData.navbar_data.career_name,  ariaLabel: "Career",  action: mockCareerScroll },
            { label: mockInitialData.navbar_data.skills_name,  ariaLabel: "Skills",  action: mockSkillsScroll },
            { label: mockInitialData.navbar_data.contact_name, ariaLabel: "Contact", action: mockContactScroll }
        ];
    });

    /** 各テストの後処理 */
    afterEach(() => {
        jest.clearAllMocks();
    });

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {

        it('displays the menu items with the correct data', () => {
            renderHamburgerMenu();
            
            expect(screen.getByText('About')).toBeInTheDocument();
            expect(screen.getByText('Career')).toBeInTheDocument();
            expect(screen.getByText('Skills')).toBeInTheDocument();
            expect(screen.getByText('Contact')).toBeInTheDocument();
        });

        it('toggles the menu when hamburger button is clicked', async () => {
            renderHamburgerMenu();

            /// メニューが閉じているか確認
            const closedMenu = screen.getByRole('navigation', { hidden: true });
            expect(closedMenu).toHaveClass(initialHeight);

            // ハンバーガーボタンをクリックしてメニューを開く
            const openingButton = screen.getByRole('button', { name: "メニューを開く" });
            fireEvent.click(openingButton);

            // メニューが開いているか確認
            const openMenu = await screen.findByRole('navigation');
            expect(openMenu).not.toHaveClass(initialHeight);

            // ハンバーガーボタンを再度クリックしてメニューを閉じる
            const closingButton = screen.getByRole('button', { name: "メニューを閉じる" });
            fireEvent.click(closingButton);

            // メニューが再び閉じているか確認
            await waitFor(() => {
                expect(closedMenu).toHaveClass(initialHeight);
            });
        });

        it('calls the appropriate scroll function when each menu item is clicked', async () => {
            renderHamburgerMenu();

            const openingButton = screen.getByRole('button', { name: "メニューを開く" });
            fireEvent.click(openingButton);

            await waitFor(() => {
                const openMenu = screen.getByRole('navigation');
                expect(openMenu).not.toHaveClass(initialHeight);
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

        it('when the title is clicked, the appropriate scroll function is called.', async () => {
            renderHamburgerMenu();

            const openingButton = screen.getByRole('button', { name: "メニューを開く" });
            fireEvent.click(openingButton);

            await waitFor(() => {
                const openMenu = screen.getByRole('navigation');
                expect(openMenu).not.toHaveClass(initialHeight);
            });

            fireEvent.click(screen.getByText('sampleLabel'));
            expect(mockTitleScroll).toHaveBeenCalledTimes(1);
        });   
    });

    describe('Negative Scenarios', () => {
        it('displays error component when data is missing', () => {
            const originalError = console.error;
            console.error = () => {};
            renderErrorHamburgerMenu();
            
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
            console.error = originalError;
        });
    });
});