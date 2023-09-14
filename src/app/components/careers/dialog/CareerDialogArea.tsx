import React from 'react'
import { useDialogLogic } from '@/app/features/dialog/useDialogLogic';
import CareerDialogLayout from '@/app/components/careers/dialog/CareerDialogLayout';
import CareerDetailDialog from '@/app/components/careers/dialog/CareerDetailDialog';

/**
 * Dialogエリアコンポーネント
 * @returns JSX
 */
const CareerDialogArea = () => {
    // hook
    const { 
      isDialogOpen,
      dialogIndex,
      setCloseDialog } = useDialogLogic();

    return (
        <CareerDialogLayout show={isDialogOpen} onClose={() => setCloseDialog()}>
                <CareerDetailDialog currentIndex={dialogIndex} />
        </CareerDialogLayout>
    );
};

export default CareerDialogArea;