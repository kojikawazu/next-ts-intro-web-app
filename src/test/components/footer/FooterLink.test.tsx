import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useScrollToRef } from '@/app/hooks/useScroll';
import FooterLink from '@/app/components/footer/FooterLink';

// Mocks
jest.mock('@/app/hooks/useScroll', () => ({
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
            }
        } as unknown as React.RefObject<HTMLDivElement>;

        (useScrollToRef as jest.Mock).mockImplementation(() => mockRef.current!.scrollIntoView);
    });

    /** 各テストの後処理 */
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('<FooterLink /> - Positive Scenarios', () => {
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

            expect(mockRef.current!.scrollIntoView).toHaveBeenCalled();
        });
    });
});