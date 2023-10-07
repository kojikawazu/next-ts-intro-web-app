import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import FooterTitleBtn from '@/app/components/footer/parts/FooterTitleBtn';

const defaultProps = {
    className: "sample class",
    ariaLabel: "aria label",
    onClick: () => {},
    labelClassName: "label sample class",
    label: "sample label"
}

/** FooterTitleBtnのテストコード */
describe('<FooterTitleBtn />', () => {

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {
        it('renders the component with the provided props and checks class assignments', () => {
            render( <FooterTitleBtn {...defaultProps} /> );
            expect(screen.getByLabelText("aria label")).toBeInTheDocument();
            expect(screen.getByLabelText("aria label")).toHaveClass("sample class");
            expect(screen.getByText("sample label")).toBeInTheDocument();
            expect(screen.getByText("sample label")).toHaveClass("label sample class");
        });

        it('does not apply the default className when className is not provided', () => {
            const innerProps = {
                ariaLabel: "aria label",
                onClick: () => {},
                labelClassName: "label sample class",
                label: "sample label"
            }

            render( <FooterTitleBtn {...innerProps} /> );
            expect(screen.getByLabelText("aria label")).not.toHaveClass("sample class");
        });

        it('renders with default ariaLabel when not provided', () => {
            const innerProps = {
                className: "sample class",
                onClick: () => {},
                labelClassName: "label sample class",
                label: "sample label"
            }

            render( <FooterTitleBtn {...innerProps} /> );
            expect(screen.getByLabelText("footer title btn")).toHaveClass("sample class");
        });

        it('does not apply the default labelClassName when it is not provided', () => {
            const innerProps = {
                className: "sample class",
                ariaLabel: "aria label",
                onClick: () => {},
                label: "sample label"
            }

            render( <FooterTitleBtn {...innerProps} /> );
            expect(screen.getByText("sample label")).not.toHaveClass("label sample class");
        });

        it('triggers the onClick event handler', () => {
            const handleClick = jest.fn();
            render( <FooterTitleBtn {...defaultProps} onClick={handleClick} /> );
            fireEvent.click(screen.getByLabelText("aria label"));
            expect(handleClick).toHaveBeenCalledTimes(1);
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Negative Scenarios', () => {
        it('displays an error when label prop is empty', () => {
            const originalError = console.error;
            console.error = () => {};
            const errorProps = {
                className: "sample class",
                ariaLabel: "aria label",
                onClick: () => {},
                labelClassName: "label sample class",
                label: ""
            }

            render( <FooterTitleBtn {...errorProps} /> );
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
            console.error = originalError;
        });
    });
});