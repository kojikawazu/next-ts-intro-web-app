import React from 'react';

/** Propsの型定義 */
type Props = {
    errorData: string;
}

/**
 * エラーコンポーネント
 * @param props エラーデータ
 * @returns JSX
 */
const ErrorComponent = (props: Props) => {
    const { errorData } = props;
    return (
        <div>{errorData}</div>
    );
};

export default ErrorComponent;