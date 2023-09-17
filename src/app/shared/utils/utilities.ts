
/**
 * テスト環境かどうか
 * @returns true テスト環境 false テスト環境ではない
 */
export const isEnvTest = () => {
    return (process.env.NODE_ENV === 'development');
}