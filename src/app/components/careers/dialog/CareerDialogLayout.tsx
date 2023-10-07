import React from 'react';
import { componentStart, componentJSX } from '@/app/shared/utils/logUtilities';

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
const CareerDialogLayout: React.FC<CareerDialogLayoutProps> = ({
    show,
    onClose,
    children
}) => {
    componentStart(CareerDialogLayout);
    if (!show) return null;

    const preventPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    }

    componentJSX(CareerDialogLayout);
    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center w-full h-full"
            onClick={onClose}>
            <div className="flex items-center justify-center mx-12 my-4">
                <div 
                    className="bg-white px-7 py-8 rounded-3xl shadow-2xl"
                    onClick={preventPropagation}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default CareerDialogLayout;