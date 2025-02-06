const SingleCard = ({ singleFoodEstate }) => {
    return (
        <div className="block max-w-sm p-[25px] dark:bg-dark-mode dark:border-white border-[1px] border-dark-mode rounded-lg shadow-sm hover:bg-dark-mode dark:hover:bg-gray-700">
            <h5 className="mb-2 text-base text-center font-bold tracking-tight text-gray-900 dark:text-white">
                {singleFoodEstate.title}
            </h5>
            <div className="my-[10px] h-[1px] dark:bg-white"></div>
            <div className="flex flex-col justify-center items-center mb-4">
                <h5 className="dark:text-white text-sm">Luas Panen </h5>
                <span className="dark:text-white text-xl font-bold">{singleFoodEstate.data[0].luasPanen} {singleFoodEstate.data[0].satuan}</span>
            </div>
            <div className="flex flex-col justify-center items-center mb-4">
                <h5 className="dark:text-white text-sm">Produktivitas </h5>
                <span className="dark:text-white text-xl font-bold">{singleFoodEstate.data[1].produktivitas} {singleFoodEstate.data[1].satuan}</span>
            </div>
            <div className="flex flex-col justify-center  items-center">
                <h5 className="dark:text-white text-sm">Produksi </h5>
                <span className="dark:text-white text-xl font-bold">{singleFoodEstate.data[2].produksi} {singleFoodEstate.data[2].satuan}</span>
            </div>
        </div>
    );
};

const CardMainDashboard = ({ allDataFoodEstate }) => {
    return (
        <section className="px-5 pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {allDataFoodEstate.map((item, index) => (
                <SingleCard key={index} singleFoodEstate={item} />
            ))}
        </section>
    );
};

export default CardMainDashboard;
