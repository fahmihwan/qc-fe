import SingleHeatMapTable from "./SingleHeatMapTable"

const TableForFoodEstate = ({ title, data, dataBe, titleBe }) => {
    const getYear = new Date(data.data.startDate).getFullYear()

    const selectedData = title == "Luas Panen (ha)" ? data.data.totalLahan : data.data.produktivitas
    // console.log(data.data.produktivitas)


    return (
        <>
            <p className="text-center text-xs lg:text-base font-bold mb-4 dark:text-white">
                Total {title} Food Estate Tahun {getYear}
            </p>
            <SingleHeatMapTable data={selectedData} dataBe={dataBe} titleBe={titleBe} />
        </>
    )
}

export default TableForFoodEstate