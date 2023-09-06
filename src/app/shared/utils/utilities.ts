
/**
 * ログ出力
 * @param log 
 */
export const consoleLog = (log: string) => {
    console.log(log);
}

/**
 * テスト環境かどうか
 * @returns true テスト環境 false テスト環境ではない
 */
export const isEnvTest = () => {
    return (process.env.NODE_ENV === 'test');
}