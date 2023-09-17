import React from 'react';
import classNames from 'classnames';
import { MESSAGES } from '@/app/shared/constants/constants';
import { validatePropsFilter, validateArraysProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/error/ErrorComponent';
import { isEnvTest } from '@/app/shared/utils/utilities';
import { customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';

/** Propsの型定義 */
type ProfileContentsCardProps = {
  profileContents: Array<string>;
}

/**
 * ProfileContentsカードコンポーネント
 * @returns JSX
 */
const ProfileContentsCard: React.FC<ProfileContentsCardProps> = ({
  profileContents,
}) => {
  componentStart(ProfileContentsCard);

  // Props検証
  const arrayError = validateArraysProps([profileContents], MESSAGES.ERRORS.NOT_ARRAYS);
  const errors     = validatePropsFilter([arrayError]);
  if (errors.length > 0) {
    const errorJoin = errors.join(' ');
    customLog(ProfileContentsCard, 'error', errorJoin);
    sendLogsToGCF([errorJoin], 'ERROR');
    return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
  }

  const textStyles = ["text-xs", "sm:text-sm", "md:text-base"];
  const className = classNames(textStyles);

  componentJSX(ProfileContentsCard);
  return (
    <div className={`p-8 pb-4 ${className}`}
      {...(isEnvTest() ? { "data-testid": "profile-contents-card" } : {})}>
        
      {profileContents.map((content, index) => (
          <div 
            key={index}
            className="mb-5 last:mb-0">
              <div>{content}</div>
          </div>
      ))}
    </div>
  );
};

export default ProfileContentsCard;