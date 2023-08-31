import React from 'react';
import { render, screen } from '@testing-library/react';
import SkillCard from '@/app/components/skills/SkillCard';

/** SkillCardコンポーネントのテスト */
describe('<SkillCard />', () => {
    const testSkill = {
        skills_card_icon: '/path-to-test-image.jpg',
        skills_card_name: 'Test Skill',
        skills_card_contents: 'This is a test skill description'
    };

    /** 各テストの前準備 */
    beforeEach(() => {
        render(<SkillCard skill={testSkill} />);
    });

    /** 正常系 */
    /** ----------------------------------------------------------------------------------- */

    describe('Positive Scenarios', () => {
        it('renders the skill name', () => {
            expect(screen.getByText('Test Skill')).toBeInTheDocument();
        });

        it('renders the skill description', () => {
            expect(screen.getByText('This is a test skill description')).toBeInTheDocument();
        });

        it('renders the skill icon', () => {
            const image = screen.getByAltText('skill_icon');
            expect(image).toBeInTheDocument();
            expect(image).toHaveAttribute('src', '/_next/image?url=%2Fpath-to-test-image.jpg&w=3840&q=75');
        });
    });
});