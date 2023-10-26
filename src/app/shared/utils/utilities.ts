import { MESSAGES } from "@/app/shared//constants/constants";

/**
 * 本番環境かどうか
 * @returns true 本番環境 false 本番環境ではない
 */
export const isEnvProd = () => {
    const ENV = process.env.NODE_ENV;
    return (ENV === MESSAGES.ENV.PROD);
}

/**
 * 開発環境かどうか
 * @returns true 開発環境 false 開発環境ではない
 */
export const isEnvDev = () => {
    const ENV = process.env.NODE_ENV;
    return (ENV === MESSAGES.ENV.DEV);
}

/**
 * テスト環境かどうか
 * @returns true テスト環境 false テスト環境ではない
 */
export const isEnvTest = () => {
    const ENV = process.env.NODE_ENV;
    return (ENV === MESSAGES.ENV.TEST);
}