import { useEffect, useRef, useState } from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatCurrency } from "../../utils/generateUtil";

import { motion } from 'framer-motion';

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
                    slidesToShow: 4,
                    slidesToScroll: 4,
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
                breakpoint: 1300,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                    }
            },
            {
                breakpoint: 1250,
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
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };

    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleResize)
        return () => window.addEventListener("resize", handleResize)
    }, [])

    const containerWidthCards = width < 400
        ? 240
        : width < 520
        ? 320
        : width < 750
        ? 510
        : width < 800
        ? 650
        : width < 900
        ? 750
        : width < 1150
        ? 650
        : width < 1250
        ? 850
        : width < 1300
        ? 900
        : width < 1400
        ? 1000
        : width < 1600
        ? 1150
        : width < 1800
        ? 1300
        : width < 2000
        ? 1500
        : width < 2100
        ? 1600
        : width < 2350
        ? 1800
        : 2000;
    

    return (
        <motion.div 
            className="lg:w-[1100px] sm:w-[480px] md:w-[768px] xl:w-[1200px] mx-4 mb-4 box-border"
            animate={{ width: containerWidthCards }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <div className="slider-container w-full overflow-visible">
                <Slider {...settings} sty>
                    {dataArray.map((item, index) => (
                        <SingleCard key={index} singleData={item} />
                    ))}
                </Slider>
            </div>  
        </motion.div>
    );
};

const SingleCard = ({ singleData }) => {
    return (
        <motion.div 
            className="flex border text-center my-6 dark:border-dark-mode-border bg-white bg-opacity-50 dark:bg-dark-mode dark:bg-opacity-50 justify-center rounded-lg dark:text-white w-52 lg:w-48 md:w-44 sm:w-32 h-[420px] px-4" 
            style={{ marginRight: '10px' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
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
        </motion.div>
    );
};

export default CardMainDashboard;