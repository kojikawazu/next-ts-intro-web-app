/** Skills型定義 */
export interface SkillsType {
    skills_cards: Array<SkillsCardType>
    skills_more: string;
}

/** Skillsカード型定義 */
export interface SkillsCardType {
    skills_card_icon: string;
    skills_card_name: string;
    skills_card_contents: string;
}