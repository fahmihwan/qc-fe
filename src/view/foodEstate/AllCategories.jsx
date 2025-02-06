
import BarChartEachFoodEstate from '../component/allCharts/BarChartEachFoodEstate'
import BarChartTumpukEachFoodEstate from '../component/allCharts/BarChartTumpukEachFoodEstate'
import IndonesiaMap from '../component/IndonesiaMap'
import DropdownCustom from '../component/miniComponent/DropdownCustom'
import LayoutAdmin from '../layout/LayoutAdmin'

const AllCategories = () => {
    const listDropDown = [2024, 2023, 2022, 2021, 2020]

    const dummyData = {
        labels: [2020, 2021, 2022, 2023, 2024],
        datasets: [
            {
                label: 'Padi',
                data: [1000000, 1200000, 1500000, 1300000, 1400000],
                backgroundColor: 'rgba(178, 223, 138, 1)',
                borderWidth: 0
            },
            {
                label: 'Jagung',
                data: [500000, 600000, 700000, 650000, 750000],
                backgroundColor: 'rgba(244, 190, 55, 1)',
                borderWidth: 0
            },
            {
                label: 'Singkong',
                data: [500000, 600000, 700000, 650000, 750000],
                backgroundColor: 'rgba(21, 93, 33, 1)',
                borderWidth: 0
            },
            {
                label: 'Kedelai',
                data: [500000, 600000, 700000, 650000, 750000],
                backgroundColor: 'rgba(15, 44, 64, 1)',
                borderWidth: 0
            },
            {
                label: 'Tebu',
                data: [500000, 600000, 700000, 650000, 750000],
                backgroundColor: 'rgba(138, 28, 114, 1)',
                borderWidth: 0
            }
        ]
    }
    
    return (
        <LayoutAdmin>
            <div className='w-full border-y-[1px] grid grid-cols-7'>
                <div className='col-span-5'>
                    <div className="relative border-b-[1px] px-6 dark:border-white flex items-center">
                        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
                            <div className="dark:text-white text-2xl font-bold">DASHBOARD 360</div>
                            <div className="dark:text-white text-2xl font-bold">SEMUA KATEGORI FOOD ESTATE</div>
                        </div>

                        <div className="ml-auto">
                            <DropdownCustom listDropDown={listDropDown} />
                        </div>
                    </div>

                    <div className='p-[10px] dark:border-white'  style={{width: "100%", height: "541px"}}>
                        <IndonesiaMap />
                    </div>
                </div>
                <div className='col-span-2 border-x-[1px]'>
                    <BarChartTumpukEachFoodEstate title={"Luas Panen (ku/ha)"} dummyData={dummyData}/>
                    <div className='h-[1px] dark:bg-white'></div>
                    <BarChartTumpukEachFoodEstate title={"Produktivitas (ton)"} dummyData={dummyData}/>
                </div>
            </div>
        </LayoutAdmin>
    )
}

export default AllCategories