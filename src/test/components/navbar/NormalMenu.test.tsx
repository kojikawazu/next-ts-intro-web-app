import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NormalMenu from '@/app/components/navbar/NormalMenu';
import { useIntroData } from '@/app/contexts/introContext';
import { useScrollToRef } from '@/app/hooks/useScrol';

// Mocks
jest.mock('@/app/contexts/introContext');
jest.mock('@/app/hooks/useScrol');

/** NormalMenuコンポーネントのテスト */
describe('<NormalMenu />', () => {
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
                    about_name:   "About",
                    career_name:  "Career",
                    skills_name:  "Skills",
                    contact_name: "Contact"
                }
            },
            refData: {
                aboutRef:   { current: {} },
                careerRef:  { current: {} },
                skillsRef:  { current: {} },
                contactRef: { current: {} }
            }
        });

        (useScrollToRef as jest.Mock)
            .mockReturnValueOnce(mockAboutScroll)
            .mockReturnValueOnce(mockCareerScroll)
            .mockReturnValueOnce(mockSkillsScroll)
            .mockReturnValueOnce(mockContactScroll);
    });

    it('renders the menu items correctly', () => {
        render(<NormalMenu />);

        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Career')).toBeInTheDocument();
        expect(screen.getByText('Skills')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('calls the correct scroll function when each button is clicked', () => {
        render(<NormalMenu />);

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