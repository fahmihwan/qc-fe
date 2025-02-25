import { useEffect, useRef, useState } from 'react'
import { useEffectFoodEstate } from '../../hook/useEffectFoodEstate'
import BarChartEachFoodEstate from '../component/allCharts/BarChartEachFoodEstate'
import IndonesiaMap from '../component/IndonesiaMap'
import DropdownCustom from '../component/miniComponent/DropdownCustom'
import LayoutAdmin from '../layout/LayoutAdmin'
import { getChart, getEachFoodEstateEachProvinceByYear } from '../../api/foodEstate'
import Marquee from 'react-fast-marquee'
import TableForAllProvincesEachFoodEstate from '../component/allCharts/TableForAllProvincesEachFoodEstate'
import { useEffectYears } from '../../hook/useEffectYears'
import PieChartAllProvincesEachFoodEstate from '../component/allCharts/PieChartAllProvincesEachFoodEstate'
import { RingLoader } from 'react-spinners'
// import SidebarProvider from '../../context/SidebarContext'

import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const EachCategoryFoodEstate = ({ category }) => {
    const [isLoading, setIsLoading] = useState(true)

    const [dataLuasPanenToParse, setDataLuasPanenToParse] = useState({})
    const [dataProduktivitasToParse, setDataProduktivitasToParse] = useState({})
    const [allData, setAllData] = useState({})

    const [isProvinceClicked, setIsProvinceClicked] = useState(false)
    const [selectedProvinceName, setSelectedProvinceName] = useState('');
    const [selectedProvinceCode, setSelectedProvinceCode] = useState(null);

    const [selectedYear, setSelectedYear] = useState(null)
    const [listDropDown, setListDropDown] = useState([])  
    const [tableData, setTableData] = useState([])

    const { response, error } = useEffectFoodEstate(category, null);
    const { response: responseListYear, error: errorListYear} = useEffectYears()

    useEffect(() => {
        if (responseListYear) {
            const years = responseListYear.map(item => parseInt(item.year));
            setListDropDown(years); 
            console.log("ini years",years)
            setSelectedYear(years[0])
        }
    }, [responseListYear]);

    useEffect(() => {
        if(category) {
            fetchData(category, null).then((res) => {
                console.log(res.data)
                setDataLuasPanenToParse(formatChartData(res, 'Luas Panen (ha)'))
                setDataProduktivitasToParse(formatChartData(res, 'Produktivitas (ku/ha)'))
            })
        }
    }, [category])

    useEffect(() => {
        if(category && selectedYear) {
            fetchDataAllProvinces(selectedYear, category).then((res) => {
                console.log(res.data)
                setTableData(res.data)
            })
        }
    }, [category, selectedYear])

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

    const fetchDataAllProvinces = async(year, sub_category) => {
        try{
            if(!year && !sub_category) return
            const response = await getEachFoodEstateEachProvinceByYear(year, sub_category)
            if(response.data) {
                console.log("Data yang diterima: ", response)
                return response
            } else {
                setError("Data dari API kosong!")
            }
        } catch (error) {
            setError(error)
        }
    }

    const onProvinceClick = async(namaProvinsi, kodeProvinsi) => {
        console.log("ini berapa kali", namaProvinsi, kodeProvinsi)
        await fetchData(category, kodeProvinsi).then((res)=>{
            setDataLuasPanenToParse(formatChartData(res, 'Luas Panen (ha)'))
            setDataProduktivitasToParse(formatChartData(res, 'Produktivitas (ku/ha)'))
            setSelectedProvinceName(namaProvinsi)
            setSelectedProvinceCode(kodeProvinsi)
            setIsProvinceClicked(true);
        })
     };

    const onSelect = async(year) => {
        setSelectedYear(year)
        await fetchData(selectedProvinceCode, selectedYear).then((res)=>{
            console.log(res)
            setPieChartData(res)
        })
    }

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
        <>
            {isLoading ? (
                <div className="flex justify-center items-center h-screen text-white text-2xl">
                    <RingLoader 
                        size={60}
                        color='#33A02C'
                    />
                </div>
            ) : (
                <div className='w-full xl:grid lg:grid-cols-7 '>
                    <div className='col-span-12 lg:col-span-5 '>

                        {/* header */}
                        <motion.div 
                            className=" flex border dark:border-dark-border border-light-border rounded-[10px] ml-5 sm:mr-5 my-5 px-5 dark:bg-dark-mode-bg"
                            variants={fadeIn("right", 0.3)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{once: true, amount: 0.5}}
                        >
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
                                            <motion.button
                                                onClick={resetSelection}
                                                className="w-44 text-white  bg-blue-custom hover:bg-gray-hover font-sm rounded-[5px] text-sm px-[10px] py-[10px] text-center items-center dark:focus:ring-blue-800 transition-colors duration-300 ease-in-out"
                                                type="button"
                                                variants={fadeIn("right", 0.3, true)}
                                                initial="hidden"
                                                whileInView={"show"}
                                                viewport={{once: true, amount: 0.5}}
                                            >
                                                <div className="items-center text-center w-full">
                                                    Seluruh Indonesia
                                                </div>
                                            </motion.button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* <div className="relative border-b-[1px] px-6 dark:border-white flex items-center">
                            <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
                                <div className="dark:text-white text-2xl font-bold">DASHBOARD 360</div>
                                <div className="dark:text-white text-2xl font-bold">FOOD ESTATE : {category.toUpperCase()}</div>
                            </div>

                            <div className="ml-auto">
                                <DropdownCustom listDropDown={listDropDown} />
                            </div>
                        </div> */}

                        <motion.div 
                            className='border rounded-[10px] ml-5 sm:mr-5 p-2 flex justify-center dark:border-dark-border border-light-border'
                            variants={fadeIn("right", 0.3)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{once: true, amount: 0.5}}
                        >
                            <div className=' w-[100%] h-[500px]'>
                                <IndonesiaMap onProvinceClick={onProvinceClick} earthquakeData={response?.earthquakeData || []} selectedProvinceCode={selectedProvinceCode} isProvinceClicked={isProvinceClicked} isProvinceColored={true} />
                            </div>
                        </motion.div>

                        <motion.div 
                            className="overflow-hidden  flex flex-col border dark:border-dark-border border-light-border rounded-[10px] ml-5 sm:mr-5 my-5 p-5 dark:bg-dark-mode-bg mx-auto"
                            variants={fadeIn("right", 0.3)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{once: true, amount: 0.5}}
                        >
                            <div className='flex flex-row justify-between items-center'>
                                <div className='dark:text-white font-bold text-2xl '>Data {category} di Seluruh Provinsi Tahun {selectedYear}</div>
                                <DropdownCustom listDropDown={listDropDown} onSelect={onSelect} isProvinceClicked={isProvinceClicked}/>
                            </div>
                            <TableForAllProvincesEachFoodEstate data={tableData}/>
                        </motion.div>
                    </div>
                    {!isLoading && response && (
                        <>
                            <div className='w-full xl:col-span-2 overflow-hidden'>
                                <motion.div 
                                    className=' m-5 border rounded-[10px] dark:border-dark-border border-light-border overflow-hidden'
                                    variants={fadeIn("left", 0.3)}
                                    initial="hidden"
                                    whileInView={"show"}
                                    viewport={{once: true, amount: 0.5}}
                                >
                                    <BarChartEachFoodEstate title={"Luas Panen (ha)"} data={dataLuasPanenToParse} provinceName={selectedProvinceName ? selectedProvinceName : ''}/>
                                </motion.div>
                                <motion.div 
                                    className=' m-5 border rounded-[10px] dark:border-dark-border border-light-border overflow-hidden'
                                    variants={fadeIn("left", 0.3)}
                                    initial="hidden"
                                    whileInView={"show"}
                                    viewport={{once: true, amount: 0.5}}
                                >
                                    <BarChartEachFoodEstate title={"Produktivitas (ku/ha)"} data={dataProduktivitasToParse} provinceName={selectedProvinceName ? selectedProvinceName : ''}/>
                                </motion.div>
                                <motion.div 
                                    className=' m-5 border rounded-[10px] dark:border-dark-border border-light-border overflow-hidden'
                                    variants={fadeIn("left", 0.3)}
                                    initial="hidden"
                                    whileInView={"show"}
                                    viewport={{once: true, amount: 0.5}}
                                >
                                    <PieChartAllProvincesEachFoodEstate title={"Luas Panen (ha)"} data={tableData} year={selectedYear}/>
                                </motion.div>
                                <motion.div 
                                    className=' m-5 border rounded-[10px] dark:border-dark-border border-light-border overflow-hidden'
                                    variants={fadeIn("left", 0.3)}
                                    initial="hidden"
                                    whileInView={"show"}
                                    viewport={{once: true, amount: 0.5}}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }} 
                                >
                                    <PieChartAllProvincesEachFoodEstate title={"Produktivitas (ku/ha)"} data={tableData} year={selectedYear}/>
                                </motion.div>
                            </div>
                        </>
                    )}

                </div>
            )
            }
        </>
    )
}

export default EachCategoryFoodEstate