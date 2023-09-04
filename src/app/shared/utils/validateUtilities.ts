
/**
 * 文字列の長さバリデーション
 * @param target 検証文字列
 * @param length 文字列の長さ
 * @returns true OK false NG
 */
export const isValidLength = (target: string, length: number): boolean => {
    return (target.length >= 1 && target.length <= length);
}

/**
 * Eメールバリデーション
 * @param email Eメール
 * @returns true OK false NG
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
};

/**
 * 特殊文字バリデーション
 * @param text 
 * @returns true OK false NG
 */
export const isValidSpecialCharacters = (text: string): boolean => {
    // 一般的な特殊文字を制限する
    const specialCharsRegex = /[<>!@#$%^&*()_+\-=\[\]{}':"\\|,~]/;
    return !specialCharsRegex.test(text);
}