import React from 'react';
import { render, screen } from '@testing-library/react';
import { MESSAGES } from '@/app/shared/constants/constants';
import SkillCard from '@/app/components/skills/SkillCard';

// Mocks
type MockedImageProps = {
    src: string;
    alt: string;
};
jest.mock('next/image', () => {
    return function MockedImage({ src, alt, ...rest }: MockedImageProps) {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={src} alt={alt} {...rest} />;
    };
});

/** SkillCardコンポーネントのテスト */
describe('<SkillCard />', () => {
    const testSkill = {
        skills_card_icon: '/path-to-test-image.jpg',
        skills_card_name: 'Test Skill',
        skills_card_contents: 'This is a test skill description'
    };

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {
        it('renders the skill name', () => {
            render(<SkillCard skill={testSkill} />);
            expect(screen.getByText('Test Skill')).toBeInTheDocument();
        });

        it('renders the skill description', () => {
            render(<SkillCard skill={testSkill} />);
            expect(screen.getByText('This is a test skill description')).toBeInTheDocument();
        });

        it('renders the skill icon', () => {
            render(<SkillCard skill={testSkill} />);
            const image = screen.getByAltText('skill_icon');
            expect(image).toBeInTheDocument();
            expect(image).toHaveAttribute('src', '/path-to-test-image.jpg');
        });

        it('renders the skill image default alt', () => {
            render(<SkillCard skill={testSkill} />);
            expect(screen.getByAltText('skill_icon')).toBeInTheDocument();
        });

        it('renders the skill image alt', () => {
            render(<SkillCard skill={testSkill} imageAlt="image alt" />);
            expect(screen.getByAltText('image alt')).toBeInTheDocument();
        });

        it('renders the skill image default size', () => {
            render(<SkillCard skill={testSkill} />);
            const image = screen.getByAltText('skill_icon');
            expect(image).toHaveAttribute('width', '50');
            expect(image).toHaveAttribute('height', '50');
        });

        it('renders the skill image size', () => {
            render(<SkillCard skill={testSkill} imageSize={24} />);
            const image = screen.getByAltText('skill_icon');
            expect(image).toHaveAttribute('width', '24');
            expect(image).toHaveAttribute('height', '24');
        });

        it('renders the skill image default scale', () => {
            render(<SkillCard skill={testSkill} />);
            const image = screen.getByAltText('skill_icon');
            expect(image).toHaveAttribute('sizes', '10%');
        });

        it('renders the skill image scale', () => {
            render(<SkillCard skill={testSkill} imageScale="50%" />);
            const image = screen.getByAltText('skill_icon');
            expect(image).toHaveAttribute('sizes', '50%');
        });
    });

    /** 異常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Negative Scenarios', () => {
        it('renders default size when given a negative image size', () => {
            render(<SkillCard skill={testSkill} imageSize={-24} />);
            const image = screen.getByAltText('skill_icon');
            expect(image).toHaveAttribute('width', '50');
            expect(image).toHaveAttribute('height', '50');
        });

        it('renders default scale when given a negative image scale', () => {
            render(<SkillCard skill={testSkill} imageScale="-50%" />);
            const image = screen.getByAltText('skill_icon');
            expect(image).toHaveAttribute('sizes', '10%');
        });

        it('renders error when skills_card_icon attribute is empty', () => {
            const defaultSkill = {
                skills_card_icon: '',
                skills_card_name: 'Test Skill',
                skills_card_contents: 'This is a test skill description'
            };
            render(<SkillCard skill={defaultSkill} />);
            expect(screen.getByText(MESSAGES.ERRORS.DATA_LOADING)).toBeInTheDocument();
        });

        it('renders error when skills_card_name attribute is empty', () => {
            const defaultSkill = {
                skills_card_icon: '/path-to-test-image.jpg',
                skills_card_name: '',
                skills_card_contents: 'This is a test skill description'
            };
            render(<SkillCard skill={defaultSkill} />);
            expect(screen.getByText(MESSAGES.ERRORS.DATA_LOADING)).toBeInTheDocument();
        });

        it('renders error when skills_card_contents attribute is empty', () => {
            const defaultSkill = {
                skills_card_icon: '/path-to-test-image.jpg',
                skills_card_name: 'Test Skill',
                skills_card_contents: ''
            };
            render(<SkillCard skill={defaultSkill} />);
            expect(screen.getByText(MESSAGES.ERRORS.DATA_LOADING)).toBeInTheDocument();
        });

        it('renders error when all skill attributes are empty', () => {
            const defaultSkill = {
                skills_card_icon: "",
                skills_card_name: "",
                skills_card_contents: ""
            };
            render(<SkillCard skill={defaultSkill} />);
            expect(screen.getByText(MESSAGES.ERRORS.DATA_LOADING)).toBeInTheDocument();
        });
    }); 
});