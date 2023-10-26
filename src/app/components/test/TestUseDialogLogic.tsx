import React from 'react';
import { Provider } from 'react-redux';
import { useDialogLogic } from '@/app/features/dialog/useDialogLogic';

interface TestUseDialogLogicProps {
  store: any;
  testFn: (output: ReturnType<typeof useDialogLogic>) => void;
}

const TestUseDialogLogic: React.FC<TestUseDialogLogicProps> = ({ store, testFn }) => {
  const hookOutput = useDialogLogic();

  testFn(hookOutput);

  return <Provider store={store}>{null}</Provider>;
};

export default TestUseDialogLogic;