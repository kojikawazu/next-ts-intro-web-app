import React from 'react';
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import reducer from '@/app/features/dialog/dialogSlice'; 
import { render, screen } from '@testing-library/react';
import CareerCard from '@/app/components/careers/cards/CareerCard';
import { useDialogLogic } from '@/app/features/dialog/useDialogLogic';

// Mocks
jest.mock('@/app/features/dialog/useDialogLogic');
jest.mock('@/app/components/careers/parts/CareerTitle',    () => { return jest.fn(props => <div data-testid="career-title">{props.careerTitle}</div>)});
jest.mock('@/app/components/careers/parts/CareerPeriod',   () => { return jest.fn(props => <div data-testid="career-period">{props.careerTitle}</div>)});
jest.mock('@/app/components/careers/parts/CareerMember',   () => { return jest.fn(props => <div data-testid="career-member">{props.careerTitle}</div>)});
jest.mock('@/app/components/careers/parts/CareerContents', () => { return jest.fn(props => <div data-testid="career-contents">{props.careerTitle}</div>)});
jest.mock('@/app/components/careers/parts/CareerStacks',   () => { return jest.fn(props => <div data-testid="career-stacks">{props.careerTitle}</div>)});
jest.mock('@/app/components/careers/parts/CareerPhase',    () => { return jest.fn(props => <div data-testid="career-phase">{props.careerTitle}</div>)});
jest.mock('@/app/components/careers/parts/CareerRole',     () => { return jest.fn(props => <div data-testid="career-role">{props.careerTitle}</div>)});

const mockSetCurrentIndexOpen = jest.fn();
const mockUseDialogLogic = {
    setCurrentIndexOpen: mockSetCurrentIndexOpen,
    isDialogOpen: false,
    dialogIndex: 0,
    setCloseDialog: jest.fn()
};
(useDialogLogic as jest.Mock).mockImplementation(() => mockUseDialogLogic);

// dummyStore
const dummyStore = configureStore({
    reducer: {
        dialog: reducer
    },
    preloadedState: {
        dialog: {
            isDialogOpen: false,
            currentIndex: 0
        }
    }
});

/** CareerCardのテストコード */
describe('<CareerCard />', () => {
    
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

    const mockCurrentIndex = 0;
    const mockClassName    = "";

    /** テストの前準備 */
    beforeEach(() => {
        jest.clearAllMocks();

        render(
            <Provider store={dummyStore}>
                <CareerCard 
                    currentIndex={mockCurrentIndex} 
                    careerTitleData={mockCareerTitleData} 
                    careerData={mockCareerData} 
                    className={mockClassName} />
            </Provider>
        );
    });

    /** テストの後処理 */
    afterEach(() => {
        jest.resetAllMocks(); 
    });

    describe('Positive Scenarios', () => {

        test('renders CareerTitle correctly with appropriate props', () => {
            expect(screen.getByTestId('career-title')).toHaveTextContent(mockCareerData.career_title);
        });

        test('renders CareerPeriod correctly with appropriate props', () => {
            expect(screen.getByTestId('career-period')).toHaveTextContent(`${mockCareerTitleData.career_title_period} ${mockCareerData.career_start}-${mockCareerData.career_end}`);
        });

        /** 
        test('renders CareerPeriod correctly with appropriate props', () => {
            expect(screen.getByTestId('career-period')).toHaveTextContent(mockCareerTitleData.career_title_period);
        });

        test('renders CareerMember correctly with appropriate props', () => {
            expect(screen.getByTestId('career-member')).toHaveTextContent(mockCareerTitleData.career_title_member);
        });

        test('renders CareerContents correctly with appropriate props', () => {
            expect(screen.getByTestId('career-contents')).toHaveTextContent(mockCareerTitleData.career_title_contents);
        });

        test('renders CareerStacks correctly with appropriate props', () => {
            expect(screen.getByTestId('career-stacks')).toHaveTextContent(mockCareerTitleData.career_title_stack);
        });

        test('renders CareerPhase correctly with appropriate props', () => {
            expect(screen.getByTestId('career-phase')).toHaveTextContent(mockCareerTitleData.career_title_phase);
        });

        test('renders CareerRole correctly with appropriate props', () => {
            expect(screen.getByTestId('career-role')).toHaveTextContent(mockCareerTitleData.career_title_role);
        });

        test('should call setCurrentIndexOpen with correct value when clicked', () => {
            const button = screen.getByRole('button', { name: /キャリア詳細を表示/i });
            userEvent.click(button);
            expect(mockedSetCurrentIndexOpen).toHaveBeenCalledWith(mockCurrentIndex);
        });

        test('CareerTitle is called with correct props', () => {
            expect(CareerTitle).toHaveBeenCalledWith({ careerTitle: mockCareerData.career_title, className: "text-xxxs xs:text-xxs sssm:text-xs sm:text-sm md:text-base py-5 md:py-10" }, {});
        });
        */
        
    });
});