import React from 'react';

/** Props型定義 */
type CareerTitleProps= {
    careerTitle: string;
    className: string;
}

/**
 * CareerTitleコンポーネント
 * @param props careerTitle, className
 * @returns JSX
 */
const CareerTitle = (props: CareerTitleProps) => {
    const { careerTitle, className } = props;

    const responsiveFontSize = `text-xxs xs:text-xs md:text-xl`;

    return (
        <div className={`${className}`}>
            <h3 className={`${responsiveFontSize} underline decoration-1 decoration-solid underline-offset-8`}>
                {careerTitle}
            </h3>
        </div>
    );
};

export default CareerTitle;