import React from 'react';
import { CareerTitleType, CareerType } from '@/app/types/CareerType';
import CareerCard from '@/app/components/careers/cards/CareerCard';

/** Propsの型定義 */
type CareerSlideContainerType = {  
    currentIndex: number;
    animationDuration: number;
    careerTitleData: CareerTitleType;
    careerData: CareerType[];
}

/**
 * CareerSlideContainerコンポーネント
 * @param props currentIndex, animationDuration, careerTitleData, careerData
 * @returns JSX
 */
const CareerSlideContainer = (props: CareerSlideContainerType) => {
    const { currentIndex, animationDuration, careerTitleData, careerData } = props;

    let cardAppendClass = `w-11/12 xl:w-5/6`;
    cardAppendClass = `${cardAppendClass} h-[600px] md:h-[900px]`;
    cardAppendClass = `${cardAppendClass} mx-4 sm:mx-8 md:mx-10 xl:mx-24`;

    return (
        <div className="basis-full xl:basis-8/12">
            <div className={`relative overflow-hidden ${cardAppendClass} mt-2`}>
                {careerData.map((career, index) => {
                    const animationDirection = index > currentIndex ? "slideRight" : "slideLeft";

                    return (
                        <CareerCard 
                            key={index}
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