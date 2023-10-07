/** CareerのTitle型定義 */
export interface CareerTitleType {
    career_title_period: string;
    career_title_member: string;
    career_title_contents: string;
    career_title_stack: string;
    career_title_phase: string;
    career_title_role: string;
}

/** Career型定義 */
export interface CareerType {
    career_title: string;
    career_start: string;
    career_end: string;
    career_member: string;
    career_contents: string;
    career_skill_stack: Array<string>;
    career_skill_phase: Array<string>;
    career_role: string;
}