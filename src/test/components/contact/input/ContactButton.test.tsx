import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
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
          
          const button = getByText('Test Button');
          expect(button).toBeInTheDocument();
          expect(button).toHaveAttribute('type', 'button');
        });

        it('renders with correct default button type', () => {
          const { getByText } = render(<ContactButton btnName="Test Button" />);
          const button = getByText('Test Button');
          expect(button).toHaveAttribute('type', 'submit');
        });
      
        it('applies default and custom class names', () => {
          const { container } = render(
            <ContactButton 
              btnType="button" 
              btnName="Styled Button" 
              className="custom-class" />
          );
      
          expect(container.firstChild).toHaveClass('btn btn-primary bg-lblue rounded-xl shadow-lg custom-class');
        });

        it('applies default and custom default class names', () => {
          const { container } = render(
            <ContactButton 
              btnType="button" 
              btnName="Styled Button" />
          );
      
          expect(container.firstChild).toHaveClass('btn btn-primary bg-lblue rounded-xl shadow-lg');
        });
      
        it('sets the correct aria-label', () => {
          const { getByLabelText } = render(
            <ContactButton 
              btnType="button" 
              btnName="Test Button" 
              ariaLabel="Aria Label" />
          );
      
          expect(getByLabelText('Aria Label')).toBeInTheDocument();
        });
      
        it('defaults aria-label to btnName if not provided', () => {
          const { getByLabelText } = render(
            <ContactButton btnType="button" btnName="Test Button" />
          );
      
          expect(getByLabelText('Test Button')).toBeInTheDocument();
        });

        it('fires the onClick event when clicked', () => {
          const handleClick = jest.fn();
      
          const { getByText } = render(
            <ContactButton btnType="button" btnName="Click Me" onClick={handleClick} />
          );
      
          fireEvent.click(getByText('Click Me'));
          expect(handleClick).toHaveBeenCalledTimes(1);
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Negative Scenarios', () => {
      it('renders an error message when given an empty button name', () => {
        const originalError = console.error;
        console.error = () => {};
        render( <ContactButton btnType="button" btnName="" />);
        expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
        console.error = originalError;
      });
    });
});
