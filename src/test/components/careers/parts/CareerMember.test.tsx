import React from 'react';
import { render, screen } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import CareerMember from '@/app/components/careers/parts/CareerMember';

/** CareerMemberのテストコード */
describe('<CareerMember />', () => {

    const mockCareerTitle  = 'Software Engineer Member';
    const mockCareerDetail = 'Managed a team of 5 developers';
    const mockClassName    = 'sample-class';

    /** テストの前準備 */
    beforeEach(() => {
        render(<CareerMember careerTitle={mockCareerTitle} careerDetail={mockCareerDetail} className={mockClassName} />);
    });

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {

        it('renders careerTitle correctly', () => {
            expect(screen.getByText(mockCareerTitle)).toBeInTheDocument();
        });

        it('renders careerDetail correctly', () => {
            expect(screen.getByText(mockCareerDetail)).toBeInTheDocument();
        });

        it('renders the colon between title and detail', () => {
            const colonElement = screen.getByText(':');
            expect(colonElement).toBeInTheDocument();
        });

        it('applies the correct className', () => {
            const careerElement = screen.getByText(mockCareerTitle).parentElement;
            expect(careerElement).toHaveClass(mockClassName);
        });

        it('applies the default className', () => {
            const defaultProps = {
                careerTitle: mockCareerTitle,
                careerDetail: mockCareerDetail
            }

            const {container} = render(<CareerMember {...defaultProps} />);
            const divElement = container.querySelector('div');
            expect(divElement).toHaveClass("flex pb-4");
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Negative Scenarios', () => {
        it('renders error message for missing props', () => {
            const defaultProps = {
                careerTitle: undefined as any,
                careerDetail: undefined as any,
                className: "sample-class"
            }

            render(<CareerMember {...defaultProps} />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
        });
    });
});