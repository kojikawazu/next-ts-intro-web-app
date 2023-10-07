import React, { useCallback } from 'react';
import classNames from 'classnames';
import { MESSAGES } from '@/app/shared/constants/constants';
import { validatePropsFilter, validateStringProps, validateNumberProps, validateFunctionProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/error/ErrorComponent';
import { customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';

/** 定数 */
const LOAD_MORE = "もっとスキルを読み込む";

/** Propsの型定義 */
type SkillsAndMoreProps = {
  updateCardDisplayLimit: (currentIndex: number, cardTotal: number) => void;
  currentIndex: number;
  cardAdditionCount: number;
  cardTotal: number;
  buttonLabel: string;
}

/**
 * スキルのandmoreコンポーネント
 * @returns JSX
 */
const SkillsAndMore: React.FC<SkillsAndMoreProps>  = ({
  updateCardDisplayLimit,
  currentIndex,
  cardAdditionCount,
  cardTotal,
  buttonLabel
}) => {
  componentStart(SkillsAndMore);

  // click
  const handleLoadMoreClick = useCallback(() => {
      updateCardDisplayLimit(cardAdditionCount, cardTotal);
  }, [updateCardDisplayLimit, cardAdditionCount, cardTotal]);

  // Props検証
  const functionError = validateFunctionProps([updateCardDisplayLimit], MESSAGES.ERRORS.NOT_FUNCTIONS);
  const numberError   = validateNumberProps([currentIndex, cardAdditionCount, cardTotal], MESSAGES.ERRORS.NOT_NUMBERS);
  const stringError   = validateStringProps([buttonLabel], MESSAGES.ERRORS.NOT_STRING);
  const errors        = validatePropsFilter([functionError, numberError, stringError]);
  
  if (errors.length > 0) {
      const errorJoin = errors.join(' ');
      customLog(SkillsAndMore, 'error', errorJoin);
      sendLogsToGCF([errorJoin], 'ERROR');
      return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
  }
  
  // css
  const className = classNames(
    'text-black',
    'hover:text-gray-500',
    {
      'cursor-not-allowed': currentIndex >= cardTotal,
      'bg-gray-300': currentIndex >= cardTotal,
    }
  );

  componentJSX(SkillsAndMore);
  return (
    <button
      className={className}
      onClick={handleLoadMoreClick}
      aria-label={LOAD_MORE}
      disabled={currentIndex >= cardTotal}>
      {buttonLabel}
    </button>
  );
};

export default SkillsAndMore;