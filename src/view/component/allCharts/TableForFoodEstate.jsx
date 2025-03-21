import SingleHeatMapTable from "./SingleHeatMapTable"

const TableForFoodEstate = ({ title, data, dataBe, titleBe, year, footnote }) => {
    // const getYear = new Date(data.data.startDate).getFullYear()

    const selectedData = title == "Luas Panen (ha)" ? data.data.totalLahan : data.data.produktivitas

    return (
        <>
            <div className="flex justify-center items-center h-[40px] mb-4">
                <p className="text-center text-xs lg:text-base font-bold dark:text-white">
                    Total {title} Food Estate Tahun {year}
                </p>
            </div>
            <SingleHeatMapTable data={selectedData} dataBe={dataBe} titleBe={titleBe} />
            {footnote &&
                <div className="flex flex-row gap-1 pt-4">
                    <span className="font-light italic text-sm text-light-gray-custom dark:text-dark-gray-custom">Sumber: </span>
                    <span className="font-light italic text-sm text-light-gray-custom dark:text-dark-gray-custom hover:font-medium underline underline-offset-4"> 
                        <a href={footnote}> {footnote}</a>
                    </span>
                </div>
            }
        </>
    )
}

export default TableForFoodEstate