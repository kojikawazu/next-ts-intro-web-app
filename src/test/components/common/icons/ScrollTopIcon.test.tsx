import React from 'react';
import { render } from '@testing-library/react';
import ScrollTopIcon from '@/app/components/common/icons/ScrollTopIcon'; // パスを適切に調整してください

/** ScrollTopIconのテストコード */
describe('<ScrollTopIcon />', () => {
    
    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {
        it('renders without crashing', () => {
            render(<ScrollTopIcon />);
        });

        it('renders with default size', () => {
            const { container } = render(<ScrollTopIcon />);
            const svg = container.querySelector('svg');

            expect(svg).toHaveClass('w-8');
            expect(svg).toHaveClass('h-8');
        });

        it('renders with custom size', () => {
            const customSize = 16;
            const { container } = render(<ScrollTopIcon iconSize={customSize} />);
            const svg = container.querySelector('svg');

            expect(svg).toHaveClass(`w-${customSize}`);
            expect(svg).toHaveClass(`h-${customSize}`);
        });

        it('renders with default aria-label', () => {
            const { container } = render(<ScrollTopIcon />);
            const svg = container.querySelector('svg');

            expect(svg).toHaveAttribute('aria-label', 'scroll-top-icon');
        });

        it('renders with custom aria-label', () => {
            const customAriaLabel = "custom-aria";
            const { container } = render(<ScrollTopIcon ariaLabel={customAriaLabel} />);
            const svg = container.querySelector('svg');

            expect(svg).toHaveAttribute('aria-label', customAriaLabel);
        });
    });
});