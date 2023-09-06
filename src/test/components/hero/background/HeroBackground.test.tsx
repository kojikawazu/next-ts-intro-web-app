import React from 'react';
import { render, screen } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import HeroBackground from '@/app/components/hero/background/HeroBackground';

/** HeroBackgroundコンポーネントテスト */
describe('<HeroBackground />', () => {
    const defaultProps = {
        url: '/path/to/image.jpg',
        alt: 'Test Alt Text',
        coverBackgroundColor: 'bg-red-500'
    };

    describe('Positive Scenarios', () => {
        it('renders the image with correct src and alt', () => {
            const expectedSrc = "/_next/image?url=%2Fpath%2Fto%2Fimage.jpg&w=3840&q=75"
            render(<HeroBackground {...defaultProps} />);

            const imageElement = screen.getByRole('img');
            expect(imageElement).toHaveAttribute('src', expectedSrc);
            expect(imageElement).toHaveAttribute('alt', defaultProps.alt);
        });

        it('renders the background div with correct classes', () => {
            render(<HeroBackground {...defaultProps} />);
    
            const imageElement  = screen.getByAltText('Test Alt Text');
            const backgroundDiv = imageElement.nextElementSibling;
    
            expect(backgroundDiv).toHaveClass('absolute', 'top-0', 'left-0', 'w-full', 'h-[50vh]', 'sssm:h-screen', 'bg-red-500');
        });
    
        it('renders the image with default alt if none provided', () => {
            render(<HeroBackground url={defaultProps.url} coverBackgroundColor={defaultProps.coverBackgroundColor} />);
    
            const imageElement = screen.getByRole('img');
            expect(imageElement).toHaveAttribute('alt', 'hero background');
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Negative Scenarios', () => {
        it('displays an error message when provided with an empty url', () => {
            render(<HeroBackground url="" coverBackgroundColor="bg-red-500" />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
        });

        it('displays an error message when provided with an empty coverBackgroundColor', () => {
            render(<HeroBackground url="/path/to/image.jpg" coverBackgroundColor="" />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
        });
    });
});