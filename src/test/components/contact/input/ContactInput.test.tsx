import React from 'react';
import { render } from '@testing-library/react';
import ContactInput from '@/app/components/contact/input/ContactInput';

/** ContactInputのテストコード */
describe('<ContactInput />', () => {

     /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {

        it('should render child component', () => {
            const { getByText } = render(
                <ContactInput inputId="testId" labelName="Test Label" labelStyle="testStyle">
                    <span>Child component</span>
                </ContactInput>
            );

            expect(getByText('Child component')).toBeInTheDocument();
        });

        it('should render the label with the provided text', () => {
            const { getByText } = render(
                <ContactInput inputId="testId" labelName="Test Label" labelStyle="testStyle">
                    <span>Child component</span>
                </ContactInput>
            );
        
            expect(getByText('Test Label:')).toBeInTheDocument();
        });

        it('applies the provided label style', () => {
            const { getByText } = render(
                <ContactInput inputId="testId" labelName="Test Label" labelStyle="testStyle">
                    <span>Child component</span>
                </ContactInput>
            );
        
            const label = getByText('Test Label:');
            expect(label).toHaveClass('testStyle');
        });

        it('displays an asterisk if isRequired is true', () => {
            const { getByText } = render(
                <ContactInput inputId="testId" labelName="Test Label" labelStyle="testStyle" isRequired={true}>
                    <span>Child component</span>
                </ContactInput>
            );

            expect(getByText('*')).toBeInTheDocument();
        });

        it('does not display an asterisk if isRequired is false or not provided', () => {
            const { queryByText } = render(
                <ContactInput inputId="testId" labelName="Test Label" labelStyle="testStyle" isRequired={false}>
                    <span>Child component</span>
                </ContactInput>
            );

            expect(queryByText('*')).toBeNull();
        });
    });
});
