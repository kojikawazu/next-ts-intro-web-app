import React from 'react';
import { render } from '@testing-library/react';
import AboutContents from '@/app/components/about/AboutContents';
import { mockInitialData } from '@/test/mocks/mockData';

// Types
type MockedImageProps = {
    src: string;
    alt: string;
};

// Mocks
jest.mock('next/image', () => {
    return function MockedImage({ src, alt, ...rest }: MockedImageProps) {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={src} alt={alt} {...rest} />;
    };
});

/** AboutContentsコンポーネントテスト */
describe('<AboutContents />', () => {
    const mockImageUrl = 'https://example.com/profile.jpg';

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('<AboutContents /> - Positive Scenarios', () => {
        it('renders the component with the provided image URL', () => {
            const { getByAltText } = render(
                <AboutContents aboutData={mockInitialData.about_data} introImgUrl={mockImageUrl} />
            );
            
            const imageElement = getByAltText('Profile background image') as HTMLImageElement;
            expect(imageElement).toBeInTheDocument();
            expect(imageElement.src).toBe(mockImageUrl);
        });

        it('renders the ProfileCard and ProfileContentsCard', () => {
            const { queryByTestId } = render(
                <AboutContents aboutData={mockInitialData.about_data} introImgUrl={mockImageUrl} />
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

