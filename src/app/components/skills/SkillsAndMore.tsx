import React, { useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateStringProps, validateNumberProps, validateFunctionProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';

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
  // state
  const [hasError, setHasError] = useState(false);

  // propsの検証
  useEffect(() => {
    setHasError(false);
    const functionError = validateFunctionProps([updateCardDisplayLimit], MESSAGES.ERRORS.NOT_FUNCTIONS);
    const numberError   = validateNumberProps([currentIndex, cardAdditionCount, cardTotal], MESSAGES.ERRORS.NOT_NUMBERS);
    const stringError   = validateStringProps([buttonLabel], MESSAGES.ERRORS.NOT_STRING);
    const errors = [functionError, numberError, stringError].filter(e => e !== null && e !== undefined);

    if (errors.length > 0) {
      consoleLog(`[SkillsAndMore]: ${errors.join(' ')}`);
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [updateCardDisplayLimit, currentIndex, cardAdditionCount, cardTotal, buttonLabel]);

  // click
  const handleLoadMoreClick = useCallback(() => {
    if (!hasError) {
      updateCardDisplayLimit(cardAdditionCount, cardTotal);
    }
  }, [updateCardDisplayLimit, cardAdditionCount, cardTotal, hasError]);
  
  // css
  const className = classNames(
    'text-black',
    'hover:text-gray-500',
    {
      'cursor-not-allowed': currentIndex >= cardTotal,
      'bg-gray-300': currentIndex >= cardTotal,
    }
  );

  return (
    hasError 
    ? ( 
      <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> 
    )
    : (
      <button
        className={className}
        onClick={handleLoadMoreClick}
        aria-label={LOAD_MORE}
        disabled={currentIndex >= cardTotal}>
        {buttonLabel}
      </button>
    )
  );
};

export default SkillsAndMore;