import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';

import { mockInitialData, mockRefData } from '@/test/mocks/mockData';

import { MESSAGES } from '@/app/shared/constants/constants';
import { useIntroData } from '@/app/contexts/introContext';
import About from '@/app/components/about/About';

// Mocks
jest.mock('next/link', () => {
    const MockedLink = ({ children }: { children: ReactNode }) => <>{children}</>;
    MockedLink.displayName = 'Link';
    return MockedLink;
});
jest.mock('@/app/contexts/introContext', () => ({
    useIntroData: jest.fn()
}));

/** Aboutコンポーネントテスト */
describe('<About />', () => {

    /** 各テストの前準備 */
    beforeEach(() => {
        (useIntroData as jest.Mock).mockReturnValue({
            introData: mockInitialData,
            refData: mockRefData
        });
    });

    /** 各テストの後処理 */
    afterEach(() => {
        jest.clearAllMocks();
    });

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('<About /> - Positive Scenarios', () => {
        it('renders the AboutContents component when data is available', () => {
            const { getByText, getByAltText } = render(<About />);

            expect(getByText('About')).toBeInTheDocument();
            expect(getByAltText('Profile background image')).toBeInTheDocument();
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('<About /> - Negative Scenarios', () => {
        it('renders the ErrorComponent when data is missing', () => {
            require('@/app/contexts/introContext').useIntroData.mockReturnValueOnce({
                introData: null,
                refData: { aboutRef: null }
            });

            const { getByText } = render(<About />);

            expect(getByText(MESSAGES.ERRORS.DATA_LOADING)).toBeInTheDocument();
        });
    });
});
