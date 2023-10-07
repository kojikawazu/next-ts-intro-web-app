import React from 'react';
import { render, screen } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import AboutContents from '@/app/components/about/AboutContents';
import { mockInitialData } from '@/test/mocks/mockData';
import { isEnvTest } from '@/app/shared/utils/utilities';

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
jest.mock('@/app/shared/utils/utilities', () => ({
    ...jest.requireActual('@/app/shared/utils/utilities'),
    isEnvTest: jest.fn()
}));

/** AboutContentsコンポーネントテスト */
describe('<AboutContents />', () => {
    const defaultProps = {
        aboutData: mockInitialData.about_data
    }

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {
        it('renders the component with the provided image URL', () => {
            render( <AboutContents {...defaultProps} /> );
            const imageElement = screen.getByAltText('Profile background image') as HTMLImageElement;
            expect(imageElement).toBeInTheDocument();
            expect(imageElement.src).toBe("https://example.com/img.jpg");
        });

        it('renders the ProfileCard and ProfileContentsCard', () => {
            (isEnvTest as jest.Mock).mockReturnValue(true);
            render( <AboutContents {...defaultProps} /> );
            
            // ProfileCard のトップレベルエレメントに `data-testid="profile-card"` を追加することを想定
            const profileCard = screen.queryByTestId('profile-standard-card');
            expect(profileCard).toBeInTheDocument();
            
            // ProfileContentsCard のトップレベルエレメントに `data-testid="profile-contents-card"` を追加することを想定
            const profileContentsCard = screen.queryByTestId('profile-contents-card');
            expect(profileContentsCard).toBeInTheDocument();
        });
    });

    describe('Negative Scenarios', () => {
        it('renders the component with the provided image URL', () => {
            const originalError = console.error;
            console.error = () => {};
            const errorProps = {
                aboutData: undefined
            }

            render( <AboutContents {...errorProps as any} /> );
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
            console.error = originalError;
        });
    });
});

