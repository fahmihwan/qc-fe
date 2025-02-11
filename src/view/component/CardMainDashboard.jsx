import { useRef, useState } from "react";
import Slider from 'react-slick';

const CardMainDashboard = ({ allDataFoodEstate }) => {
    console.log("ini data alldatafoodestate", allDataFoodEstate);
    const scrollRef = useRef();
    const [scrollIndex, setScrollIndex] = useState(0);
    const itemsPerScroll = 5;

    // Pastikan kita mengambil data sebagai array
    const dataArray = allDataFoodEstate || [];

    const handleScroll = (direction) => {
        const totalItems = dataArray.length;
        const maxScrollIndex = Math.ceil(totalItems / itemsPerScroll) - 1;

        if (direction === 'left') {
            setScrollIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (direction === 'right') {
            setScrollIndex((prevIndex) => Math.min(prevIndex + 1, maxScrollIndex));
        }
    };

    const startIndex = scrollIndex * itemsPerScroll;
    console.log(startIndex);
    console.log("ini dataarray", dataArray)
    console.log("ini start index", startIndex)
    const visibleItems = dataArray


    function SampleNextArrow(props) {
        const { onClick } = props;
        return (
            <button
                className=' absolute bg-white text-black right-0 top-0 z-50'
                onClick={onClick}>
                next
            </button>
        );
    }
    function SamplePrevArrow(props) {
        const { onClick } = props;
        return (
            <button className=' absolute bg-white text-black left-0 top-0 z-50'
                onClick={onClick}>
                prev
            </button >
        );
    }

    // const settings = {
    //     dots: true,
    //     // infinite: true,
    //     // speed: 900,
    //     slidesToShow: 5,
    //     variableWidth: true,
    //     slidesToScroll: 3,
    //     initialSlide: 0,
    //     autoplay: false,
    //     // autoplaySpeed: 3000,
    //     // pauseOnHover: true,
    //     // cssEase: "linear",
    //     nextArrow: <SampleNextArrow />,
    //     prevArrow: <SamplePrevArrow />,
    //     responsive: [
    //         {
    //             breakpoint: 1024,
    //             settings: {
    //                 slidesToShow: 3,
    //                 slidesToScroll: 3,
    //                 infinite: true,
    //                 dots: true
    //             }
    //         },
    //         {
    //             breakpoint: 600,
    //             settings: {
    //                 slidesToShow: 2,
    //                 slidesToScroll: 2,
    //                 initialSlide: 2
    //             }
    //         },
    //         {
    //             breakpoint: 480,
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1
    //             }
    //         }
    //     ]

    // };

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,

        slidesToShow: 5,
        slidesToScroll: 5
    };
    return (
        <div className="w-[1400px] relative box-border">
            {/* <div className=' border border-red-500 overflow-hidden '> */}
            <div className="slider-container">
                <Slider {...settings}>
                    {visibleItems.map((item, index) => (
                        <SingleCard key={index} singleData={item} />
                    ))}
                </Slider>
            </div>
            {/* <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 dark:bg-white text-white dark:text-dark-mode bg-dark-mode p-2 mx-4 rounded-full"
                onClick={() => handleScroll('left')}
            >
                ◁
            </button> */}





            {/* <div
                ref={scrollRef}
                className="flex gap-4 px-12 ml-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 snap-x scroll-smooth transition-all duration-500 ease-in-out"
                style={{ display: 'flex', flexWrap: 'nowrap' }}
            >
                {visibleItems.map((item, index) => (
                    <SingleCard key={index} singleData={item} />
                ))}
            </div> */}

            {/* <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 dark:bg-white text-white dark:text-dark-mode bg-dark-mode p-2 mx-4 rounded-full"
                onClick={() => handleScroll('right')}
            >
                ▷
            </button> */}
        </div>
    );
};


const SingleCard = ({ singleData }) => {
    return (
        <>
            {/* 
            <div className="bg-dark-mode-bg text-white m-5 h-72 text-center border p-5 border-dark-mode-border rounded-md">
                <h5 className="border-b">{singleData.title}</h5>
                {Object.entries(singleData.data).map(([key, value], index) => (
                    <div className="" key={index}>
                        <h5 className="dark:text-white ">{key.replace(/Dan/g, " &").replace(/([A-Z])/g, ' $1')}</h5>
                        <span className="dark:text-white">{value == null ? "0" : value}</span>
                    </div>
                ))}
            </div> */}


            <div className="flex border text-center  dark:border-dark-mode-border bg-white dark:bg-dark-mode-v2 justify-center rounded-lg dark:text-white w-[250px] h-[350px]
             mr-5 mt-5">
                <div>
                    <h5 className="border-b py-3 mb-5">{singleData.title}</h5>
                    <div className="">
                        {Object.entries(singleData.data).map(([key, value], index) => (
                            <div className="mb-5" key={index}>
                                <h5 className="dark:text-white ">{key.replace(/Dan/g, " &").replace(/([A-Z])/g, ' $1')}</h5>
                                <span className="dark:text-white">{value == null ? "0" : value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>





        </>
        // <div
        //     className="border m-5"
        // >
        //     <h5 className="mb-2 text-base text-center font-bold tracking-tight text-gray-900 dark:text-white uppercase">
        //         {singleData.title}
        //     </h5>
        //     <div className="my-[10px] h-[1px] dark:bg-white bg-dark-mode"></div>

        //     <div className="overflow-y-auto flex-grow flex flex-col justify-center items-center scrollbar-hide">
        //         {Object.entries(singleData.data).map(([key, value], index) => (
        //             <div className="flex flex-col justify-center items-center" key={index}>
        //                 <h5 className="dark:text-white text-sm capitalize text-center">{key.replace(/Dan/g, " &").replace(/([A-Z])/g, ' $1')}</h5>
        //                 <span className="dark:text-white text-xl text-center font-bold mb-4">{value == null ? "0" : value}</span>
        //             </div>
        //         ))}
        //     </div>
        // </div>
    );
};

export default CardMainDashboard;
