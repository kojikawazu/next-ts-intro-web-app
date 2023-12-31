import React from 'react';
import { render } from '@testing-library/react';
import ArrowIcon from '@/app/components/common/icons/ArrowIcon';

/** ArrowIconコンポーネントのテスト */
describe('<ArrowIcon />', () => {

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {
        
        it('renders the arrow icon with default props', () => {
            const { getByLabelText } = render(<ArrowIcon />);
            const icon = getByLabelText('arrow icon');
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveClass('rotate-0');
        });

        it('renders the arrow icon with custom angle', () => {
            const { getByLabelText } = render(<ArrowIcon angleCSS="rotate-90" />);
            const icon = getByLabelText('arrow icon');
            expect(icon).toHaveClass('rotate-90');
            const parent = icon.parentElement;
            expect(parent).toHaveStyle({width: "18px"});
            expect(parent).toHaveStyle({height: "18px"});
        });

        it('renders the arrow icon with custom size', () => {
            const { getByLabelText } = render(<ArrowIcon iconSize={8} />);
            const icon = getByLabelText('arrow icon');
        });

        it('renders the arrow icon with custom aria label', () => {
            const { getByLabelText } = render(<ArrowIcon ariaLabel="custom label" />);
            const icon = getByLabelText('custom label');
            expect(icon).toBeInTheDocument();
            const parent = icon.parentElement;
            expect(parent).toHaveStyle({width: "18px"});
            expect(parent).toHaveStyle({height: "18px"});
        });
    });
});