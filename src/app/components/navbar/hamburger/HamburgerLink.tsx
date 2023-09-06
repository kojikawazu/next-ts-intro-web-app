import React from 'react';
import { MESSAGES } from '@/app/shared/constants/constants';
import { consoleLog } from '@/app/shared/utils/utilities';
import { validateStringProps, validateFunctionProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/ErrorComponent';

/** Propsの型定義 */
type HamburgerLinkProps = {
  label: string;
  onClick: () => void;
  iconComponent: React.ReactNode;
}

/**
 * ハンバーガーメニューリンクコンポーネント
 * @returns JSX
 */
const HamburgerLink: React.FC<HamburgerLinkProps> = ({
  label,
  onClick,
  iconComponent
}) => {
  // Props検証
  const functionError = validateFunctionProps([onClick], MESSAGES.ERRORS.NOT_FUNCTIONS);
  const stringError   = validateStringProps([label], MESSAGES.ERRORS.NOT_STRING);
  const errors = [functionError, stringError].filter(e => e !== null && e !== undefined);
  if (errors.length > 0) {
      consoleLog(`[HamburgerLink]: ${errors.join(' ')}`);
      return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
  }

  return (
      <li
        role="menuitem" 
        className="flex justify-between content-center border-b-2 border-dashed border-dblue hover:bg-hoverdblue">
          <button 
            onClick={onClick}
            className="flex justify-between w-full"
            style={{
                background: 'none',
                border: 'none',
                padding: 0,
                margin: 0,
                font: 'inherit',
                cursor: 'pointer',
                outline: 'inherit',
                appearance: 'none'
            }}>
          <div className="pl-10 xs:pl-20 ssm:pl-32 py-5 text-2xl inline-block">
              {label}
          </div>
          <div className="pr-8 py-5">
              {iconComponent}
          </div>
        </button>
    </li>
  );
};

export default HamburgerLink;