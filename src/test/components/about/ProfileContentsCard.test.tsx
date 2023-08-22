import React from 'react';
import { render, screen } from '@testing-library/react';

import { MESSAGES } from '@/app/shared/constants/constants';
import { useIntroData } from '@/app/contexts/introContext';
import ProfileContentsCard from '@/app/components/about/ProfileContentsCard';

// Mocks
jest.mock('@/app/contexts/introContext', () => ({
  useIntroData: jest.fn(),
}));

/** ProfileContentsCardコンポーネントテスト */
describe('<ProfileContentsCard/>', () => {
    /** コンテンツデータ */
    const mockIntroContents = {
        about_data: {
            intro_contents: ['Content 1', 'Content 2', 'Content 3'],
        },
    };

    /** 各テストの前準備 */
    beforeEach(() => {
        (useIntroData as jest.Mock).mockReturnValue({
            introData: mockIntroContents,
        });
    });

    /** 各テストの後処理 */
    afterEach(() => {
        jest.resetAllMocks();
    });

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('<ProfileContentsCard /> - Positive Scenarios', () => {
        it('renders the provided intro_contents', () => {
            render(<ProfileContentsCard />);

            mockIntroContents.about_data.intro_contents.forEach(content => {
                const contentElement = screen.getByText(content);
                expect(contentElement).toBeInTheDocument();
            });
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */
    describe('<ProfileContentsCard /> - Negative Scenarios', () => {
        it('renders the error component when there is no introData', () => {
            (useIntroData as jest.Mock).mockReturnValue({});
            
            render(<ProfileContentsCard />);
            
            const errorElement = screen.getByText(MESSAGES.ERRORS.DATA_LOADING);
            expect(errorElement).toBeInTheDocument();
        });

        it('renders the error component when there is introData but no about_data', () => {
            (useIntroData as jest.Mock).mockReturnValue({
                introData: {}
            });
            
            render(<ProfileContentsCard />);
            
            const errorElement = screen.getByText(MESSAGES.ERRORS.DATA_LOADING);
            expect(errorElement).toBeInTheDocument();
        });
    });
});