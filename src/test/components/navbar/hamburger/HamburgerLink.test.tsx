import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HamburgerLink from '@/app/components/navbar/hamburger/HamburgerLink';

/** HamburgerLinkコンポーネントのテスト */
describe('<HamburgerLink />', () => {

    const ArrowIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
    );

    describe('Positive Scenarios', () => {
        test('renders the HamburgerLink component with the provided label and icon', () => {
            const mockOnClick = jest.fn();
            const { getByText, getByRole } = render(
                <HamburgerLink 
                    label="テストリンク"
                    onClick={mockOnClick}
                    iconComponent={<ArrowIcon />}
                />
            );

            expect(getByText("テストリンク")).toBeInTheDocument();
            expect(getByRole("menuitem")).toBeInTheDocument();
            expect(document.querySelector("svg")).toBeInTheDocument();
        });

        test('calls onClick when the link is clicked', () => {
            const mockOnClick = jest.fn();
            const { getByRole } = render(
                <HamburgerLink 
                    label="テストリンク"
                    onClick={mockOnClick}
                    iconComponent={<ArrowIcon />}
                />
            );

            const buttonElement = getByRole('button');
            fireEvent.click(buttonElement);
            expect(mockOnClick).toHaveBeenCalledTimes(1);
        });
    });
});