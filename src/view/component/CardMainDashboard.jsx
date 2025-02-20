import { useRef, useState } from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatCurrency } from "../../utils/generateUtil";

const CardMainDashboard = ({ allDataFoodEstate }) => {
    const dataArray = allDataFoodEstate || [];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        variableWidth: true,
        arrows: true, 
        responsive: [
            {
                breakpoint: 1700,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    dots: true
                    }
                },
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true
                    }
                },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                    }
                },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                    }
                },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    

    return (
        <div className="lg:w-[1100px] sm:w-[480px] x xl:w-[1200px] mx-4 mb-4 box-border">
            <div className="slider-container w-full overflow-visible">
                <Slider {...settings} sty>
                    {dataArray.map((item, index) => (
                        <SingleCard key={index} singleData={item} />
                    ))}
                </Slider>
            </div>  
        </div>
    );
};

const SingleCard = ({ singleData }) => {
    return (
        <div className="flex border text-center dark:border-dark-mode-border bg-white bg-opacity-50 dark:bg-dark-mode dark:bg-opacity-50 justify-center rounded-lg dark:text-white w-56 md:w-48 sm:w-32 h-[370px] px-4" style={{ marginRight: '10px' }}>
            <div className="w-full">
                <h5 className="py-3 font-bold dark:text-white uppercase">{singleData.title}</h5>
                <div className="h-[1px] dark:bg-white mb-5"></div>
                <div className="">
                    {Object.entries(singleData.data).map(([key, value], index) => (
                        <div className="mb-5" key={index}>
                            <h5 className="dark:text-white capitalize font-bold text-base">{key.replace(/Dan/g, " &").replace(/([A-Z])/g, ' $1')}</h5>
                            <span className="text-green-custom">{value == null ? "0" : formatCurrency(value)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardMainDashboard;