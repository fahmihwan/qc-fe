
import { useEffect, useState } from 'react'
import BarChartEachFoodEstate from '../component/allCharts/BarChartEachFoodEstate'
import BarChartTumpukEachFoodEstate from '../component/allCharts/BarChartTumpukEachFoodEstate'
import PieChartAfterFilteredByProvinceAllFoodEstate from '../component/allCharts/PieChartAfterFilteredByProvinceAllFoodEstate'
import TableForFoodEstate from '../component/allCharts/TableForFoodEstate'
import IndonesiaMap from '../component/IndonesiaMap'
import DropdownCustom from '../component/miniComponent/DropdownCustom'
import LayoutAdmin from '../layout/LayoutAdmin'
import { useEffectOtherApi } from '../../hook/useEffectOtherApi'
import { useEffectAllFoodEstate } from '../../hook/useEffectAllFoodEstate'
import { useEffectYears } from '../../hook/useEffectYears'
import { useEffectAllFoodEstateEachProvinceEachYear } from '../../hook/useEffectAllFoodEstateEachProvince'
import { getAllFoodEstateByProvinceIdAndYear } from '../../api/foodEstate'
import { RingLoader } from 'react-spinners'
// import SidebarProvider from '../../context/SidebarContext'

import { AnimatePresence, motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const AllCategories = () => {
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

    const [selectedProvinceName, setSelectedProvinceName] = useState('');
    const [selectedProvinceCode, setSelectedProvinceCode] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null)
    const [listDropDown, setListDropDown] = useState([])    

    const [isProvinceClicked, setIsProvinceClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [pieChartData, setPieChartData] = useState(null)
    const [errorPieChartData, setErrorPieChartData] = useState(null)

    const { response, error } = useEffectOtherApi(selectedYear);
    const { response: responseSideBarChart, error: errorSideBarChart } = useEffectAllFoodEstate();
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
        if (responseSideBarChart) {
            console.log("Data yang diterima:", responseSideBarChart);
        } else if (errorSideBarChart) {
            console.error("Error fetching data:", errorSideBarChart);
        }
    }, [responseSideBarChart, errorSideBarChart]);

    useEffect(() => {
        console.log(pieChartData)
    }, [pieChartData])

    useEffect(() => {
        if (selectedProvinceCode && selectedYear) {
            fetchData(selectedProvinceCode, selectedYear).then((res) => {
                setPieChartData(res);
            });
        }
    }, [selectedYear, selectedProvinceCode]);

     const fetchData = async (province_id, year) => {
        try{
            if(!province_id && !year) return;
            const response = await getAllFoodEstateByProvinceIdAndYear(province_id, year)
            if (response.data) {
                console.log("Data yang diterima test:", response);
                return response
            } else {
                // setError("Data dari API kosong!");
            }
        } catch (error) {
            // setError(error)
        }
    }

    const onProvinceClick = async(namaProvinsi, kodeProvinsi) => {
       await fetchData(kodeProvinsi, selectedYear).then((res)=>{
        console.log(res)
        setPieChartData(res)
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

    const resetSelection = () => {
        setIsProvinceClicked(false);
        setSelectedProvinceName('');
        setSelectedProvinceCode(null);
    };

    const crops = ["Padi", "Jagung", "Singkong", "Kedelai", "Tebu"];
    const colors = [
        'rgba(227, 26, 28, 1)',  // Padi
        'rgba(255, 127, 0, 1)',   // Jagung
        'rgba(244, 190, 55, 1)',     // Singkong
        'rgba(146, 255, 23, 1)',     // Kedelai
        'rgba(33, 107, 214, 1)'    // Tebu
    ];

    const labels = responseSideBarChart ? responseSideBarChart.map(item => item.year) : [];
    const datasetsLuasPanen = crops.map((crop, index) => ({
        label: crop,
        data: responseSideBarChart ? responseSideBarChart.map(item => item.luas_panen[crop]) : [],
        backgroundColor: colors[index],
        borderWidth: 0,
    }));

    const datasetsProduktivitas = crops.map((crop, index) => ({
        label: crop,
        data: responseSideBarChart ? responseSideBarChart.map(item => item.produktivitas[crop]) : [],
        backgroundColor: colors[index],
        borderWidth: 0,
    }));

    const chartDataLuasPanen = { labels, datasets: datasetsLuasPanen };
    const chartDataProduktivitas = { labels, datasets: datasetsProduktivitas };

    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center h-screen  text-white text-2xl">
                    <RingLoader 
                        size={60}
                        color='#33A02C'
                    />
                </div>
            ) : (
                <div>
                    {/* header */}
                    <motion.div 
                        className=" flex border dark:border-dark-border border-light-border rounded-[10px] ml-5 sm:mr-5 mt-5 px-5 dark:bg-dark-mode-bg"
                        variants={fadeIn("right", 0.3)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{once: true, amount: 0.5}}
                    >
                        <div className="grid grid-cols-3 gap-4 justify-center  lg:py-5  items-center w-full ">
                            <div className=" rounded  items-centers ">

                                <div className="flex-col justify-center block lg:hidden items-center py-6 dark:text-white">
                                    <div className="text-xs lg:text-2xl  font-bold">DASHBOARD 360</div>
                                    <div className="text-xs lg:text-2xl  font-bold">SEMUA FOOD ESTATE</div>
                                </div>
                            </div>
                            <div className=" dark:text-white rounded ">
                                <div className="text-center flex-col justify-center hidden lg:block ">
                                    <div className=" text-xs lg:text-2xl text-center font-bold">DASHBOARD 360</div>
                                    <div className=" text-xs lg:text-2xl text-center font-bold">SEMUA FOOD ESTATE</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <div className='w-full xl:grid lg:grid-cols-7 '>
                        <div className='col-span-12 lg:col-span-5 '>
                            <motion.div 
                                className=" flex flex-col border dark:border-dark-border border-light-border rounded-[10px] ml-5 sm:mr-5 lg:mr-0 my-5 px-5 py-5  justify-center dark:bg-dark-mode-bg"
                                variants={fadeIn("right", 0.3)}
                                initial="hidden"
                                whileInView={"show"}
                                viewport={{once: true, amount: 0.5}}
                            >
                                <div className='flex flex-row justify-between items-center'>
                                    <AnimatePresence>
                                        {isProvinceClicked ?
                                                <motion.button
                                                    onClick={resetSelection}
                                                    className="w-44 text-white  bg-blue-custom hover:bg-gray-hover font-sm rounded-[5px] text-sm px-[10px] py-[10px] text-center items-center dark:focus:ring-blue-800 transition-colors duration-300 ease-in-out"
                                                    type="button"
                                                    variants={fadeIn("right", 0.3, true)}
                                                    initial="hidden"
                                                    animate={"show"}
                                                    viewport={{once: false, amount: 0.5}}
                                                    exit={"exit"}
                                                    ><span className='text-center'>Seluruh Indonesia</span>
                                                </motion.button>
                                            : 
                                            <div className='w-44'></div>
                                        }
                                    </AnimatePresence>
                                    <DropdownCustom listDropDown={listDropDown} onSelect={onSelect} isProvinceClicked={isProvinceClicked}/>
                                </div>
                            </motion.div>
                            <motion.div 
                                className='ml-5 sm:mr-5 lg:mr-0 flex justify-center'
                                variants={fadeIn("right", 0.3)}
                                initial="hidden"
                                whileInView={"show"}
                                viewport={{once: true, amount: 0.5}}
                            >
                                <div className=' w-[100%] h-[500px]'>
                                    <IndonesiaMap onProvinceClick={onProvinceClick} earthquakeData={response?.earthquakeData || []} selectedProvinceCode={selectedProvinceCode} isProvinceClicked={isProvinceClicked} isProvinceColored={true}/>
                                </div>
                            </motion.div>

                            {!isProvinceClicked &&
                                <motion.div 
                                    className='grid md:grid-cols-2 ml-5 sm:mr-5 lg:mr-0 mb-5  mt-5 dark:bg-dark-mode-bg'
                                    variants={fadeIn("right", 0.3)}
                                    initial="hidden"
                                    whileInView={"show"}
                                    viewport={{once: true, amount: 0.5}}
                                >
                                    <div className=' mb-10 md:mb-0  col-span-1 dark:text-white px-6 pt-4 border dark:border-dark-border border-light-border rounded-[10px]  mr-5'>
                                        <TableForFoodEstate title={"Luas Panen (ha)"} data={dummyDataForTable} dataBe={response} titleBe={"Luas Panen"} year={selectedYear} footnote={"https://bps.go.id"}/>
                                    </div>
                                    <div className=' col-span-1 dark:text-white px-6 py-4 dark:border-dark-border border-light-border border rounded-[10px]  '>
                                        <TableForFoodEstate title={"Produktivitas (ku/ha)"} data={dummyDataForTable} dataBe={response} titleBe={"Produktivitas"} year={selectedYear} footnote={"https://bps.go.id"}/>
                                    </div>
                                </motion.div>
                            }
                        </div>

                        {/* grafik samping kanan */}
                        {isProvinceClicked && pieChartData ?
                            <div className='w-full xl:col-span-2'>
                                <motion.div 
                                    className='dark:bg-dark-mode-bg m-5 border rounded-[10px] dark:border-dark-border  overflow-hidden border-light-border'
                                    variants={fadeIn("left", 0.3)}
                                    initial="hidden"
                                    whileInView={"show"}
                                    viewport={{once: true, amount: 0.5}}
                                >
                                    <PieChartAfterFilteredByProvinceAllFoodEstate title={`Luas Panen (ha) Provinsi ${selectedProvinceName}`} data={pieChartData} year={selectedYear} footnote={"https://bps.go.id"}/>
                                </motion.div>
                                <motion.div 
                                    className='dark:bg-dark-mode-bg m-5 border rounded-[10px] dark:border-dark-border  overflow-hidden border-light-border'
                                    variants={fadeIn("left", 0.3)}
                                    initial="hidden"
                                    whileInView={"show"}
                                    viewport={{once: true, amount: 0.5}}
                                >
                                    <PieChartAfterFilteredByProvinceAllFoodEstate title={`Produktivitas (ku/ha) Provinsi ${selectedProvinceName}`} data={pieChartData} year={selectedYear} footnote={"https://bps.go.id"}/>
                                </motion.div>
                            </div> :
                            <div className='w-full xl:col-span-2  '>
                                <motion.div 
                                    className='dark:bg-dark-mode-bg m-5 border rounded-[10px] dark:border-dark-border overflow-hidden border-light-border'
                                    variants={fadeIn("left", 0.3)}
                                    initial="hidden"
                                    whileInView={"show"}
                                    viewport={{once: true, amount: 0.5}}
                                >
                                    <BarChartTumpukEachFoodEstate title={"Luas Panen (ha)"} data={chartDataLuasPanen} footnote={"https://bps.go.id"}/>
                                </motion.div>
                                <motion.div 
                                    className='dark:bg-dark-mode-bg m-5 border rounded-[10px] dark:border-dark-border overflow-hidden border-light-border'
                                    variants={fadeIn("left", 0.3)}
                                    initial="hidden"
                                    whileInView={"show"}
                                    viewport={{once: true, amount: 0.5}}
                                >
                                    <BarChartTumpukEachFoodEstate title={"Produktivitas (ku/ha)"} data={chartDataProduktivitas} footnote={"https://bps.go.id"}/>
                                </motion.div>
                            </div>
                        }
                    </div>
                </div>
            )}
        </>
    );
}

export default AllCategories