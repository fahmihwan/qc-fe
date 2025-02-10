
import { useState } from 'react'
import BarChartEachFoodEstate from '../component/allCharts/BarChartEachFoodEstate'
import BarChartTumpukEachFoodEstate from '../component/allCharts/BarChartTumpukEachFoodEstate'
import PieChartAfterFilteredByProvinceAllFoodEstate from '../component/allCharts/PieChartAfterFilteredByProvinceAllFoodEstate'
import TableForFoodEstate from '../component/allCharts/TableForFoodEstate'
import IndonesiaMap from '../component/IndonesiaMap'
import DropdownCustom from '../component/miniComponent/DropdownCustom'
import LayoutAdmin from '../layout/LayoutAdmin'
import { useEffectOtherApi } from '../../hook/useEffectOtherApi'

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

    const { response, error } = useEffectOtherApi(2024);
    return (
        <LayoutAdmin>
            <div className='w-full border-y-[1px] xl:grid lg:grid-cols-7'>
                <div className='col-span-12 lg:col-span-5 '>

                    {/* header */}
                    <div className=" border-b-[1px]  dark:border-white flex ">
                        <div className="grid grid-cols-3 gap-4 lg:py-5 px-2 w-full items-center">
                            <div className="   rounded flex  items-centers">
                                <div className="flex-col justify-center block lg:hidden items-center ">
                                    <div className="dark:text-white text-xs lg:text-2xl  font-bold">DASHBOARD 360</div>
                                    <div className="dark:text-white text-xs lg:text-2xl  font-bold">SEMUA FOOD ESTATE</div>
                                </div>
                            </div>
                            <div className=" text-white rounded ">
                                <div className="text-center flex-col justify-center hidden lg:block">
                                    <div className="dark:text-white text-xs lg:text-2xl text-center font-bold">DASHBOARD 360</div>
                                    <div className="dark:text-white text-xs lg:text-2xl text-center font-bold">SEMUA FOOD ESTATE</div>
                                </div>
                            </div>
                            <div className=" text-white flex justify-end">
                                <DropdownCustom listDropDown={listDropDown} />
                            </div>
                        </div>
                    </div>


                    <div className='p-[10px] dark:border-white border-b-[1px]' style={{ width: "100%", height: "541px" }}>
                        <IndonesiaMap onProvinceClick={onProvinceClick} />
                    </div>

                    {!isProvinceClicked &&
                     <div className='grid md:grid-cols-2'>
                        <div className=' dark:border-white mb-10 md:mb-0  col-span-1 dark:text-white px-6 pt-4'>
                            <TableForFoodEstate title={"Luas Panen (ha)"} data={dummyDataForTable} dataBe={response} titleBe={"Luas Panen"} />
                        </div>
                        <div className=' dark:border-white col-span-1 dark:text-white px-6 py-4 sm:border-t-[1px] sm:dark:border-white'>
                            <TableForFoodEstate title={"Produktivitas (ku/ha)"} data={dummyDataForTable} dataBe={response} titleBe={"Produktivitas"} />
                        </div>
                    </div>
                    }
                </div>

                {/* grafik samping kanan */}
                {/* <div className='w-full border'> */}
                {isProvinceClicked ?
                    <div className='w-full xl:col-span-2 border-x-[1px] sm:border-t-[1px] sm:dark:border-white'>
                        <PieChartAfterFilteredByProvinceAllFoodEstate title={"Luas Panen (ha) Provinsi A"} data={dummyDataForSpecifiedProvince} />
                        <PieChartAfterFilteredByProvinceAllFoodEstate title={"Produktivitas (ku/ha) Provinsi A"} data={dummyDataForSpecifiedProvince} />
                    </div> :
                    <div className='w-full xl:col-span-2 border-x-[1px] sm:border-t-[1px] sm:dark:border-white'>
                        <BarChartTumpukEachFoodEstate title={"Luas Panen (ha)"} data={dummyData} />
                        <BarChartTumpukEachFoodEstate title={"Produktivitas (ku/ha)"} data={dummyData} />
                    </div>
                }

            </div>
        </LayoutAdmin>
    )
}

export default AllCategories