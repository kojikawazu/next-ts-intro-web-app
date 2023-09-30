import React from 'react';
import classNames from 'classnames';
import { Swiper, SwiperSlide  } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules'
import { MESSAGES } from '@/app/shared/constants/constants';
import { CareerTitleType, CareerType } from '@/app/types/CareerType';
import { validatePropsFilter, validateArraysProps, validateNumberProps, validateDataProps } from '@/app/shared/utils/validateUtilities';
import ErrorComponent from '@/app/components/common/error/ErrorComponent';
import { customLog, componentStart, componentJSX } from '@/app/shared/utils/logUtilities';
import { sendLogsToGCF } from '@/app/shared/helper/googleCloudLogger';
import CareerCard from '@/app/components/careers/cards/CareerCard';

/** css */ 
import "swiper/css";
import "swiper/css/pagination";

/** Propsの型定義 */
type CareerSlideContainerProps = {
    careerTitleData: CareerTitleType;
    careerData: CareerType[];
}

/**
 * CareerSlideContainerコンポーネント
 * @returns JSX
 */
const CareerSlideContainer: React.FC<CareerSlideContainerProps> = ({ 
    careerTitleData, 
    careerData 
}) => {
    componentStart(CareerSlideContainer);

    // Props検証
    const arrayError    = validateArraysProps([careerData], MESSAGES.ERRORS.NOT_ARRAYS);
    const dataError     = validateDataProps([careerTitleData], MESSAGES.ERRORS.NOT_DATA);
    const errors        = validatePropsFilter([arrayError, dataError]);
    if (errors.length > 0) {
        const errorJoin = errors.join(' ');
        customLog(CareerSlideContainer, 'error', errorJoin);
        sendLogsToGCF([errorJoin], 'ERROR');
        return <ErrorComponent errorData={MESSAGES.INVALIDS.INVALID_PROPS} /> ;
    }

    let cardAppendClass = classNames(["w-11/12", "xl:w-5/6"]);
    cardAppendClass     = classNames(cardAppendClass, ["h-[610px]", "sssm:h-[540px]", "md:h-[1010px]"]);
    cardAppendClass     = classNames(cardAppendClass, ["mx-4", "sm:mx-8", "md:mx-10", "xl:mx-24"]);

    componentJSX(CareerSlideContainer);
    return (
        <div className="basis-full xl:basis-8/12 bg-career">
            <div className={` ${cardAppendClass} mt-2`}>
                <Swiper
                    modules={[Pagination, Autoplay]}
                    slidesPerView={1} //一度に表示するスライドの数
                    pagination={{
                        clickable: true,
                    }} //何枚目のスライドかを示すアイコン、スライドの下の方にある
                    navigation //スライドを前後させるためのボタン、スライドの左右にある
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}>
                        {careerData.map((career, index) => {
                            return (
                                <SwiperSlide key={`career_${index}`}>
                                    <CareerCard 
                                        currentIndex={index}
                                        careerTitleData={careerTitleData}
                                        careerData={career} />
                                </SwiperSlide>
                            )
                        })}
                </Swiper>
            </div>
        </div>
    );
};

export default CareerSlideContainer;