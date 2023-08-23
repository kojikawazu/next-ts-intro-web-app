import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { mockInitialData, mockRefData } from '@/test/mocks/mockData';
import { MESSAGES } from '@/app/shared/constants/constants';
import { useIntroData } from '@/app/contexts/introContext';
import { useScrollToRef } from '@/app/hooks/useScroll';
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
    });

    /** 各テストの後処理 */
    afterEach(() => {
        jest.clearAllMocks();
    });

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('<NormalMenu /> - Positive Scenarios', () => {
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

    describe('<NormalMenu /> - Negative Scenarios', () => {
        it('renders ErrorComponent when introData is missing', () => {
            (useIntroData as jest.Mock).mockReturnValue({
                introData: null,
                refData: mockRefData
            });
            
            render(<NormalMenu />);
            expect(screen.getByText(MESSAGES.ERRORS.DATA_LOADING)).toBeInTheDocument();
        });
    
        it('renders ErrorComponent when refData is missing', () => {
            (useIntroData as jest.Mock).mockReturnValue({
                introData: mockInitialData,
                refData: null
            });
            
            render(<NormalMenu />);
            expect(screen.getByText(MESSAGES.ERRORS.DATA_LOADING)).toBeInTheDocument();
        });
    });
});