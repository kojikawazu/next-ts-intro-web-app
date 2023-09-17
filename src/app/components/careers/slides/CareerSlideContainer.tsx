import React from 'react';
import classNames from 'classnames';
import { MESSAGES } from '@/app/shared/constants/constants';
import { CareerTitleType, CareerType } from '@/app/types/CareerType';
import { validatePropsFilter, validateArraysProps, validateNumberProps, validateDataProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/error/ErrorComponent';
import { customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';
import CareerCard from '@/app/components/careers/cards/CareerCard';

/** Propsの型定義 */
type CareerSlideContainerProps = {  
    currentIndex: number;
    animationDuration: number;
    careerTitleData: CareerTitleType;
    careerData: CareerType[];
}

/**
 * CareerSlideContainerコンポーネント
 * @returns JSX
 */
const CareerSlideContainer: React.FC<CareerSlideContainerProps> = ({ 
    currentIndex, 
    animationDuration, 
    careerTitleData, 
    careerData 
}) => {
    componentStart(CareerSlideContainer);

    // Props検証
    const arrayError    = validateArraysProps([careerData], MESSAGES.ERRORS.NOT_ARRAYS);
    const numberError   = validateNumberProps([currentIndex, animationDuration], MESSAGES.ERRORS.NOT_NUMBERS);
    const dataError     = validateDataProps([careerTitleData], MESSAGES.ERRORS.NOT_DATA);
    const errors        = validatePropsFilter([arrayError, numberError, dataError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(CareerSlideContainer, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    let cardAppendClass = classNames(["w-11/12", "xl:w-5/6"]);
    cardAppendClass     = classNames(cardAppendClass, ["h-[600px]", "md:h-[900px]"]);
    cardAppendClass     = classNames(cardAppendClass, ["mx-4", "sm:mx-8", "md:mx-10", "xl:mx-24"]);

    componentJSX(CareerSlideContainer);
    return (
        <div className="basis-full xl:basis-8/12">
            <div className={`relative overflow-hidden ${cardAppendClass} mt-2`}>
                {careerData.map((career, index) => {
                    const animationDirection = index > currentIndex ? "slideRight" : "slideLeft";

                    return (
                        <CareerCard 
                            key={`${currentIndex}_${index}`}
                            currentIndex={currentIndex}
                            careerTitleData={careerTitleData}
                            careerData={career}
                            className={`absolute top-0 w-full h-4/5 transition-all duration-[${animationDuration}ms] 
                                ${index === currentIndex
                                    ? 'transform translate-x-0'
                                    : `transform -translate-x-full animation-${animationDirection} ${animationDuration}ms`
                                }`}
                        />
                    )
                })}
            </div>
        </div>
    );
};

export default CareerSlideContainer;