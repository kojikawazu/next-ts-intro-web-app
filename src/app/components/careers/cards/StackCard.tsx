import React from 'react';

// Propsの型定義
type StackCardProps = {
    stackName?: string;
};

/**
 * StackCardコンポーネント
 * @returns JSX
 */
const StackCard: React.FC<StackCardProps> = ({ 
    stackName = "default stack"
}) => {
    return (
        <div className="bg-lblue px-4 mx-1 my-1 rounded-2xl">
            {stackName}
        </div>
    );
};

export default StackCard;