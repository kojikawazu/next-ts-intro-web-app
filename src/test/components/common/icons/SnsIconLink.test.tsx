import React from 'react';
import { render } from '@testing-library/react';
import SnsIconLink from '@/app/components/common/icons/SnsIconLink';

/** SnsIconLinkのテストコード */
describe('<SnsIconLink />', () => {

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */
    
    describe('Positive Scenarios', () => {
        
        it('renders the image correctly with provided alt text', () => {
            const { getByAltText } = render(
              <SnsIconLink url="https://example.com" imageSrc="/path/to/sns-icon.jpg" imageAlt="Test SNS Icon" />
            );
            const image = getByAltText('Test SNS Icon');
            expect(image).toBeInTheDocument();
        });
        
        it('renders the image with default alt text if none is provided', () => {
            const { getByAltText } = render(
              <SnsIconLink url="https://example.com" imageSrc="/path/to/sns-icon.jpg" />
            );
            const image = getByAltText('SNS icon');
            expect(image).toBeInTheDocument();
        });
        
        it('applies the default size to the image', () => {
            const { getByRole } = render(
              <SnsIconLink url="https://example.com" imageSrc="/path/to/sns-icon.jpg" />
            );
            const linkWrapper = getByRole('link');
            expect(linkWrapper.firstChild).toHaveStyle({ width: '48px', height: '48px' });
        });
        
        it('applies the custom size to the image', () => {
            const { getByRole } = render(
              <SnsIconLink url="https://example.com" imageSrc="/path/to/sns-icon.jpg" imageSize={96} />
            );
            const linkWrapper = getByRole('link');
            expect(linkWrapper.firstChild).toHaveStyle({ width: '96px', height: '96px' });
        });
        
        it('applies the custom class to the image', () => {
            const { getByAltText } = render(
              <SnsIconLink url="https://example.com" imageSrc="/path/to/sns-icon.jpg" imageClassName="custom-class" />
            );
            const image = getByAltText('SNS icon');
            expect(image).toHaveClass('custom-class');
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */
    
    describe('Negative Scenarios', () => {
      it('applies the custom size to the image', () => {
        const { getByRole } = render(
          <SnsIconLink url="https://example.com" imageSrc="/path/to/sns-icon.jpg" imageSize={-1} />
        );
        const linkWrapper = getByRole('link');
        expect(linkWrapper.firstChild).toHaveStyle({ width: '48px', height: '48px' });
      });
    });
});