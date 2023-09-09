import React from 'react';
import { render, screen } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import ProfileContentsCard from '@/app/components/about/profile/ProfileContentsCard';
import { mockInitialData } from '@/test/mocks/mockData';
import { isEnvTest } from '@/app/shared/utils/utilities';

// Mocks
jest.mock('@/app/shared/utils/utilities', () => ({
    ...jest.requireActual('@/app/shared/utils/utilities'),
    isEnvTest: jest.fn()
}));

/** ProfileContentsCardコンポーネントテスト */
describe('<ProfileContentsCard/>', () => {
    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {
        it('renders the provided profileContents', () => {
            render(<ProfileContentsCard profileContents={mockInitialData.about_data.about_contents} />);

            mockInitialData.about_data.about_contents.forEach(content => {
                const contentElement = screen.getByText(content);
                expect(contentElement).toBeInTheDocument();
            });
        });

        it('has data-testid attribute when isEnvTest returns true', () => {
            (isEnvTest as jest.Mock).mockReturnValue(true);
            const { queryByTestId } = render(<ProfileContentsCard profileContents={['sample content']} />);
            expect(queryByTestId('profile-contents-card')).not.toBeNull();
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */
    describe('Negative Scenarios', () => {
        it('renders the error component when profileContents is empty', () => {
            render(<ProfileContentsCard profileContents={[]} />);
            const errorElement = screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS);
            expect(errorElement).toBeInTheDocument();
        });

        it('does not have data-testid attribute when isEnvTest returns false', () => {
            (isEnvTest as jest.Mock).mockReturnValue(false);
            const { queryByTestId } = render(<ProfileContentsCard profileContents={['sample content']} />);
            expect(queryByTestId('profile-contents-card')).toBeNull();
        });
    });
});