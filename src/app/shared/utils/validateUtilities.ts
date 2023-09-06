
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

/**
 * props検証(文字列)
 * @param props 
 * @param errorMessage 
 * @returns エラーメッセージ or null
 */
export const validateStringProps = (props: string[], errorMessage: string): string | null => {
    for (const prop of props) {
        if (!prop) {
        return errorMessage;
        }
    }
    return null;
};

/**
 * props検証(number型)
 * @param props 
 * @param errorMessage 
 * @returns エラーメッセージ or null
 */
export const validateNumberProps = (props: (number | undefined)[], errorMessage: string): string | null => {
    for (const prop of props) {
      if (prop === null || prop === undefined) {
        return errorMessage;
      }
    }
    return null;
};

/**
 * props検証(関数)
 * @param props 
 * @param errorMessage 
 * @returns エラーメッセージ or null
 */
export const validateFunctionProps = (props: Array<((...args: any[]) => any) | undefined>, errorMessage: string): string | null => {
    for (const prop of props) {
      if (!prop) {
        return errorMessage;
      }
    }
    return null;
};

/**
 * データ検証
 * @param args 
 * @param errorMessage
 * @returns エラーメッセージ or null
 */
export const validateData = (args: any[], errorMessage: string): string | null => {
  for (const arg of args) {
      if (!arg) {
        return errorMessage;
      }
  }
  return null;
};

/**
 * 配列検証
 * @param list 
 * @param errorMessage 
 * @returns エラーメッセージ or null
 */
export const validateArrays = (list: (Array<any> | undefined)[], errorMessage: string): string | null => {
  for (const arg of list) {
      if (!Array.isArray(arg) || arg.length === 0) {
        return errorMessage;
      }
  }
  return null;
};