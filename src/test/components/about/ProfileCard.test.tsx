import React from 'react';
import { render, screen } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import ProfileCard from '@/app/components/about/ProfileCard';
import { mockInitialData } from '@/test/mocks/mockData';
import { isEnvTest } from '@/app/shared/utils/utilities';

// Mocks
jest.mock('@/app/shared/utils/utilities', () => ({
    ...jest.requireActual('@/app/shared/utils/utilities'),
    isEnvTest: jest.fn()
}));

/** ProfileCardコンポーネントテスト */
describe('<ProfileCard />', () => {
    /** Mockデータ */
    const mockNegativeProfileData = {
        about_name: "Test Name",
        about_icon_url: "Test Icon URL",
        about_img_url: "Test Image URL",
        sns_list: [],
        about_contents: [],
    };
    
    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {
        it('renders the provided about_data', () => {
            render(<ProfileCard profileData={mockInitialData.about_data} />);

            const iconElement = screen.getByAltText('profile_icon');
            expect(iconElement).toBeInTheDocument();

            const nameElement = screen.getByText(mockInitialData.about_data.about_name);
            expect(nameElement).toBeInTheDocument();

            const sample01IconElement = screen.getByAltText('sample01_image');
            expect(sample01IconElement).toBeInTheDocument();

            const sample02IconElement = screen.getByAltText('sample02_image');
            expect(sample02IconElement).toBeInTheDocument();
        });

        it('renders the correct links for icons', () => {
            render(<ProfileCard profileData={mockInitialData.about_data} />);
            
            const xLinkElement = screen.getByRole('link', { name: /sample01_image/ });
            expect(xLinkElement).toHaveAttribute('href', mockInitialData.about_data.sns_list[0].sns_url);
        
            const githubLinkElement = screen.getByRole('link', { name: /sample02_image/ });
            expect(githubLinkElement).toHaveAttribute('href', mockInitialData.about_data.sns_list[1].sns_url);
        });

        it('renders the correct links for icons', () => {
            render(<ProfileCard profileData={mockInitialData.about_data} profileIconSize={56} />);
            
            const profileIconWrapper = screen.getByAltText('profile_icon').parentElement;
            expect(profileIconWrapper).toHaveStyle({ width: '56px', height: '56px' });
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Negative Scenarios', () => {
        it('renders the error component when sns_list data is provided', () => {
            /** Mockデータ */
            const mockNegativeProfileData = {
                about_name: "Test Name",
                about_icon_url: "/Test_Icon_URL",
                about_img_url: "/Test_Image_URL",
                sns_list: [],
                about_contents: [],
            };

            render(<ProfileCard profileData={mockNegativeProfileData} />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
        });

        it('renders the error component when about_name data is provided', () => {
            /** Mockデータ */
            const mockNegativeProfileData = {
                about_name: "",
                about_icon_url: "/Test_Icon_URL",
                about_img_url: "/Test_Image_URL",
                sns_list: [
                    {
                        sns_name: "sample01",
                        sns_url: "/sample.com",
                        sns_img: "/sample_img.jpg"
                    },
                ],
                about_contents: [],
            };

            render(<ProfileCard profileData={mockNegativeProfileData} />);
            const nameElement = screen.getByText("unknown name");
            expect(nameElement).toBeInTheDocument();
        });

        it('does not have data-testid attribute when isEnvTest returns false', () => {
            (isEnvTest as jest.Mock).mockReturnValue(false);
            const { queryByTestId } = render(<ProfileCard profileData={mockNegativeProfileData} />);
            expect(queryByTestId('profile-contents-card')).toBeNull();
        });
    });
});