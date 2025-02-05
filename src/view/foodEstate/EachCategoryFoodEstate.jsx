import BarChartEachFoodEstate from '../component/allCharts/BarChartEachFoodEstate'
import IndonesiaMap from '../component/IndonesiaMap'
import DropdownCustom from '../component/miniComponent/DropdownCustom'
import LayoutAdmin from '../layout/LayoutAdmin'

const EachCategoryFoodEstate = ({category}) => {
    const listDropDown = [2024, 2023, 2022, 2021, 2020]

    const dummyData = (title) => {
        return {
            labels: [2020, 2021, 2022, 2023, 2024],
            datasets: [
                {
                    data: [1000000, 2034424, 1021242, 3080382, 1249124],
                    backgroundColor: title === "Luas Panen (ku/ha)" ? "rgba(178, 223, 138, 1)" : "rgba(244, 190, 55, 1)",
                    borderWidth: 0
                }
            ]
        }
    }

    return (
        <LayoutAdmin>
            <div className='w-full border-y-[1px] grid grid-cols-7'>
                <div className='col-span-5'>
                <div className="relative border-b-[1px] px-6 dark:border-white flex items-center">
                    <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
                        <div className="dark:text-white text-2xl font-bold">DASHBOARD 360</div>
                        <div className="dark:text-white text-2xl font-bold">FOOD ESTATE : {category.toUpperCase()}</div>
                    </div>

                    <div className="ml-auto">
                        <DropdownCustom listDropDown={listDropDown} />
                    </div>
                </div>

                    <div className='p-[10px] border-b-[1px] dark:border-white'  style={{width: "100%", height: "541px"}}>
                        <IndonesiaMap />
                    </div>

                    <marquee className="mx-6 my-4 dark:bg-dark-mode align-middle">
                        <span className="text-red-custom text-xl">{"Di sini"} </span>
                        <span className="dark:text-white text-xl font-bold">Akan ada </span>
                        <span className="text-green-custom text-xl">Running Text </span>
                    </marquee>
                </div>
                <div className='col-span-2 border-x-[1px]'>
                    <BarChartEachFoodEstate title={"Luas Panen (ku/ha)"} dummyData={dummyData("Luas Panen (ku/ha)")}/>
                    <div className='h-[1px] dark:bg-white'></div>
                    <BarChartEachFoodEstate title={"Produktivitas (ton)"} dummyData={dummyData("Produktivitas (ton)")}/>
                </div>
            </div>
        </LayoutAdmin>
    )
}

export default EachCategoryFoodEstate