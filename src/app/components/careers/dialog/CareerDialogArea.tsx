import React from 'react'
import { useDialogLogic } from '@/app/features/dialog/useDialogLogic';
import { componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import CareerDialogLayout from '@/app/components/careers/dialog/CareerDialogLayout';
import CareerDetailDialog from '@/app/components/careers/dialog/CareerDetailDialog';

/**
 * Dialogエリアコンポーネント
 * @returns JSX
 */
const CareerDialogArea = () => {
  componentStart(CareerDialogArea);

  // hook
  const { 
    isDialogOpen,
    dialogIndex,
    setCloseDialog } = useDialogLogic();

  componentJSX(CareerDialogArea);
  return (
      <CareerDialogLayout show={isDialogOpen} onClose={() => setCloseDialog()}>
              <CareerDetailDialog currentIndex={dialogIndex} />
      </CareerDialogLayout>
  );
};

export default CareerDialogArea;