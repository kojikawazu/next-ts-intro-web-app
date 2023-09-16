import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import CareerCard from '@/app/components/careers/cards/CareerCard';
import { useDialogLogic } from '@/app/features/dialog/useDialogLogic';

const mockCareerTitleData = {
    career_title_period:   'Period Title',
    career_title_member:   'Member Title',
    career_title_contents: 'Contentes Title',
    career_title_stack:    'Stack Title',
    career_title_phase:    'Phase Title',
    career_title_role:     'Role Title'
};

const mockCareerData = {
    career_title:       'Software Engineer',
    career_start:       '2020',
    career_end:         '2023',
    career_member:      '5 members',
    career_contents:    'Contents samples.',
    career_skill_stack: ['Stack 1', 'Stack 2', 'Stack 3'],
    career_skill_phase: ['Phase 1', 'Phase 2', 'Phase 3'],
    career_role:        'Role sample'
};

// Mocks
jest.mock('@/app/features/dialog/useDialogLogic');
jest.mock('@/app/components/careers/parts/CareerTitle',    () => { return jest.fn(props => <div data-testid="career-title">{mockCareerData.career_title}</div>)});
jest.mock('@/app/components/careers/parts/CareerPeriod',   () => { return jest.fn(props => <div data-testid="career-period">{mockCareerData.career_start}</div>)});
jest.mock('@/app/components/careers/parts/CareerMember',   () => { return jest.fn(props => <div data-testid="career-member">{mockCareerData.career_member}</div>)});
jest.mock('@/app/components/careers/parts/CareerContents', () => { return jest.fn(props => <div data-testid="career-contents">{mockCareerData.career_contents}</div>)});
jest.mock('@/app/components/careers/parts/CareerStacks',   () => { return jest.fn(props => <div data-testid="career-stacks">{mockCareerData.career_skill_stack[0]}</div>)});
jest.mock('@/app/components/careers/parts/CareerPhase',    () => { return jest.fn(props => <div data-testid="career-phase">{mockCareerData.career_skill_phase[0]}</div>)});
jest.mock('@/app/components/careers/parts/CareerRole',     () => { return jest.fn(props => <div data-testid="career-role">{mockCareerData.career_role}</div>)});

/** CareerCardのテストコード */
describe('<CareerCard />', () => {
    const mockSetCurrentIndexOpen = jest.fn();
    const mockCurrentIndex = 0;
    const mockClassName    = "";

    /** テストの前準備 */
    beforeEach(() => {
        (useDialogLogic as jest.Mock).mockReturnValue({
            setCurrentIndexOpen: mockSetCurrentIndexOpen
        });

        render(
            <CareerCard 
                currentIndex={mockCurrentIndex} 
                careerTitleData={mockCareerTitleData} 
                careerData={mockCareerData} 
                className={mockClassName} />
        );
    });

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {

        it('renders CareerTitle correctly with appropriate props', () => {
            expect(screen.getByTestId('career-title')).toHaveTextContent(mockCareerData.career_title);
        });

        it('renders CareerPeriod correctly with appropriate props', () => {
            expect(screen.getByTestId('career-period')).toHaveTextContent(mockCareerData.career_start);
        });

        it('renders CareerMember correctly with appropriate props', () => {
            expect(screen.getByTestId('career-member')).toHaveTextContent(mockCareerData.career_member);
        });

        it('renders CareerContents correctly with appropriate props', () => {
            expect(screen.getByTestId('career-contents')).toHaveTextContent(mockCareerData.career_contents);
        });

        it('renders CareerStacks correctly with appropriate props', () => {
            console.log(screen.getByTestId('career-stacks').outerHTML);
            expect(screen.getByTestId('career-stacks')).toHaveTextContent(mockCareerTitleData.career_title_stack[0]);
        });

        it('renders CareerPhase correctly with appropriate props', () => {
            expect(screen.getByTestId('career-phase')).toHaveTextContent(mockCareerTitleData.career_title_phase[0]);
        });

        it('renders CareerRole correctly with appropriate props', () => {
            expect(screen.getByTestId('career-role')).toHaveTextContent(mockCareerData.career_role);
        });

        it('should call setCurrentIndexOpen with correct value when clicked', () => {
            const button = screen.getByRole('button', { name: /キャリア詳細を表示/i });
            fireEvent.click(button);
            expect(mockSetCurrentIndexOpen).toBeCalledTimes(1);
        });

        it('should call setCurrentIndexOpen with correct value when clicked', () => {
            const {container} = render(
                <CareerCard 
                    currentIndex={mockCurrentIndex} 
                    careerTitleData={mockCareerTitleData} 
                    careerData={mockCareerData} />
            );

            const divElement = container.querySelector("div");
            expect(divElement).toBeInTheDocument();
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {
        it('should call setCurrentIndexOpen with correct value when clicked', () => {
            const originalError = console.error;
            console.error = () => {};
            const errorProps = {
                currentIndex: undefined as any,
                careerTitleData: undefined as any,
                careerData: undefined as any
            }

            render(<CareerCard {...errorProps} />);
            expect(screen.getByText(MESSAGES.INVALIDS.INVALID_PROPS)).toBeInTheDocument();
            console.error = originalError;
        });
    });
});