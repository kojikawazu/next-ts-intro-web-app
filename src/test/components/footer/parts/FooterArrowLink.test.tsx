import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import FooterArrowLink from '@/app/components/footer/parts/FooterArrowLink';

const defaultProps = {
    className: "sample class",
    ariaLabel: "aria label",
    onClick: () => {},
    icon: <span>Test Icon</span>
}

// Mocks
jest.mock('@/app/components/common/icons/ScrollTopIcon');

/** FooterArrowLinkのテストコード */
describe('<FooterArrowLink />', () => {

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {
        it('renders the link with default props', () => {
            render( <FooterArrowLink {...defaultProps} /> );
            expect(screen.getByLabelText("aria label")).toBeInTheDocument();
            expect(screen.getByLabelText("aria label")).toHaveClass("sample class");
        });

        it('does not apply the default class when not provided', () => {
            const innerProps = {
                ariaLabel: "aria label",
                onClick: () => {},
                icon: <span>Test Icon</span>
            }

            render( <FooterArrowLink {...innerProps} /> );
            expect(screen.getByLabelText("aria label")).not.toHaveClass("sample class");
        });

        it('does not apply the default ariaLabel when not provided', () => {
            const innerProps = {
                className: "sample class",
                onClick: () => {},
                icon: <span>Test Icon</span>
            }

            render( <FooterArrowLink {...innerProps} /> );
            expect(screen.getByLabelText("footer arrow link")).toHaveClass("sample class");
        });

        it('fires the click event handler when link is clicked', () => {
            const handleClick = jest.fn();
            render( <FooterArrowLink {...defaultProps} onClick={handleClick} /> );
            fireEvent.click(screen.getByLabelText("aria label"));
            expect(handleClick).toHaveBeenCalledTimes(1);
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Negative Scenarios', () => {
        it('renders error message when onClick is undefined', () => {
            const innerProps = {
                onClick: undefined,
            }

            render( <FooterArrowLink {...innerProps as any} /> );
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
        });
    });
});