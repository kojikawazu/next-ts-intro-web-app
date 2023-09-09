import React from 'react';
import { render, screen } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { mockInitialData } from '@/test/mocks/mockData';
import ProfileCard from '@/app/components/about/profile/ProfileCard';

/** ProfileCardコンポーネントテスト */
describe('<ProfileCard/>', () => {
    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {
        it('renders the provided about_data', () => {
            render(<ProfileCard profileData={mockInitialData.about_data} />);

            const iconElement = screen.getByAltText('profile_icon');
            expect(iconElement).toBeInTheDocument();
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Negative Scenarios', () => {
        it('displays an error message when about_data is undefined', () => {
            render(<ProfileCard profileData={undefined as any} />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
        });
    });
});