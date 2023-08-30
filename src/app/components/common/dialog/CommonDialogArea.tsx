import React from 'react'
import { useDialogLogic } from '@/app/features/dialog/useDialogLogic';
import CommonDialogLayout from '@/app/components/common/dialog/CommonDialogLayout';
import CareerDetailDialog from '@/app/components/careers/dialog/CareerDetailDialog';

/**
 * Dialogエリアコンポーネント
 * @returns 
 */
const CommonDialogArea = () => {
    // hook
    const { 
      isDialogOpen,
      dialogIndex,
      setCloseDialog } = useDialogLogic();

    return (
        <CommonDialogLayout show={isDialogOpen} onClose={() => setCloseDialog()}>
                <CareerDetailDialog currentIndex={dialogIndex} />
        </CommonDialogLayout>
    );
};

export default CommonDialogArea;