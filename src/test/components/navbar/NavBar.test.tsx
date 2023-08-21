import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from '@/app/components/navbar/NavBar';
import { useIntroData } from '@/app/contexts/introContext';
import { useScrollTop } from '@/app/hooks/useScroll';

// Mocks
jest.mock('@/app/contexts/introContext');
jest.mock('@/app/hooks/useScroll', () => ({
    useScrollTop: jest.fn(),
    useScrollToRef: jest.fn(),
}));
jest.mock('@/app/components/navbar/HumbergerMenu', () => {
    return function MockedHumbergerMenu() {
        return <div data-testid="humberger-menu">HumbergerMenu</div>;
    };
});
jest.mock('@/app/components/navbar/NormalMenu', () => {
    return function MockedNormalMenu() {
        return <div data-testid="normal-menu">NormalMenu</div>;
    };
});

/** NavBarコンポーネントのテストコード */
describe('<NavBar />', () => {

    /** 各テストの前準備 */
    beforeEach(() => {
        // デフォルトのモックデータと関数を提供

        (useIntroData as jest.Mock).mockReturnValue({
            introData: {
                navbar_data: {
                    link_title: "Simple Title"
                }
            }
        });

        (useScrollTop as jest.Mock).mockImplementation(() => jest.fn());
    });

    it('renders the link title correctly', () => {
        render(<NavBar />);
        expect(screen.getByText('Simple Title')).toBeInTheDocument();
    });

    it('triggers useScrolTop on title click', () => {
        render(<NavBar />);
        fireEvent.click(screen.getByText('Simple Title'));
        expect(useScrollTop).toHaveBeenCalled();
    });
});
