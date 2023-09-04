import React from 'react';

/** Propsの型定義 */
type ContactButtonProps = {
    btnType: "button" | "submit";
    btnName: string;
    className?: string;
    onClick?: () => void;
    ariaLabel?: string;
}

/**
 * お問い合わせボタンコンポーネント
 * @returns JSX
 */
const ContactButton: React.FC<ContactButtonProps> = ({
    btnType = "submit",
    btnName,
    onClick,
    className = "",
    ariaLabel
}) => {
  return (
    <button 
        type={btnType}
        className={`btn btn-primary bg-lblue p-3 w-3/4 ssm:w-[350px] h-[60px] rounded-xl shadow-lg ${className}`}
        onClick={onClick}
        aria-label={ariaLabel || btnName}>
        {btnName}
    </button>
  );
};

export default ContactButton;