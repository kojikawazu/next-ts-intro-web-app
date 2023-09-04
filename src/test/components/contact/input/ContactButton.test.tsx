import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ContactButton from '@/app/components/contact/input/ContactButton';

/** ContactButtonのテストコード */
describe('<ContactButton />', () => {

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {
        it('renders correctly with provided props', () => {
          const { getByText } = render(
            <ContactButton btnType="button" btnName="Test Button" />
          );
      
          expect(getByText('Test Button')).toBeInTheDocument();
        });
      
        it('fires the onClick event when clicked', () => {
          const handleClick = jest.fn();
      
          const { getByText } = render(
            <ContactButton btnType="button" btnName="Click Me" onClick={handleClick} />
          );
      
          fireEvent.click(getByText('Click Me'));
      
          expect(handleClick).toHaveBeenCalledTimes(1);
        });
      
        it('applies default and custom class names', () => {
          const { container } = render(
            <ContactButton 
              btnType="button" 
              btnName="Styled Button" 
              className="custom-class" />
          );
      
          expect(container.firstChild).toHaveClass('btn btn-primary bg-lblue p-3 w-3/4 ssm:w-[350px] h-[60px] rounded-xl shadow-lg custom-class');
        });
      
        it('sets the correct aria-label', () => {
          const { getByLabelText } = render(
            <ContactButton btnType="button" btnName="Test Button" ariaLabel="Aria Label" />
          );
      
          expect(getByLabelText('Aria Label')).toBeInTheDocument();
        });
      
        it('defaults aria-label to btnName if not provided', () => {
          const { getByLabelText } = render(
            <ContactButton btnType="button" btnName="Test Button" />
          );
      
          expect(getByLabelText('Test Button')).toBeInTheDocument();
        });
    });
});
