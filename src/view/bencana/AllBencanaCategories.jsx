
import { memo, useEffect, useMemo, useState } from 'react'
import IndonesiaMap from '../component/IndonesiaMap'
import TabelBencana from '../component/TabelBencana'
import LayoutAdmin from '../layout/LayoutAdmin'
import Marquee from 'react-fast-marquee'
import { Datepicker } from 'flowbite-react'
import { getAllBencana, getAllSummary } from '../../api/publicApi'
import { RingLoader } from 'react-spinners'
// import SidebarProvider from '../../context/SidebarContext'

import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const AllBencanaCategories = () => {

    const defaultStartDate = new Date(new Date().getFullYear(), 0, 1)
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

    const [dataSummary, setDataSummary] = useState(null)
    const [dataBencana, setDataBencana] = useState(null)

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const fetchData = async(startDateInput, endDateInput, provinceIdInput = null) => {
        try{
            // console.log("dari fetch data: ", provinceIdInput)
            if(!startDate && !endDate){
                console.error("start date and end date dont exist")
                return
            }
            const responseSummary = await getAllSummary(startDateInput, endDateInput, provinceIdInput)
            const responseBencana = await getAllBencana(startDateInput, endDateInput, provinceIdInput)

            if(responseSummary.data && responseBencana.data){
                // console.log("ini responsesummary", responseSummary.data)
                // console.log("ini response bencana", responseBencana.data)
                return { responseSummary, responseBencana }
            } 
        } catch (error) {
            setError(error)
        }
    }

    const fetchDataAsync = async (province_id = 0) => {
        if (startDate && endDate) {
            console.log(selectedProvinceCode)
            try {
                const { responseSummary, responseBencana } = await fetchData(
                    formatDate(startDate), 
                    formatDate(endDate), 
                    province_id
                );
                setDataSummary(responseSummary.data[0]);
                setDataBencana(responseBencana.data[0]);
                setFixedStartDate(startDate)
                setFixedEndDate(endDate)
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
        if(dataSummary === null & dataBencana === null){
            fetchDataAsync()
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
    
    const onProvinceClick = async(namaProvinsi, kodeProvinsi) => {
        console.log("dapat nama provinsi, kode prov", namaProvinsi, kodeProvinsi)
        setIsLoading(true)
        await fetchDataAsync(kodeProvinsi).then(() => {
            setIsProvinceClicked(true)
            setSelectedProvinceCode(kodeProvinsi)
            setSelectedProvinceName(namaProvinsi)
        })
        console.log('Ini provinsi diklik  test');
    }

    const resetSelection = async() => {
        setIsLoading(true)
        setIsProvinceClicked(false);
        setSelectedProvinceName('');
        setSelectedProvinceCode(null);
        await fetchDataAsync()
    };
    
    const handleStartDateChange = (newStartDate) => {
        setStartDate(newStartDate)
        setEndDate(newStartDate)
        setMinEndDate(newStartDate)
    }

    const onDateChange = async() => {
        setIsLoading(true)
        await fetchDataAsync()
    }

    const IndonesiaMapMemoized = useMemo(() => <IndonesiaMap onProvinceClick={onProvinceClick} earthquakeData={[]} selectedProvinceCode={selectedProvinceCode} isProvinceClicked={isProvinceClicked}/>, [isProvinceClicked, selectedProvinceCode])
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
                        <div className='dark:text-white text-2xl font-bold text-center items-center uppercase'>Geospasial Data Bencana {isProvinceClicked ? `Provinsi ${selectedProvinceName}` : 'Indonesia'}</div>
                    </motion.div>

                    <motion.div 
                        className=" flex flex-col border dark:border-dark-border border-light-border rounded-[10px] ml-5 sm:mr-5 my-5 px-5 py-5  justify-center dark:bg-dark-mode-bg"
                        variants={fadeIn("up", 0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{once: true, amount: 0.7}}
                    >
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-row z-50 gap-4 items-center'>
                                <div className='dark:text-white'> Dari </div>
                                <motion.div
                                    whileTap={{ scale: 0.95 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Datepicker 
                                        className='w-[296px]' 
                                        language='id' 
                                        theme={themeDatePicker}
                                        datatype='yyyy-MM-dd'
                                        value={startDate}
                                        onChange={handleStartDateChange}
                                        minDate={new Date(2008, 0, 1)}
                                        maxDate={new Date()}
                                    />
                                </motion.div>
                                <div className='dark:text-white'> sampai </div>
                                <motion.div
                                    whileTap={{ scale: 0.95 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Datepicker 
                                        className='w-[296px]' 
                                        language='id' 
                                        theme={themeDatePicker}
                                        datatype='yyyy-MM-DD'
                                        value={endDate}
                                        onChange={setEndDate}
                                        minDate={startDate}
                                        maxDate={new Date()}
                                    />
                                </motion.div>
                            </div>
                            <div className='flex flex-row gap-6'>
                                <motion.button
                                    onClick={onDateChange}
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

                    <motion.div 
                        className='ml-5 sm:mr-5 flex justify-center'
                        variants={fadeIn("up", 0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{once: true, amount: 0.7}}
                    >
                        <div className=' w-[100%] h-[500px]'>
                            {IndonesiaMapMemoized}
                        </div>
                    </motion.div>

                    <motion.div 
                        className="overflow-hidden mt-6 flex border dark:border-dark-border border-light-border rounded-[10px] ml-5 sm:mr-5 my-5 px-5 dark:bg-dark-mode-bg mx-auto"
                        variants={fadeIn("up", 0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{once: true, amount: 0.7}}
                    >
                        <div className='md:w-[700px] sm:[340px] lg:w-[800px] xl:w-[500px] 2xl:w-[1100px] 3xl:w-[1400px] items-center mx-5 py-5'>
                            <Marquee>
                                <div className="flex gap-10 overflow-hidden">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="flex whitespace-nowrap  w-max">
                                                <span className="text-red-custom text-xl">{"(UPDATE)"} </span>
                                                <span className="dark:text-white text-xl font-bold">Mag: </span>
                                                <span className="text-green-custom text-xl">3.3 </span>
                                                <span className="dark:text-white text-xl">| 30-Jan-25 20:57:34 WIB | </span>
                                                <span className="dark:text-white text-xl font-bold">Lok: </span>
                                                <span className="text-green-custom text-xl">4.09 LS </span>
                                                <span className="dark:text-white text-xl">, </span>
                                                <span className="text-green-custom text-xl">121.80 BT </span>
                                                <span className="dark:text-white text-xl">{"(Pusat gempa berada di darat"} </span>
                                            </div>
                                        ))}
                                    </div>
                            </Marquee>
                        </div>
                    </motion.div>

                    <TabelBencana dataBencana={dataBencana || {}} dataSummary={dataSummary || {}} startDate={fixedStartDate} endDate={fixedEndDate}/>
                </div>
            )}
        </>
    )
}

export default AllBencanaCategories