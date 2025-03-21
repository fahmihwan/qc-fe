
import { memo, useEffect, useMemo, useState } from 'react'
import IndonesiaMap from '../component/IndonesiaMap'
import TabelBencana from '../component/TabelBencana'
import LayoutAdmin from '../layout/LayoutAdmin'
import Marquee from 'react-fast-marquee'
import { Datepicker } from 'flowbite-react'
import { getAllBencana, getAllSummary, getByEachBencana } from '../../api/publicApi'
import { RingLoader } from 'react-spinners'
// import SidebarProvider from '../../context/SidebarContext'

import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import PieChartAllDisasters from '../component/allCharts/PieChartAllDisasters'
import { IconDownloadSVG } from '../component/IconSvg'
import DropdownCustomV2 from '../component/miniComponent/DropdownCustomV2'
import { TableForTabularBencana } from '../component/TableForTabularBencana'

const PantauandanDataTabular = () => {

    const defaultStartDate = new Date(new Date().setDate(new Date().getDate() - 7))
    const defaultEndDate = new Date()

    const [isProvinceClicked, setIsProvinceClicked] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const [startDate, setStartDate] = useState(defaultStartDate)
    const [endDate, setEndDate] = useState(defaultEndDate)
    
    const [minEndDate, setMinEndDate] = useState(startDate)
    const [maxEndDate, setMaxEndDate] = useState(defaultEndDate)

    const [fixedStartDate, setFixedStartDate] = useState(defaultStartDate)
    const [fixedEndDate, setFixedEndDate] = useState(defaultEndDate)

    const [selectedProvinceName, setSelectedProvinceName] = useState('')
    const [selectedProvinceCode, setSelectedProvinceCode] = useState(null)

    const [dataBencana, setDataBencana] = useState(null)
    
    const [subCategoryBencana, setSubCategoryBencana] = useState("SEMUA")
    const [selectedSubCategoryBencana, setSelectedSubCategoryBencana] = useState(subCategoryBencana)
    const listDropDownBencana = [
        "SEMUA",
        "BANJIR",
        "TANAH LONGSOR",
        "GEMPABUMI",
        "ERUPSI GUNUNG API",
        "CUACA EKSTREM",
        "GELOMBANG PASANG DAN ABRASI",
        "KEKERINGAN",
        "KEBAKARAN HUTAN DAN LAHAN",
        "TSUNAMI",
        "GEMPA BUMI DAN TSUNAMI"
    ]


    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const fetchData = async(startDateInput, endDateInput, provinceIdInput = null, sub_category = selectedSubCategoryBencana) => {
        try{
            // console.log("dari fetch data: ", provinceIdInput)
            console.log("start date fetch data", startDateInput)
            console.log("end date fetch data", endDateInput)
            console.log("selected sub category", selectedSubCategoryBencana)
            if(!startDate && !endDate){
                console.error("start date and end date dont exist")
                return
            }
            const responseBencana = await getByEachBencana(startDateInput, endDateInput, sub_category, provinceIdInput)

            if(responseBencana.data){
                // console.log("ini responsesummary", responseSummary.data)
                // console.log("ini response bencana", responseBencana.data)
                return { responseBencana }
            } 
        } catch (error) {
            setError(error)
        }
    }

    const fetchDataAsync = async (province_id, sub_category = selectedSubCategoryBencana, start = startDate, end = endDate) => {
        if (fixedStartDate && fixedEndDate) {
            console.log(selectedProvinceCode)
            console.log("ini province_id", province_id)
            try {
                const { responseBencana } = await fetchData(
                    formatDate(start), 
                    formatDate(end), 
                    province_id ? province_id : 0,
                    sub_category
                );
                setDataBencana(responseBencana.data.result);
                console.log("ini response bencana", responseBencana.data.result)
                setSelectedProvinceCode(province_id)
                // console.log("ini province_id", province_id)
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        if(dataBencana === null){
            fetchDataAsync(0)
        }
    },[])

    const {response} = []

    const themeDatePicker = {
            "root": {
                "base": "relative"
            },
            "popup": {
                "root": {
                    "base": "absolute top-10 z-50 block pt-2",
                    "inline": "relative top-0 z-auto",
                    "inner": "inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700"
                },
                "header": {
                    "base": "",
                    "title": "px-2 py-3 text-center font-semibold text-gray-900 dark:text-white",
                    "selectors": {
                        "base": "mb-2 flex justify-between",
                        "button": {
                            "base": "rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
                            "prev": "",
                            "next": "",
                            "view": ""
                        }
                    }
                },
                "view": {
                    "base": "p-1"
                },
                "footer": {
                    "base": "mt-2 flex space-x-2 hidden",
                    "button": {
                        "base": "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-gray-500",
                        "today": "bg-cyan-700 text-white hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-700",
                        "clear": "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                    }
                }
            },
            "views": {
                "days": {
                    "header": {
                        "base": "mb-1 grid grid-cols-7",
                        "title": "h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400"
                    },
                    "items": {
                        "base": "grid w-64 grid-cols-7",
                        "item": {
                            "base": "block flex-1 cursor-pointer text rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                            "selected": "bg-cyan-700 text-white hover:bg-cyan-800 dark:hover:bg-cyan-800",
                            "disabled": "text-gray-500 font-normal dark:bg-gray-600 bg-gray-100",
                        }
                    }
                },
                "months": {
                    "items": {
                        "base": "grid w-64 grid-cols-4",
                        "item": {
                            "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                            "selected": "bg-cyan-700 text-white hover:bg-cyan-800 dark:hover:bg-cyan-800",
                            "disabled": "text-gray-500 font-normal dark:bg-gray-600 bg-gray-100"
                        }
                    }
                },
                "years": {
                    "items": {
                        "base": "grid w-64 grid-cols-4",
                        "item": {
                            "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                            "selected": "bg-cyan-700 text-white hover:bg-cyan-800 dark:hover:bg-cyan-800",
                            "disabled": "text-gray-500 font-normal dark:bg-gray-600 bg-gray-100"
                        }
                    }
                },
                "decades": {
                    "items": {
                        "base": "grid w-64 grid-cols-4",
                        "item": {
                            "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                            "selected": "bg-cyan-700 text-white hover:bg-cyan-800 dark:hover:bg-cyan-800",
                            "disabled": "text-gray-500 font-normal dark:bg-gray-600 bg-gray-100"
                        }
                    }
                }
            }
        }
    
        
    const handleStartDateChange = (newStartDate) => {
        setStartDate(newStartDate)
        setEndDate(newStartDate)
        setMinEndDate(newStartDate)
    }
    
    const onDateChange = async(province_code = null) => {
        console.log("ini dari onDateChange", province_code);
        setIsLoading(true);

        const newStartDate = startDate;
        const newEndDate = endDate;

        setFixedStartDate(newStartDate);
        setFixedEndDate(newEndDate);
        setSelectedProvinceCode(province_code);
        setSelectedSubCategoryBencana(subCategoryBencana);

        await fetchDataAsync(province_code, subCategoryBencana, newStartDate, newEndDate);
    }

    const onProvinceClick = async(namaProvinsi, kodeProvinsi) => {
        console.log("Klik provinsi:", namaProvinsi, kodeProvinsi);
        // setIsLoading(true);
        console.log("ini start date on province click", startDate)
        console.log("ini end date on province click", endDate)

        setIsLoading(true)
        setSelectedProvinceCode(kodeProvinsi);
        setSelectedProvinceName(namaProvinsi)

        setStartDate((currentStartDate) => {
            setEndDate((currentEndDate) => {
                setSelectedSubCategoryBencana((currentSubCategoryBencana) => {
                    fetchDataAsync(kodeProvinsi, subCategoryBencana, currentStartDate, currentEndDate);
                    setIsProvinceClicked(true)
                    return currentSubCategoryBencana
                })
                return currentEndDate;
            });
            return currentStartDate;
        });
    };
        
    const resetSelection = async() => {
        setIsLoading(true)
        setIsProvinceClicked(false);
        setSelectedProvinceName('');
        setSelectedProvinceCode(null);

        setSelectedSubCategoryBencana((currentSelectedSubCategoryBencana) => {
            fetchDataAsync()
            return currentSelectedSubCategoryBencana
        })
    };

    const IndonesiaMapMemoized = useMemo(() => <IndonesiaMap onProvinceClick={onProvinceClick} earthquakeData={[]} selectedProvinceCode={selectedProvinceCode} isProvinceClicked={isProvinceClicked} isProvinceColored={true} disasterData={dataBencana}/>, [isProvinceClicked, selectedProvinceCode, dataBencana])
    // console.log("responseSummary ", responseSummary)

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
                <div className='w-full '>
                    <motion.div 
                        className=" flex flex-col border dark:border-dark-border border-light-border rounded-[10px] ml-5 sm:mr-5 my-5 px-5 py-5  justify-center dark:bg-dark-mode-bg"
                        variants={fadeIn("up", 0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{once: true, amount: 0.7}}
                    >
                        <div className='dark:text-white text-2xl font-bold text-center items-center uppercase'>Pantauan dan Data Tabular {isProvinceClicked ? `Provinsi ${selectedProvinceName}` : 'Indonesia'}</div>
                        <div className="flex flex-row justify-center gap-1 mt-4">
                            <span className="font-light italic text-sm text-light-gray-custom dark:text-dark-gray-custom">Sumber: </span>
                            <span className="font-light italic text-sm text-light-gray-custom dark:text-dark-gray-custom hover:font-medium underline underline-offset-4"> 
                                <a href="https://gis.bnpb.go.id/">https://gis.bnpb.go.id/</a>
                            </span>
                        </div>
                    </motion.div>

                    <motion.div 
                        className=" flex flex-col border dark:border-dark-border border-light-border rounded-[10px] ml-5 sm:mr-5 my-5 px-5 py-5  justify-center dark:bg-dark-mode-bg"
                        variants={fadeIn("up", 0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{once: true, amount: 0.7}}
                    >
                        <div className='flex flex-col justify-center'>
                            <div className='flex flex-row z-50 gap-4 justify-center items-center'>
                                <div className='dark:text-white'> Dari : </div>
                                <motion.div
                                    // whileTap={{ scale: 0.95 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Datepicker 
                                        className='w-[296px] z-50' 
                                        language='id' 
                                        theme={themeDatePicker}
                                        datatype='yyyy-MM-dd'
                                        value={startDate}
                                        onChange={handleStartDateChange}
                                        minDate={new Date(2008, 0, 1)}
                                        maxDate={new Date()}
                                    />
                                </motion.div>
                                <div className='dark:text-white'> Sampai : </div>
                                <motion.div
                                    // whileTap={{ scale: 0.95 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Datepicker 
                                        className='w-[296px] z-50' 
                                        language='id' 
                                        theme={themeDatePicker}
                                        datatype='yyyy-MM-DD'
                                        value={endDate}
                                        onChange={setEndDate}
                                        minDate={startDate}
                                        maxDate={new Date()}
                                    />
                                </motion.div>
                                <div className='dark:text-white'>Kejadian : </div>
                                <motion.div
                                    // whileTap={{ scale: 0.95 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <DropdownCustomV2
                                        listDropDown={listDropDownBencana}
                                        selectedItem={subCategoryBencana}
                                        setSelectedItem={setSubCategoryBencana}
                                        title={"Pilih Kejadian"}
                                        width={"296px"}
                                    />
                                </motion.div>
                            </div>
                            <div className='flex flex-row gap-6 mt-6 justify-center'>
                                <motion.button
                                    onClick={() => onDateChange(selectedProvinceCode)}
                                    className="text-white  bg-blue-custom hover:bg-gray-hover font-sm rounded-[5px] text-sm px-[10px] py-[10px] text-center inline-flex items-center dark:focus:ring-blue-800 transition-colors duration-300 ease-in-out"
                                    type="button"
                                    whileTap={{ scale: 0.95 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="items-center text-center text-sm">
                                        Tampilkan data
                                    </div>
                                </motion.button>
                                {isProvinceClicked &&
                                    <motion.button
                                        onClick={resetSelection}
                                        className="text-white  bg-blue-custom hover:bg-gray-hover font-sm rounded-[5px] text-sm px-[10px] py-[10px] text-center inline-flex items-center dark:focus:ring-blue-800 transition-colors duration-300 ease-in-out"
                                        type="button"
                                        whileTap={{ scale: 0.95 }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <div className="items-center text-center text-sm">
                                            Kembali ke Seluruh Indonesia
                                        </div>
                                    </motion.button>
                                }
                            </div>
                        </div>
                    </motion.div>

                    <div className='w-full'>
                        <div className='col-span-5'>
                            <motion.div 
                                className='ml-5 sm:mr-5 flex justify-center'
                                variants={fadeIn("up", 0.2)}
                                initial="hidden"
                                whileInView={"show"}
                                viewport={{once: true, amount: 0.7}}
                            >
                                <div className=' w-[100%] h-[500px] relative'>
                                    {IndonesiaMapMemoized}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    
                    <div className="overflow-hidden w-full">
                        <div className="overflow-x-auto px-5">
                            <TableForTabularBencana data={dataBencana || []} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default PantauandanDataTabular