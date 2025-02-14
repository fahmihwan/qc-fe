import { useEffect, useRef, useState } from 'react'
import { useEffectFoodEstate } from '../../hook/useEffectFoodEstate'
import BarChartEachFoodEstate from '../component/allCharts/BarChartEachFoodEstate'
import IndonesiaMap from '../component/IndonesiaMap'
import DropdownCustom from '../component/miniComponent/DropdownCustom'
import LayoutAdmin from '../layout/LayoutAdmin'
import { getChart } from '../../api/foodEstate'
import Marquee from 'react-fast-marquee'

const EachCategoryFoodEstate = ({ category }) => {
    const [isLoading, setIsLoading] = useState(true)

    const [dataLuasPanenToParse, setDataLuasPanenToParse] = useState({})
    const [dataProduktivitasToParse, setDataProduktivitasToParse] = useState({})
    const [allData, setAllData] = useState({})

    const [isProvinceClicked, setIsProvinceClicked] = useState(false)
    const [selectedProvinceName, setSelectedProvinceName] = useState('');
    const [selectedProvinceCode, setSelectedProvinceCode] = useState(null);

    const { response, error } = useEffectFoodEstate(category, null);

    useEffect(() => {
        if (response) {
            setDataLuasPanenToParse(formatChartData(response, 'Luas Panen (ha)'))
            setDataProduktivitasToParse(formatChartData(response, 'Produktivitas (ku/ha)'))
            setIsLoading(false)
        }
    }, [response]);


    // useEffect(() => {
    //     if (dataLuasPanenToParse && dataProduktivitasToParse) {
    //         // console.log("Data yang diterima:", dataLuasPanenToParse, dataProduktivitasToParse);
    //     } else if (dataLuasPanenToParse && dataProduktivitasToParse) {
    //         // console.error("Error fetching data:");
    //     }
    // }, [dataLuasPanenToParse, dataProduktivitasToParse]);    

    const formatChartData = (response, title) => {
        if (!response) {
            return { labels: [], datasets: [] }
        }

        const isLuasPanen = title === "Luas Panen (ha)"
        const dataKey = isLuasPanen ? "luasPanen" : "produktivitas"

        const dataList = response[dataKey] || []

        const sortedData = [...dataList].sort((a, b) => a.year - b.year)

        return {
            labels: sortedData.map(item => item.year),
            datasets: [
                {
                    data: sortedData.map(item => parseFloat(item.value)),
                    backgroundColor: isLuasPanen ? "rgba(178, 223, 138, 1)" : "rgba(244, 190, 55, 1)",
                    borderWidth: 0,
                }
            ]
        }
    }

    const fetchData = async (sub_category, province_id=null) => {
        if (!sub_category) {
            setError("params is not exists");
            return;
        }

        try {
            const response = await getChart(sub_category, province_id);
            if (response.data) {
                return response.data
            } else {
                // setError("Data dari API kosong!");
            }
        } catch (error) {
            // console.log("ada error di use effect: ", error)
            // setError(error);
        }
    }

    const dummyData = (title) => {
        return {
            labels: [2020, 2021, 2022, 2023, 2024],
            datasets: [
                {
                    data: [1000000, 2034424, 1021242, 3080382, 1249124],
                    backgroundColor: title == "Luas Panen (ton)" ? "rgba(178, 223, 138, 1)" : "rgba(244, 190, 55, 1)",
                    borderWidth: 0
                }
            ]
        }
    }

    const onProvinceClick = async(namaProvinsi, kodeProvinsi) => {
        console.log("ini berapa kali")
        await fetchData(category, kodeProvinsi).then((res)=>{
            setDataLuasPanenToParse(formatChartData(res, 'Luas Panen (ha)'))
            setDataProduktivitasToParse(formatChartData(res, 'Produktivitas (ku/ha)'))
            setSelectedProvinceName(namaProvinsi)
            setSelectedProvinceCode(kodeProvinsi)
            setIsProvinceClicked(true);
        })
     };

    const resetSelection = async() => {
        await fetchData(category).then((res)=>{
            setDataLuasPanenToParse(formatChartData(res, 'Luas Panen (ha)'))
            setDataProduktivitasToParse(formatChartData(res, 'Produktivitas (ku/ha)'))
            setIsProvinceClicked(false)
            setSelectedProvinceCode('')
            setSelectedProvinceName('')
        })
    }

    return (
        <LayoutAdmin>
            {isLoading ? (
                <div className="flex justify-center items-center h-screen text-white text-2xl">
                    Loading...
                </div>
            ) : (
                <div className='w-full xl:grid lg:grid-cols-7 '>
                    <div className='col-span-12 lg:col-span-5 '>

                        {/* header */}
                        <div className=" flex border dark:border-dark-border border-light-border rounded-[10px] ml-5 sm:mr-5 my-5 px-5 dark:bg-dark-mode-bg">
                            <div className="grid grid-cols-3 gap-4 lg:py-5  items-center w-full ">
                                <div className="rounded flex  items-">
                                    <div className="flex-col py-4 justify-center block lg:hidden items-center text-white">
                                        <div className="text-black dark:text-white text-xs lg:text-2xl  font-bold">DASHBOARD 360</div>
                                        <div className="text-black dark:text-white text-xs lg:text-2xl  font-bold">FOOD ESTATE : {category.toUpperCase()}</div>
                                    </div>
                                </div>
                                <div className=" text-white rounded ">
                                    <div className="text-center py-4 flex-col justify-center hidden lg:block">
                                        <div className="text-black dark:text-white text-xs lg:text-2xl text-center font-bold">DASHBOARD 360</div>
                                        <div className="text-black dark:text-white text-xs lg:text-2xl text-center font-bold">FOOD ESTATE : {category.toUpperCase()}</div>
                                    </div>
                                </div>
                                <div className=" text-white flex items-center justify-end">
                                    <div className='flex flex-col items-center align-middle'>
                                        {isProvinceClicked &&
                                            <button
                                                onClick={resetSelection}
                                                className="text-white w-36 lg:w-44 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                type="button"
                                            >
                                                <div className="items-center text-center w-full">
                                                    Seluruh Indonesia
                                                </div>
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="relative border-b-[1px] px-6 dark:border-white flex items-center">
                            <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
                                <div className="dark:text-white text-2xl font-bold">DASHBOARD 360</div>
                                <div className="dark:text-white text-2xl font-bold">FOOD ESTATE : {category.toUpperCase()}</div>
                            </div>

                            <div className="ml-auto">
                                <DropdownCustom listDropDown={listDropDown} />
                            </div>
                        </div> */}

                        <div className='border rounded-[10px] ml-5 sm:mr-5 p-2 flex justify-center dark:border-dark-border border-light-border'>
                            <div className=' w-[100%] h-[500px]'>
                                <IndonesiaMap onProvinceClick={onProvinceClick} earthquakeData={response?.earthquakeData || []} selectedProvinceCode={selectedProvinceCode} isProvinceClicked={isProvinceClicked} />
                            </div>
                        </div>

                        <div className="overflow-hidden  flex border dark:border-dark-border border-light-border rounded-[10px] ml-5 sm:mr-5 mt-5 px-5 dark:bg-dark-mode-bg mx-auto">
                            <div className='md:w-[700px] sm:[340px] lg:w-[800px] xl:w-[500px] 2xl:w-[1100px] 3xl:w-[1400px] items-center mx-5 py-5'>
                                <Marquee>
                                    <div className="flex gap-10 overflow-hidden">
                                            {[...Array(5)].map((_, i) => (
                                                <div key={i} className="flex whitespace-nowrap gap-10 w-max">
                                                    <span className="text-green-custom text-xl">
                                                        SELAMAT DATANG DI DASHBOARD 360
                                                    </span>
                                                    <span className="dark:text-white text-xl">|</span>
                                                    <span className="text-red-custom text-xl">
                                                        DASHBOARD MENYAJIKAN INFORMASI SEPUTAR FOOD ESTATE & BENCANA ALAM DI INDONESIA
                                                    </span>
                                                    <span className="dark:text-white text-xl">|</span>
                                                    <span className="text-green-custom text-xl">
                                                        KETAHANAN PANGAN INDONESIA
                                                    </span>
                                                    <span className="dark:text-white text-xl">|</span>
                                                    <span className="text-red-custom text-xl">
                                                        DATA TERBARU TERSEDIA
                                                    </span>
                                                    <span className="dark:text-white text-xl">|</span>
                                                    <span className="text-green-custom text-xl">
                                                        WASPADA DAN SIAP SIAGA
                                                    </span>
                                                    <span className="dark:text-white text-xl">|</span>
                                                    <span className="text-red-custom text-xl">
                                                        INFORMASI PENTING DI DASHBOARD 360
                                                    </span>
                                                    <span className="dark:text-white text-xl">|</span>
                                                </div>
                                            ))}
                                        </div>
                                </Marquee>
                            </div>
                        </div>
                    </div>
                    {!isLoading && response && (
                        <>
                            <div className='w-full xl:col-span-2'>
                                <div className=' m-5 border rounded-[10px] dark:border-dark-border border-light-border'>
                                    <BarChartEachFoodEstate title={"Luas Panen (ha)"} data={dataLuasPanenToParse} provinceName={selectedProvinceName ? selectedProvinceName : ''}/>
                                </div>
                                <div className=' m-5 border rounded-[10px] dark:border-dark-border border-light-border'>
                                    <BarChartEachFoodEstate title={"Produktivitas (ku/ha)"} data={dataProduktivitasToParse} provinceName={selectedProvinceName ? selectedProvinceName : ''}/>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            )
            }
        </LayoutAdmin >


    )
}

export default EachCategoryFoodEstate