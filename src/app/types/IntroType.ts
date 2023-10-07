import { NavBarType } from "./NavbarType";
import { AboutType } from "./AboutType";
import { CareerTitleType, CareerType } from "./CareerType";
import { SkillsType } from "./SkillsType";
import { ContactType} from "./ContactType";
import { FooterType } from "./FooterType";

/** JSON型定義 */
export interface IntroDataType {
    navbar_data: NavBarType;
    hero_data: HeroType;
    about_data: AboutType;
    career_title_data: CareerTitleType;
    career_data: Array<CareerType>;
    skills_data: SkillsType;
    contact_data: ContactType;
    footer_data: FooterType;
};

/** Hero型定義 */
export interface HeroType {
    hero_img_url: string;
}

