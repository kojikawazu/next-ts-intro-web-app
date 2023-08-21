module.exports = {
    preset: 'ts-jest',
    // Jest でテストを実行する際の環境を指定。
    // "jsdom" はブラウザのような環境を模倣したもので、
    // DOM 操作や window オブジェクトなどを使用するテストに適しています。
    testEnvironment: 'jsdom',
    // 各テストファイルが実行される前に、一度だけ実行されるセットアップファイルのリスト。
    // この場合、jest.setup.ts がテストの前に実行されます。
    setupFilesAfterEnv: ['./jest.setup.ts'],
    // テスト実行前に特定のファイル形式を変換するための設定。
    // ".ts" または ".tsx" という拡張子を持つファイルは ts-jest によって変換されます。
    // この設定は、JSX の構文をどのように扱うかを指定するために使われます。
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            tsconfig: {
                // この設定により、TSX の JSX 構文は React の createElement 関数に変換されます。
                jsx: 'react'
            }
        }]
    },
    // モジュールのエイリアスや特定のパターンのファイルを別の場所にマッピングするための設定。
    // この設定は、"@/" で始まるパスをプロジェクトの src ディレクトリにマッピングします。
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    }
};