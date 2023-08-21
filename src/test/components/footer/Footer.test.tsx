import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useIntroData } from '@/app/contexts/introContext';
import { useScrolTop } from '@/app/hooks/useScrol';
import Footer from '@/app/components/footer/Footer';

// Mocks
jest.mock('@/app/contexts/introContext');
jest.mock('@/app/hooks/useScrol', () => ({
    useScrolTop: jest.fn(),
    useScrollToRef: jest.fn(),
}));

/** Footerコンポーネントテスト */
describe('<Footer />', () => {

    /** 各テストの前準備 */
    beforeEach(() => {
        // デフォルトのモックデータと関数を提供

        (useIntroData as jest.Mock).mockReturnValue({
            introData: {
                navbar_data: {
                    about_name: "About",
                    career_name: "Career",
                    skills_name: "Skills",
                    contact_name: "Contact",
                    link_title: "Go Top"
                },
                footer_data: {
                    copyright: "© 2023 Company Name"
                }
            },
            refData: {
                aboutRef: React.createRef(),
                careerRef: React.createRef(),
                skillsRef: React.createRef(),
                contactRef: React.createRef(),
            }
        });

        (useScrolTop as jest.Mock).mockImplementation(() => jest.fn());
    });

    it('renders links correctly', () => {
        render(<Footer />);
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Career')).toBeInTheDocument();
        expect(screen.getByText('Skills')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('renders go top link and copyright correctly', () => {
        render(<Footer />);
        expect(screen.getByText('Go Top')).toBeInTheDocument();
        expect(screen.getByText('© 2023 Company Name')).toBeInTheDocument();
    });

    it('triggers useScrolTop on click', () => {
        render(<Footer />);
        const button = screen.getByText('Go Top').closest('button');
        if (button) fireEvent.click(button);
        expect(useScrolTop).toHaveBeenCalled();
    });

    test('SVG button click', () => {
        render(<Footer />);
        const scrollUpIcon = screen.getByLabelText("scroll-up-icon");
        if(scrollUpIcon) fireEvent.click(scrollUpIcon);
        expect(useScrolTop).toHaveBeenCalled();
    });
});