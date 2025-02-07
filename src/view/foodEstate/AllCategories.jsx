
import { useState } from 'react'
import BarChartEachFoodEstate from '../component/allCharts/BarChartEachFoodEstate'
import BarChartTumpukEachFoodEstate from '../component/allCharts/BarChartTumpukEachFoodEstate'
import PieChartAfterFilteredByProvinceAllFoodEstate from '../component/allCharts/PieChartAfterFilteredByProvinceAllFoodEstate'
import TableForFoodEstate from '../component/allCharts/TableForFoodEstate'
import IndonesiaMap from '../component/IndonesiaMap'
import DropdownCustom from '../component/miniComponent/DropdownCustom'
import LayoutAdmin from '../layout/LayoutAdmin'

const AllCategories = () => {
    const listDropDown = [2024, 2023, 2022, 2021, 2020]
    const dummyDataForTable = {
        "message": "data fetch successfully",
        "data": {
            "startDate": "2024-01-01T00:00:00Z",
            "endDate": "2024-01-29T23:59:59Z",
            "provinceName": "all",
            "totalLahan": {
                "satuan": "ha",
                "padi": 10024212,
                "jagung": 1241353,
                "kedelai": 13892735,
                "tebu": 93935983,
                "singkong": 87982783
            },
            "produktivitas": {
                "satuan": "ku/ha",
                "padi": 298383,
                "jagung": 124,
                "kedelai": 329,
                "tebu": 93872,
                "singkong": 9827
            }
        }
    }

    const dummyDataForSpecifiedProvince = {
        "message": "data fetch successfully",
        "data": {
            "startDate": "2024-01-01T00:00:00Z",
            "endDate": "2024-01-29T23:59:59Z",
            "provinceName": "Sumatera Utara",
            "totalLahan": {
                "satuan": "ha",
                "padi": 10024212,
                "jagung": 1241353,
                "kedelai": 13892735,
                "tebu": 93935983,
                "singkong": 87982783
            },
            "produktivitas": {
                "satuan": "ku/ha",
                "padi": 298383,
                "jagung": 124,
                "kedelai": 329,
                "tebu": 93872,
                "singkong": 9827
            }
        }
    }

    const dummyData = {
        labels: [2020, 2021, 2022, 2023, 2024],
        datasets: [
            {
                label: 'Padi',
                data: [1000000, 1200000, 1500000, 1300000, 1400000],
                backgroundColor: 'rgba(178, 223, 138, 1)',
                borderWidth: 0,
                barPercentage: 1.2,
                barThickness: '30'
            },
            {
                label: 'Jagung',
                data: [500000, 600000, 700000, 650000, 750000],
                backgroundColor: 'rgba(244, 190, 55, 1)',
                borderWidth: 0,
                barPercentage: 1.2,
                barThickness: '30'
            },
            {
                label: 'Singkong',
                data: [500000, 600000, 700000, 650000, 750000],
                backgroundColor: 'rgba(21, 93, 33, 1)',
                borderWidth: 0,
                barPercentage: 1.2,
                barThickness: '30'
            },
            {
                label: 'Kedelai',
                data: [500000, 600000, 700000, 650000, 750000],
                backgroundColor: 'rgba(15, 44, 64, 1)',
                borderWidth: 0,
                barPercentage: 1.2,
                barThickness: '30'
            },
            {
                label: 'Tebu',
                data: [500000, 600000, 700000, 650000, 750000],
                backgroundColor: 'rgba(138, 28, 114, 1)',
                borderWidth: 0,
                barPercentage: 1.2,
                barThickness: '30'
            }
        ]
    }
    
    const [isProvinceClicked, setIsProvinceClicked] = useState(false)
    const onProvinceClick = () => {
        setIsProvinceClicked(true)
        console.log('Ini provinsi diklik  test');
    } 

    return (
        <LayoutAdmin>
            <div className='w-full border-y-[1px] grid grid-cols-7'>
                <div className='col-span-5'>
                    <div className="relative border-b-[1px] px-6 dark:border-white flex items-center">
                        <div className="absolute left-1/2 transform -translate-x-1/2 text-center h-20 flex flex-col justify-center">
                            <div className="dark:text-white text-2xl text-center font-bold">DASHBOARD 360</div>
                            <div className="dark:text-white text-2xl text-center font-bold">SEMUA KATEGORI FOOD ESTATE</div>
                        </div>

                        <div className="ml-auto">
                            <DropdownCustom listDropDown={listDropDown} />
                        </div>
                    </div>

                    <div className='p-[10px] dark:border-white border-b-[1px]'  style={{width: "100%", height: "541px"}}>
                        <IndonesiaMap onProvinceClick={onProvinceClick}/>
                    </div>

                    <div className='grid grid-cols-2'>
                        <div className=' dark:border-white border-r-[1px] col-span-1 dark:text-white px-6 pt-4'>
                            <TableForFoodEstate title={"Luas Panen (ha)"} data={dummyDataForTable}/>
                        </div>
                        <div className=' dark:border-white col-span-1 dark:text-white px-6 py-4'>
                            <TableForFoodEstate title={"Produktivitas (ku/ha)"} data={dummyDataForTable}/>
                        </div>
                    </div>
                </div>

                {isProvinceClicked ?
                    <div className='col-span-2 border-x-[1px]'>
                        <PieChartAfterFilteredByProvinceAllFoodEstate title={"Luas Panen (ha) Provinsi A"} data={dummyDataForSpecifiedProvince}/>
                        <PieChartAfterFilteredByProvinceAllFoodEstate title={"Produktivitas (ku/ha) Provinsi A"} data={dummyDataForSpecifiedProvince}/>
                    </div> :
                    <div className='col-span-2 border-x-[1px]'>
                        <BarChartTumpukEachFoodEstate title={"Luas Panen (ha)"} data={dummyData}/>
                        <BarChartTumpukEachFoodEstate title={"Produktivitas (ku/ha)"} data={dummyData}/>
                    </div>
                }
            </div>
        </LayoutAdmin>
    )
}

export default AllCategories