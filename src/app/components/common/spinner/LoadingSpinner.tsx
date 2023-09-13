import React from 'react';

/** Propsの型定義 */
type LoadingSpinnerProps = {
  isVisible?: boolean;
}

/**
 * ローディングスピナーコンポーネント
 * @returns JSX
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  isVisible = false
}) => {
  const visibilityClass = isVisible ? 'visible' : 'invisible';
  
  return (
    <div className={`fixed top-0 left-0 w-full h-full z-50 bg-gray-400 opacity-90 ${visibilityClass}`}>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;