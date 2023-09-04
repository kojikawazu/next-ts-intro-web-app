import React from 'react';
import { render, screen } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { useIntroData } from '@/app/contexts/introContext';
import Hero from '@/app/components/hero/Hero';

// Mocks
jest.mock('@/app/contexts/introContext', () => ({
    useIntroData: jest.fn(),
}));

/** Heroコンポーネントテスト */
describe('<Hero />', () => {
    /** 各テストの前準備 */
    beforeEach(() => {
        const mockHeroData = {
            hero_img_url: '/path/to/your/image.jpg',
        };

        (useIntroData as jest.Mock).mockReturnValue({
            introData: { hero_data: mockHeroData },
        });
    }); 
    
    describe('Positive Scenarios', () => {
        it('renders the hero image', () => {
            render(<Hero />);

            const imageElement = screen.getByAltText('hero_background');
            expect(imageElement).toBeInTheDocument();
        });
    });

    describe('Negative Scenarios', () => {
        it('renders ErrorComponent when introData is missing', () => {
            (useIntroData as jest.Mock).mockReturnValue({
                introData: null,
            });

            render(<Hero />);
            expect(screen.getByText(MESSAGES.ERRORS.DATA_LOADING)).toBeInTheDocument();
        });

        it('renders ErrorComponent when hero_data is missing', () => {
            (useIntroData as jest.Mock).mockReturnValue({
                introData: { someOtherData: {} },
            });
        
            render(<Hero />);
            expect(screen.getByText(MESSAGES.ERRORS.DATA_LOADING)).toBeInTheDocument();
        });
    });
});