import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { useIntroData } from '@/app/contexts/introContext';
import { useScrollTop } from '@/app/hooks/useScroll';
import NavBar from '@/app/components/navbar/NavBar';

// Mocks
jest.mock('@/app/contexts/introContext');
jest.mock('@/app/hooks/useScroll', () => ({
    useScrollTop: jest.fn(),
}));
jest.mock('@/app/components/navbar/HamburgerMenu', () => {
    return function MockedHamburgerMenu() {
        return <div data-testid="hamburger-menu">HamburgerMenu</div>;
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
        (useIntroData as jest.Mock).mockReturnValue({
            introData: {
                navbar_data: {
                    link_title: "Simple Title"
                }
            }
        });
    });

     /** 各テストの後処理 */
     afterEach(() => {
        jest.clearAllMocks();
    });

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('<NavBar /> - Positive Scenarios', () => {

        it('renders the link title correctly', () => {
            render(<NavBar />);
            expect(screen.getByText('Simple Title')).toBeInTheDocument();
        });
    
        it('renders NormalMenu and HamburgerMenu components correctly', () => {
            render(<NavBar />);
            expect(screen.getByTestId('normal-menu')).toBeInTheDocument();
            expect(screen.getByTestId('hamburger-menu')).toBeInTheDocument();
        });
    
        it('invokes correct function on title click', () => {
            const mockScrollFunction = jest.fn();
            (useScrollTop as jest.Mock).mockImplementation(() => mockScrollFunction);
            
            render(<NavBar />);
            fireEvent.click(screen.getByText('Simple Title'));
            
            expect(mockScrollFunction).toHaveBeenCalled();
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('<NavBar /> - Negative Scenarios', () => {
        it('renders the ErrorComponent when navbar_data is missing', () => {
            (useIntroData as jest.Mock).mockReturnValueOnce({
                introData: null
            });

            const { getByText } = render(<NavBar />);

            expect(getByText(MESSAGES.ERRORS.DATA_LOADING)).toBeInTheDocument();
        });
    });
});
