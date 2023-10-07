import { IntroDataType } from '@/app/types/IntroType';
import { IntroRefType } from '@/app/types/IntroRefType';

export const mockInitialData: IntroDataType = {
    navbar_data: {
        link_title: "Link Title",
        about_name: "About",
        career_name: "Career",
        skills_name: "Skills",
        contact_name: "Contact"
    },
    hero_data: {
        hero_img_url: "https://example.com/hero.jpg",
    },
    about_data: {
        about_name: "John Doe",
        about_icon_url: "https://example.com/icon.jpg",
        about_img_url: "https://example.com/img.jpg",
        sns_list: [
            {
                sns_name: "sample01",
                sns_url: "https://sample.com",
                sns_img: "https://example.com/sample_img.jpg"
            },
            {
                sns_name: "sample02",
                sns_url: "https://sample.com",
                sns_img: "https://example.com/sample_img.jpg"
            }
        ],
        about_contents: ["Introduction content 1", "Introduction content 2"]
    },
    career_title_data: {
        career_title_period: "2020-2023",
        career_title_member: "Team Member",
        career_title_contents: "Project Contents",
        career_title_stack: "Tech Stack",
        career_title_phase: "Project Phase",
        career_title_role: "Role in Project"
    },
    career_data: [
        {
            career_title: "Software Developer",
            career_start: "2020",
            career_end: "2023",
            career_member: "5 members",
            career_contents: "Developed web applications",
            career_skill_stack: ["JavaScript", "React", "Node.js"],
            career_skill_phase: ["Design", "Development", "Deployment"],
            career_role: "Front-end Developer"
        }
    ],
    skills_data: {
        skills_cards: [
            {
                skills_card_icon: "https://example.com/js_icon.jpg",
                skills_card_name: "JavaScript",
                skills_card_contents: "JavaScript is a dynamic programming language..."
            },
            {
                skills_card_icon: "https://example.com/react_icon.jpg",
                skills_card_name: "React",
                skills_card_contents: "React is a JavaScript library for building user interfaces..."
            }
        ],
        skills_more: "And more..."
    },
    contact_data: {
        contact_name: "John Doe",
        contact_email: "john.doe@example.com",
        contact_contents: "Feel free to contact me anytime.",
        contact_btn_name: "Send Email"
    },
    footer_data: {
        copyright: "© 2023 Company Name"
    }
};

const mockRef = {
    current: null
};

export const mockRefData: IntroRefType = {
    aboutRef:   mockRef,
    careerRef:  mockRef,
    skillsRef:  mockRef,
    contactRef: mockRef
};
