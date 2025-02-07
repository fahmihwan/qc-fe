import { useRef, useState } from "react";

const SingleCard = ({ singleData }) => {
    return (
        <div 
            className="p-[25px] dark:bg-dark-mode dark:border-white border-[1px] border-dark-mode rounded-lg shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 min-w-[calc(20%-16px)] max-w-[calc(20%-16px)] overflow-hidden flex flex-col justify-between"
        >
            <h5 className="mb-2 text-base text-center font-bold tracking-tight text-gray-900 dark:text-white">
                {singleData.title}
            </h5>
            <div className="my-[10px] h-[1px] dark:bg-white bg-dark-mode"></div>

            <div className="overflow-y-auto flex-grow flex flex-col justify-center items-center scrollbar-hide">
                {Object.entries(singleData.data).map(([key, value], index) => (
                    <div className="flex flex-col justify-center items-center" key={index}>
                        <h5 className="dark:text-white text-sm capitalize text-center">{key.replace(/Dan/g, " &").replace(/([A-Z])/g, ' $1')}</h5>
                        <span className="dark:text-white text-xl text-center font-bold mb-4">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CardMainDashboard = ({ allDataFoodEstate }) => {
    const scrollRef = useRef();
    const [scrollIndex, setScrollIndex] = useState(0);
    const itemsPerScroll = 5;

    const handleScroll = (direction) => {
        const totalItems = allDataFoodEstate.data.length;
        const maxScrollIndex = Math.ceil(totalItems / itemsPerScroll) - 1;

        if (direction === 'left') {
            setScrollIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (direction === 'right') {
            setScrollIndex((prevIndex) => Math.min(prevIndex + 1, maxScrollIndex));
        }
    };

    const startIndex = scrollIndex * itemsPerScroll;
    const visibleItems = allDataFoodEstate.data.slice(startIndex, startIndex + itemsPerScroll);

    return (
        <section className="relative w-full overflow-x-hidden py-4">
            <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 dark:bg-white text-white dark:text-dark-mode bg-dark-mode p-2 mx-4 rounded-full"
                onClick={() => handleScroll('left')}
            >
                ◁
            </button>

            <div
                ref={scrollRef}
                className="flex gap-4 px-12 ml-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 snap-x scroll-smooth transition-all duration-500 ease-in-out"
                style={{ display: 'flex', flexWrap: 'nowrap' }}
            >
                {visibleItems.map((item, index) => (
                    <SingleCard key={index} singleData={item} />
                ))}
            </div>

            <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 dark:bg-white text-white dark:text-dark-mode bg-dark-mode p-2 mx-4 rounded-full"
                onClick={() => handleScroll('right')}
            >
                ▷
            </button>
        </section>
    );
};

export default CardMainDashboard;
