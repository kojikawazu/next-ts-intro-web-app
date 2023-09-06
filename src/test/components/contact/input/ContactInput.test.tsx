import React from 'react';
import { render, screen } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
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

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Negative Scenarios', () => {
        it('displays an error message when provided with an empty inputId', () => {
            render(
                <ContactInput inputId="" labelName="Test Label" labelStyle="testStyle" isRequired={false}>
                    <span>Child component</span>
                </ContactInput>
            );
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
        });

        it('displays an error message when provided with an empty labelName', () => {
            render(
                <ContactInput inputId="testId" labelName="" labelStyle="testStyle" isRequired={false}>
                    <span>Child component</span>
                </ContactInput>
            );
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
        });

        it('displays an error message when provided with an empty labelStyle', () => {
            render(
                <ContactInput inputId="testId" labelName="Test Label" labelStyle="" isRequired={false}>
                    <span>Child component</span>
                </ContactInput>
            );
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
        });
    });
});
