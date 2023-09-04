import React from 'react';

/** Propsの型定義 */
type NormalHeaderMenuLinkProps = {
  menuClass: string;
  ariaLabel: string;
  btnClass: string;
  onClick: () => void;
  btnLabel: string;
}

/**
 * ノーマルヘッダーメニューリンクコンポーネント
 * @returns JSX
 */
const NormalHeaderMenuLink: React.FC<NormalHeaderMenuLinkProps> = ({
  menuClass,
  ariaLabel,
  btnClass,
  onClick,
  btnLabel
}) => {
  return (
    <div className={menuClass}>
        <button
            type="button"
            aria-label={ariaLabel}
            className={btnClass}
            onClick={onClick}>{btnLabel}</button>
    </div>
  );
};

export default NormalHeaderMenuLink;