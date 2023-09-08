import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FooterCopyRight from '@/app/components/footer/parts/FooterCopyRight';

const defaultProps = {
    className: "sample class",
    label: "sample label"
}

/** FooterCopyRightのテストコード */
describe('<FooterCopyRight />', () => {

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {
        it('renders the component with the provided props', () => {
            render( <FooterCopyRight {...defaultProps} /> );
            expect(screen.getByText("sample label")).toBeInTheDocument();
            expect(screen.getByText("sample label")).toHaveClass("sample class");
        });

        it('does not assign default className when not provided', () => {
            const innerProps = {
                label: "sample label"
            }

            render( <FooterCopyRight {...innerProps} /> );
            expect(screen.getByText("sample label")).not.toHaveClass("sample class");
        });

        it('displays default label text when label prop is not provided', () => {
            const innerProps = {
                className: "sample class"
            }

            render( <FooterCopyRight {...innerProps} /> );
            expect(screen.getByText("copy right")).toBeInTheDocument();
        });
    });
});