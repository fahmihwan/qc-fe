import SingleHeatMapTable from "./SingleHeatMapTable"

const TableForFoodEstate = ({ title, data, dataBe, titleBe, year }) => {
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
        </>
    )
}

export default TableForFoodEstate