/** About型定義 */
export interface AboutType {
    about_name: string;
    about_icon_url: string;
    about_img_url: string;
    sns_list: Array<SnsLinkType>;
    about_contents: Array<string>;
}

/** SNSのリスト型定義 */
export interface SnsLinkType {
    sns_name: string;
    sns_url: string;
    sns_img: string;
}