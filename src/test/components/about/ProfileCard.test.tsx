import React from 'react';
import { render, screen } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import ProfileCard from '@/app/components/about/ProfileCard';
import { mockInitialData } from '@/test/mocks/mockData';

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
            expect(screen.getByText(MESSAGES.ERRORS.DATA_LOADING)).toBeInTheDocument();
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
    });
});