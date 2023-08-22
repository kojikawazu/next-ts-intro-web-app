import React from 'react';
import { render } from '@testing-library/react';
import { IntroDataProvider } from '@/app/contexts/introContext';
import AboutContents from '@/app/components/about/AboutContents';
import { mockInitialData, mockRefData } from '@/test/mocks/mockData';

// Types
type MockedImageProps = {
    src: string;
    alt: string;
};

// Mocks
jest.mock('next/image', () => {
    return function MockedImage({ src, alt }: MockedImageProps) {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={src} alt={alt} />;
    };
});

/** AboutContentsコンポーネントテスト */
describe('<AboutContents />', () => {
    const mockImageUrl = 'https://example.com/profile.jpg';
    const expectedUrl = `http://localhost/_next/image?url=${encodeURIComponent(mockImageUrl)}&w=3840&q=75`;

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('<AboutContents /> - Positive Scenarios', () => {
        it('renders the component with the provided image URL', () => {
            const { getByAltText } = render(
                <IntroDataProvider initialData={mockInitialData} initialRefData={mockRefData}>
                    <AboutContents intro_img_url={mockImageUrl} />
                </IntroDataProvider>
            );
            
            const imageElement = getByAltText('Profile background image') as HTMLImageElement;
            expect(imageElement).toBeInTheDocument();
            expect(imageElement.src).toBe(expectedUrl);
        });

        it('renders the ProfileCard and ProfileContentsCard', () => {
            const { queryByTestId } = render(
                <IntroDataProvider initialData={mockInitialData} initialRefData={mockRefData}>
                    <AboutContents intro_img_url={mockImageUrl} />
                </IntroDataProvider>
            );
            
            // ProfileCard のトップレベルエレメントに `data-testid="profile-card"` を追加することを想定
            const profileCard = queryByTestId('profile-card');
            expect(profileCard).toBeInTheDocument();
            
            // ProfileContentsCard のトップレベルエレメントに `data-testid="profile-contents-card"` を追加することを想定
            const profileContentsCard = queryByTestId('profile-contents-card');
            expect(profileContentsCard).toBeInTheDocument();
        });
    });
});

