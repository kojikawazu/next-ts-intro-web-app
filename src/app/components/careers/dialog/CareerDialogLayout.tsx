import React from 'react';

/** Propsの型定義 */
type CareerDialogLayoutProps = {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * キャリアダイアログレイアウトコンポーネント
 * @returns JSX
 */
const CareerDialogLayout = (props: CareerDialogLayoutProps) => {
    const { show, onClose, children } = props;
    if (!show) return null;

    const preventPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    }

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center z-50 m-4"
            onClick={onClose}>
            <div 
                className="bg-blue-300 p-5 rounded-lg shadow-md"
                onClick={preventPropagation}>
                {children}
            </div>
        </div>
    );
}

export default CareerDialogLayout;