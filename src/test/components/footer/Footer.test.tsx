import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { useIntroData } from '@/app/contexts/introContext';
import { useScrollTop } from '@/app/hooks/useScroll';
import Footer from '@/app/components/footer/Footer';

// Mocks
jest.mock('@/app/contexts/introContext');
jest.mock('@/app/hooks/useScroll', () => ({
    useScrollTop: jest.fn(),
    useScrollToRef: jest.fn(),
}));
const mockRef = React.createRef();

/** Footerコンポーネントテスト */
describe('<Footer />', () => {

    /** 各テストの前準備 */
    beforeEach(() => {
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
                aboutRef:   mockRef,
                careerRef:  mockRef,
                skillsRef:  mockRef,
                contactRef: mockRef,
            }
        });

        (useScrollTop as jest.Mock).mockImplementation(() => jest.fn());
    });

    /** 各テストの後処理 */
    afterEach(() => {
        jest.clearAllMocks();
    });

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {

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
            if (!button) {
                throw new Error('Button not found!');
            }
            fireEvent.click(button as HTMLButtonElement);
            expect(useScrollTop).toHaveBeenCalled();
            expect(useScrollTop).toHaveBeenCalledTimes(1);
        });

        test('SVG button click', () => {
            render(<Footer />);
            const scrollUpIcon = screen.getByLabelText("footer arrow link");
            fireEvent.click(scrollUpIcon);
            expect(useScrollTop).toHaveBeenCalled();
            expect(useScrollTop).toHaveBeenCalledTimes(1);
        });
    });

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Negative Scenarios', () => {
        it('renders an error message when introData properties are missing', () => {
            (useIntroData as jest.Mock).mockReturnValue({
                introData: {},
            });

            render(<Footer />);
            expect(screen.getByText(MESSAGES.ERRORS.DATA_LOADING)).toBeInTheDocument();
        });

        it('renders an error message when introData is empty', () => {
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
                    aboutRef: { current: {} },
                    careerRef: { current: {} },
                    skillsRef: { current: {} },
                    contactRef: { current: {} }
                }
            });

            render(<Footer />);
            expect(screen.getByText('About')).toBeInTheDocument();
            expect(screen.getByText('Career')).toBeInTheDocument();
            expect(screen.getByText('Skills')).toBeInTheDocument();
            expect(screen.getByText('Contact')).toBeInTheDocument();
        });

        it('renders error message when refData is undefined', () => {
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
                refData: undefined
            });
        
            render(<Footer />);
            const allInvalidPropsElements = screen.getAllByText('Invalid props');
            expect(allInvalidPropsElements.length).toBe(4);
        });
    });
});