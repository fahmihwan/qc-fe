import SingleHeatMapTable from "./SingleHeatMapTable"

const TableForFoodEstate = ({ title, data, dataBe, titleBe }) => {
    const getYear = new Date(data.data.startDate).getFullYear()

    const selectedData = title == "Luas Panen (ha)" ? data.data.totalLahan : data.data.produktivitas
    // console.log(data.data.produktivitas)


    return (
        <>
            <div className="text-center text-base font-bold mb-4 dark:text-white">
                Total {title} Food Estate Tahun {getYear}
            </div>
            <SingleHeatMapTable data={selectedData} dataBe={dataBe} titleBe={titleBe} />
        </>
    )
}

export default TableForFoodEstate