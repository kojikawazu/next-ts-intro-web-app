import React from 'react';
import { render, screen } from '@testing-library/react';

import { MESSAGES } from '@/app/shared/constants/constants';
import ProfileCard from '@/app/components/about/ProfileCard';
import { useIntroData } from '@/app/contexts/introContext';

// Mocks
jest.mock('@/app/contexts/introContext', () => ({
  useIntroData: jest.fn(),
}));

/** ProfileCardコンポーネントテスト */
describe('<ProfileCard />', () => {
    /** テストデータ */
    const mockAboutData = {
        intro_icon_url: '/path/to/icon.jpg',
        intro_name: 'John Doe',
        intro_x_url: '/link-to-x',
        intro_x_img: '/path/to/x-img.jpg',
        intro_github_url: '/link-to-github',
        intro_github_img: '/path/to/github-img.jpg',
    };

    /** 各テストの前準備 */
    beforeEach(() => {
        (useIntroData as jest.Mock).mockReturnValue({
            introData: { about_data: mockAboutData },
        });
    });

    /** 各テストの後処理 */
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('<ProfileCard /> - Positive Scenarios', () => {
        it('renders the provided about_data', () => {
            render(<ProfileCard />);

            const iconElement = screen.getByAltText('about_icon');
            expect(iconElement).toBeInTheDocument();

            const nameElement = screen.getByText(mockAboutData.intro_name);
            expect(nameElement).toBeInTheDocument();

            const xIconElement = screen.getByAltText('skill_icon_x');
            expect(xIconElement).toBeInTheDocument();

            const githubIconElement = screen.getByAltText('skill_icon_github');
            expect(githubIconElement).toBeInTheDocument();
        });

        it('renders the correct links for icons', () => {
            render(<ProfileCard />);
            
            const xLinkElement = screen.getByRole('link', { name: /skill_icon_x/ });
            expect(xLinkElement).toHaveAttribute('href', mockAboutData.intro_x_url);
        
            const githubLinkElement = screen.getByRole('link', { name: /skill_icon_github/ });
            expect(githubLinkElement).toHaveAttribute('href', mockAboutData.intro_github_url);
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('<ProfileCard /> - Negative Scenarios', () => {
        it('renders the error component when no data is provided', () => {
            (useIntroData as jest.Mock).mockReturnValue({});
            render(<ProfileCard />);
            expect(screen.getByText(MESSAGES.ERRORS.DATA_LOADING)).toBeInTheDocument();
        });

        it('renders the error component when about_data is missing', () => {
            (useIntroData as jest.Mock).mockReturnValue({ introData: {} });
            render(<ProfileCard />);
            expect(screen.getByText(MESSAGES.ERRORS.DATA_LOADING)).toBeInTheDocument();
        });
    });
});