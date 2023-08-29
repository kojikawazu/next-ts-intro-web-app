import React from 'react';

// Propsの型定義
type StackCardProps = {
    stackName: string;
};

/**
 * StackCardコンポーネント
 * @param props stackName: スタック名
 * @returns JSX
 */
const StackCard = (props: StackCardProps) => {
    const { stackName } = props;
    return (
        <div className="bg-lblue px-4 mx-1 my-1 rounded-2xl">
            {stackName}
        </div>
    );
};

export default StackCard;