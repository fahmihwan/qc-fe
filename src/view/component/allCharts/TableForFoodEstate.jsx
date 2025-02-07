import SingleHeatMapTable from "./SingleHeatMapTable"

const TableForFoodEstate = ({title, data}) => {
    const getYear = new Date(data.data.startDate).getFullYear()

    const selectedData = title == "Luas Panen (ha)" ? data.data.totalLahan : data.data.produktivitas
    // console.log(data.data.produktivitas)

    return (
        <>
            <div className="text-center text-base font-bold mb-4 dark:text-white">
                Total {title} Food Estate Tahun {getYear}
            </div>
            <SingleHeatMapTable data={selectedData} />
        </>
    )
}

export default TableForFoodEstate