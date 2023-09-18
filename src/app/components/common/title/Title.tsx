import React from 'react';

// Propsの型定義
type Props = {
    titleName: string;
};

/**
 * タイトルコンポーネント
 * @returns JSX
 */
const Title = (props: Props) => {
    const { titleName } = props;

    return (
        <div className="text-5xl underline decoration-1 decoration-solid underline-offset-8 p-5 pb-16">
            {titleName}
        </div>
    );
};

export default Title;