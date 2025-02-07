const PieChartAfterFilteredByProvinceAllFoodEstate = ({title, data}) => {
    return (
        <>
            <div className="px-[29px] py-[15px] h-[306px] flex flex-col">
                <div className="dark:text-white font-bold text-xl mb-[10px]">{title}</div>
                <div className="h-full flex flex-grow items-center justify-center">
                    {/* <BarChart dummyData={dummyData} options={options} /> */}
                </div>
            </div>
            <div className='h-[1px] dark:bg-white'></div>
        </>
    )
}

export default PieChartAfterFilteredByProvinceAllFoodEstate