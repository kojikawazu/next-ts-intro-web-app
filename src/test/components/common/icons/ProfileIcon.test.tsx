import React from 'react';
import { render } from '@testing-library/react';
import ProfileIcon from '@/app/components/common/icons/ProfileIcon';

/** ProfileIconのテストコード */
describe('<ProfileIcon />', () => {

    describe('Positive Scenarios', () => {
        it('renders the image correctly', () => {
            const { getByAltText } = render(<ProfileIcon src="/path/to/image.jpg" alt="Test Image" />);
            const image = getByAltText('Test Image');
            expect(image).toBeInTheDocument();
        });
        
        it('applies the default size', () => {
            const { container } = render(<ProfileIcon src="/path/to/image.jpg" alt="Test Image" />);
            const div = container.firstChild;
            expect(div).toBeDefined();
            expect(div).toHaveStyle({ width: '48px', height: '48px' });
        });
        
        it('applies the custom size', () => {
            const { container } = render(<ProfileIcon src="/path/to/image.jpg" alt="Test Image" size={96} />);
            const div = container.firstChild;
            expect(div).toHaveStyle({ width: '96px', height: '96px' });
        });
    });

    describe('Negative Scenarios', () => {

        it('does not apply negative size', () => {
            const { container } = render(<ProfileIcon src="/path/to/image.jpg" alt="Test Image" size={-48} />);
            const div = container.firstChild;
            expect(div).toHaveStyle({ width: '48px', height: '48px' });
        });
    });
});