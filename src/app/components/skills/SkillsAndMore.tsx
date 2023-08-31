import React, { useCallback } from 'react'

/** Propsの型定義 */
type SkillsAndMoreProps = {
  updateCardDisplayLimit: (currentIndex: number, cardTotal: number) => void;
  currentIndex: number;
  cardTotal: number;
  buttonLabel: string;
}

/**
 * スキルのandmoreコンポーネント
 * @param updateCardDisplayLimit カード読み込み制限の切替関数
 * @param currentIndex 読み込み数
 * @param cardTotal カード最大数
 * @param buttonLabel ボタンラベル
 * @returns JSX
 */
const SkillsAndMore: React.FC<SkillsAndMoreProps>  = ({
  updateCardDisplayLimit,
  currentIndex,
  cardTotal,
  buttonLabel
}) => {
  // click
  const handleButtonClick = useCallback(() => {
    updateCardDisplayLimit(currentIndex, cardTotal);
  }, [updateCardDisplayLimit, currentIndex, cardTotal]);

  return (
    <button
      className="text-black hover:text-gray-500"
      onClick={handleButtonClick}
      aria-label="もっとスキルを読み込む">
      {buttonLabel}
    </button>
  );
};

export default SkillsAndMore;