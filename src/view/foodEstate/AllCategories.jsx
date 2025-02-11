
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
    const [selectedProvinceName, setSelectedProvinceName] = useState('')
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
    const onProvinceClick = (namaProvinsi, kodeProvinsi) => {
        setIsProvinceClicked(true)
        console.log('Ini provinsi diklik test');
        setSelectedProvinceName(namaProvinsi)
    }

    const { response, error } = useEffectOtherApi(2024);
    return (
        <LayoutAdmin>
            <div className='w-full xl:grid lg:grid-cols-7 '>
                <div className='col-span-12 lg:col-span-5 '>

                    {/* header */}
                    <div className=" flex border dark:border-dark-mode-border ml-5 my-5 px-5 bg-white dark:bg-dark-mode-v2">
                        <div className="grid grid-cols-3 gap-4 lg:py-5  items-center w-full ">
                            <div className=" rounded flex  items-centers ">
                                <div className="flex-col justify-center block lg:hidden items-center ">
                                    <div className=" text-black dark:text-white text-xs lg:text-2xl  font-bold">DASHBOARD 360</div>
                                    <div className="text-black dark:text-white text-xs lg:text-2xl  font-bold">SEMUA FOOD ESTATE</div>
                                </div>
                            </div>
                            <div className=" text-white rounded ">
                                <div className="text-center h-20  flex-col justify-center hidden lg:block">
                                    <div className=" text-black dark:text-white text-xs lg:text-2xl text-center font-bold">DASHBOARD 360</div>
                                    <div className=" text-black dark:text-white text-xs lg:text-2xl text-center font-bold">SEMUA FOOD ESTATE</div>
                                </div>
                            </div>
                            <div className=" text-white flex justify-end">
                                <DropdownCustom listDropDown={listDropDown} />
                            </div>
                        </div>
                    </div>

                    <div className='border ml-5 p-2 flex justify-center dark:border-dark-mode-border bg-white dark:bg-dark-mode-v2'>
                        <div className=' w-[100%] h-[500px]'>
                            <IndonesiaMap onProvinceClick={onProvinceClick} />
                        </div>
                    </div>

                    {!isProvinceClicked &&
                        <div className='grid md:grid-cols-2 ml-5 mt-5  p-2 '>
                            <div className=' mb-10 md:mb-0  col-span-1 dark:text-white px-6 pt-4 border  bg-white dark:bg-dark-mode-bg dark:border-dark-mode-border mr-5'>
                                <TableForFoodEstate title={"Luas Panen (ha)"} data={dummyDataForTable} dataBe={response} titleBe={"Luas Panen"} />
                            </div>
                            <div className=' col-span-1 dark:text-white px-6 py-4  border bg-white dark:bg-dark-mode-bg dark:border-dark-mode-border '>
                                <TableForFoodEstate title={"Produktivitas (ku/ha)"} data={dummyDataForTable} dataBe={response} titleBe={"Produktivitas"} />
                            </div>
                        </div>
                    }
                </div>

                {/* grafik samping kanan */}
                {/* <div className='w-full border'> */}
                {isProvinceClicked ?
                    <div className='w-full xl:col-span-2 '>
                        <PieChartAfterFilteredByProvinceAllFoodEstate title={`Luas Panen (ha) Provinsi ${selectedProvinceName}`} data={dummyDataForSpecifiedProvince} />
                        <PieChartAfterFilteredByProvinceAllFoodEstate title={`Produktivitas (ku/ha) Provinsi ${selectedProvinceName}`} data={dummyDataForSpecifiedProvince} />
                    </div> :
                    <div className='w-full xl:col-span-2  '>
                        <div className='bg-white dark:bg-dark-mode-v2 m-5 border dark:border-dark-mode-border'>
                            <BarChartTumpukEachFoodEstate title={"Luas Panen (ha)"} data={dummyData} />
                        </div>
                        <div className='bg-white dark:bg-dark-mode-v2 m-5 border dark:border-dark-mode-border'>
                            <BarChartTumpukEachFoodEstate title={"Produktivitas (ku/ha)"} data={dummyData} />
                        </div>
                    </div>
                }

            </div>
        </LayoutAdmin>
    )
}

export default AllCategories