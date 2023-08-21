import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '@/app/components/hero/Hero';
import { useIntroData } from '@/app/contexts/introContext';

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
    
    it('renders the hero image', () => {
        render(<Hero />);

        const imageElement = screen.getByAltText('hero_background');
        expect(imageElement).toBeInTheDocument();
    });
});