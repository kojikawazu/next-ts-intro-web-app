
/**
 * テスト環境かどうか
 * @returns true テスト環境 false テスト環境ではない
 */
export const isEnvTest = () => {
    const ENV = process.env.NODE_ENV || "production";
    return (ENV === 'development');
}