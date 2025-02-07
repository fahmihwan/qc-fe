import SingleHeatMapTable from "./SingleHeatMapTable"

const TableForFoodEstate = ({title, dummyData}) => {
    const getYear = new Date(dummyData.data.startDate).getFullYear()

    const selectedData = title == "Luas Panen (ha)" ? dummyData.data.totalLahan : dummyData.data.produktivitas
    console.log(dummyData.data.produktivitas)

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