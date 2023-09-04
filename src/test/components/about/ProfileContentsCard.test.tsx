import React from 'react';
import { render, screen } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import ProfileContentsCard from '@/app/components/about/ProfileContentsCard';
import { mockInitialData } from '@/test/mocks/mockData';

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
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */
    describe('Negative Scenarios', () => {
        it('renders the error component when profileContents is empty', () => {
            render(<ProfileContentsCard profileContents={[]} />);
            
            const errorElement = screen.getByText(MESSAGES.ERRORS.DATA_LOADING);
            expect(errorElement).toBeInTheDocument();
        });
    });
});