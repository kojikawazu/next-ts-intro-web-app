import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { mockInitialData, mockRefData } from '@/test/mocks/mockData';
import { MESSAGES } from '@/app/shared/constants/constants';
import { useIntroData } from '@/app/contexts/introContext';
import { useScrollToRef } from '@/app/hooks/useScroll';
import { NavBarMenuType } from '@/app/types/NavBarMenuType';
import NormalMenu from '@/app/components/navbar/NormalMenu';

// Mocks
jest.mock('@/app/contexts/introContext');
jest.mock('@/app/hooks/useScroll');

/** NormalMenuコンポーネントのテスト */
describe('<NormalMenu />', () => {
    let mockAboutScroll: jest.Mock;
    let mockCareerScroll: jest.Mock;
    let mockSkillsScroll: jest.Mock;
    let mockContactScroll: jest.Mock;
    let menuList: NavBarMenuType[] = [];

    /** 各テストの前準備 */
    beforeEach(() => {
        mockAboutScroll = jest.fn();
        mockCareerScroll = jest.fn();
        mockSkillsScroll = jest.fn();
        mockContactScroll = jest.fn();

        (useIntroData as jest.Mock).mockReturnValue({
            introData: mockInitialData,
            refData: mockRefData
        });

        (useScrollToRef as jest.Mock)
            .mockReturnValueOnce(mockAboutScroll)
            .mockReturnValueOnce(mockCareerScroll)
            .mockReturnValueOnce(mockSkillsScroll)
            .mockReturnValueOnce(mockContactScroll);
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
        it('renders the menu items correctly', () => {
            render(<NormalMenu menuList={menuList} />);

            expect(screen.getByText('About')).toBeInTheDocument();
            expect(screen.getByText('Career')).toBeInTheDocument();
            expect(screen.getByText('Skills')).toBeInTheDocument();
            expect(screen.getByText('Contact')).toBeInTheDocument();
        });

        it('calls the correct scroll function when each button is clicked', () => {
            const menuList = [
                { label: mockInitialData.navbar_data.about_name,   ariaLabel: "About",   action: mockAboutScroll },
                { label: mockInitialData.navbar_data.career_name,  ariaLabel: "Career",  action: mockCareerScroll },
                { label: mockInitialData.navbar_data.skills_name,  ariaLabel: "Skills",  action: mockSkillsScroll },
                { label: mockInitialData.navbar_data.contact_name, ariaLabel: "Contact", action: mockContactScroll }
            ];
            
            render(<NormalMenu menuList={menuList} />);
    
            fireEvent.click(screen.getByText('About'));
            expect(mockAboutScroll).toHaveBeenCalled();
    
            fireEvent.click(screen.getByText('Career'));
            expect(mockCareerScroll).toHaveBeenCalled();
    
            fireEvent.click(screen.getByText('Skills'));
            expect(mockSkillsScroll).toHaveBeenCalled();
    
            fireEvent.click(screen.getByText('Contact'));
            expect(mockContactScroll).toHaveBeenCalled();
        });
    });

    describe('Negative Scenarios', () => {
        it('renders ErrorComponent when introData is missing', () => {
            render(<NormalMenu menuList={[]} />);
            expect(screen.getByText(MESSAGES.ERRORS.DATA_LOADING)).toBeInTheDocument();
        });
    });
});