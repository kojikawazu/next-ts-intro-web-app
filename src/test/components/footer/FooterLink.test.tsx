import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useScrollToRef } from '@/app/hooks/useScrol';
import FooterLink from '@/app/components/footer/FooterLink';

jest.mock('@/app/hooks/useScrol', () => ({
    useScrollToRef: jest.fn(),
}));

/** FooterLinkコンポーネントテスト */
describe('<FooterLink />', () => {
    let mockRef: React.RefObject<HTMLDivElement>;

    /** 各テストの前準備 */
    beforeEach(() => {
        mockRef = {
            current: {
                scrollIntoView: jest.fn()
            } as any // as any is a type casting to bypass typescript errors
        };
    });

    it('renders the link correctly', () => {
        render(<FooterLink linkTitle="About" isEnd={false} refData={mockRef} />);
        expect(screen.getByText('About')).toBeInTheDocument();
    });

    it('adds border if isEnd is false', () => {
        render(<FooterLink linkTitle="About" isEnd={false} refData={mockRef} />);
        expect(screen.getByText('About')).toHaveClass('border-r');
    });

    it('does not add border if isEnd is true', () => {
        render(<FooterLink linkTitle="About" isEnd={true} refData={mockRef} />);
        expect(screen.getByText('About')).not.toHaveClass('border-r');
    });

    it('calls scrollIntoView on click', () => {
        render(<FooterLink linkTitle="About" isEnd={false} refData={mockRef} />);
        const link = screen.getByText('About');
        fireEvent.click(link);
        expect(useScrollToRef).toHaveBeenCalled();
    });
});