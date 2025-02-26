import React, { useEffect, useState } from 'react'
import LayoutAdmin from '../layout/LayoutAdmin'
import { IconGempaSVG, IconPointMapSVG, IconPointSVG, IconXSVG } from '../component/IconSvg'
import IndonesiaMap from '../component/IndonesiaMap'
import { TableForMagnitudoFive } from '../component/allGempaTables/TableForMagnitudoFive'
import { TableForDirasakan } from '../component/allGempaTables/TableForDirasakan'
import { TableForBerpotensiTsunami } from '../component/allGempaTables/TableForBerpotensiTsunami'
import { TableForRealTime } from '../component/allGempaTables/TableForRealTime'
import { SkalaMMI } from '../component/miniComponent/SkalaMMI'
import { useEffectGempa } from '../../hook/useEffectGempa'
import { useParams } from 'react-router-dom'
import { RingLoader } from 'react-spinners'
// import SidebarProvider from '../../context/SidebarContext'
import { AnimatePresence, motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const Gempa = () => {
    const [activeCategory, setActiveCategory] = useState("TERKINI")
    const [activeCategoryTitle, setActiveCategoryTitle] = useState("Terkini")
    const [activeCategoryDesc, setActiveCategoryDesc] = useState("terkini")
    const [selectedDetailGempa, setSelectedDetailGempa] = useState({})
    const [selectedEarthquakePoint, setSelectedEarthquakePoint] = useState(null)

    const [modalOpen, setModalOpen] = useState(false)

    const { response, loading, error, fetchData } = useEffectGempa(activeCategory)

    const categories = [
        {
            id: "TERKINI",
            label: "Terkini",
            description: "terkini"
        },
        {
            id: "M50",
            label: "M 5,0+",
            description: "magnitudo > 5,0"
        },
        {
            id: "DIRASAKAN",
            label: "Dirasakan",
            description: "dirasakan"
        },
        // {
        //     id: "BERPOTENSI_TSUNAMI",
        //     label: "Berpotensi Tsunami",
        //     description: "berpotensi tsunami"
        // },
        // {
        //     id: "REAL_TIME",
        //     label: "Real-time",
        //     description: 'real-time'
        // },
    ]

    const handleOpenModal = (gempa) => {
        setSelectedDetailGempa(gempa)
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setSelectedDetailGempa({})
        setModalOpen(false)
    }

    const onProvinceClick = ({ namaProvinsi, kodeProvinsi }) => {
        setIsProvinceClicked(true)
        console.log('Ini provinsi diklik  test');
    }

    const onEarthquakePointClicked = (id) => {
        console.log("berhasil di sini")
        setSelectedEarthquakePoint(id)
    }

    // useEffect(() => {
    //     console.log(activeCategory)
    // }, [activeCategory])

    const MiniComponentStatusGunung = ({ status }) => {
        return (
            <div className='text-sm rounded-[5px] w-fit text-green-custom bg-light-green-custom dark:bg-light-green-custom px-[10px] py-[10px]'>{status}</div>
        )
    }

    const CardSatuGempa = () => {
        const dataDetail = selectedEarthquakePoint ?
            response.Infogempa.gempa.length > 1 
                ? response.Infogempa.gempa.find((result) => result.Id === selectedEarthquakePoint) 
                : response.Infogempa.gempa[0]
            : response.Infogempa.gempa.length > 1 
                ? response.Infogempa.gempa[0]
                : response.Infogempa.gempa[0]
        console.log('ini data detail card', dataDetail)
        return (
            <div 
                className='dark:border-white border-2 my-[30px] mx-20 py-[15px] w-[90%] px-4 rounded-[15px] grid grid-cols-4 items-stretch'
            >
                <div className='col-span-1 border-r-[1px] dark:border-white'>
                    <div className='pr-[25px] py-[11px]'>
                        <MiniComponentStatusGunung status={dataDetail.Potensi ? dataDetail.Potensi : "Gempa Dirasakan"} />
                        <div className='dark:text-white text-sm mt-[22px] mb-3'>{dataDetail.Tanggal}, {dataDetail.Jam}</div>
                        <div className='dark:text-white font-bold text-sm mt-[22px] mb-3'>{dataDetail.Wilayah}</div>
                    </div>
                </div>
                <div className='col-span-3 pl-[25px] grid grid-rows-4 py-[14px]'>
                    <div className='row-span-3 flex flex-row justify-between'>
                        <div className='flex flex-row items-center gap-[10px]'>
                            <IconGempaSVG color={"fill-red-custom"} />
                            <span className='text-base dark:text-white'>Magnitudo : &nbsp;
                                <span className='text-green-custom'>
                                {dataDetail.Magnitude}
                                </span>
                            </span>
                        </div>
                        <div className='flex flex-row items-center gap-[10px]'>
                            <IconPointSVG />
                            <span className='text-base dark:text-white'>Kedalaman : &nbsp;
                                <span className='text-green-custom'>
                                {dataDetail.Kedalaman}
                                </span>
                            </span>
                        </div>
                        <div className='flex flex-row items-center gap-[10px]'>
                            <IconPointMapSVG />
                            <span className='text-base dark:text-white'>Lokasi : &nbsp;
                                <span className='text-green-custom'>
                                {dataDetail.Lintang} - {dataDetail.Bujur}
                                </span>
                            </span>
                        </div>
                    </div>

                    <motion.button
                        className='w-[297px] row-span-1 rounded-[5px] bg-blue-custom mx-auto text-white '
                        onClick={() => handleOpenModal(dataDetail)}
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        Lihat Detail
                    </motion.button>
                </div>
            </div>
        )
    }

    const ModalDetailGempa = ({ dataDetail }) => {
        console.log("modal detil gempa, ", dataDetail)
        const shakeMapCreator = () => {
            const monthMap = {
                "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04",
                "Mei": "05", "Jun": "06", "Jul": "07", "Agt": "08",
                "Sep": "09", "Okt": "10", "Nov": "11", "Des": "12"
            };

            let [day, month, year] = dataDetail.Tanggal.split(" ");
            let time = dataDetail.Jam.split(" ")[0]; // Hilangkan "WIB"
            console.log(`ini dari modal detail gempa shakemapcreator https://data.bmkg.go.id/DataMKG/TEWS/${year}${monthMap[month]}${day.padStart(2, '0')}${time.replace(/:/g, '')}.mmi.jpg`)
            return `https://data.bmkg.go.id/DataMKG/TEWS/${year}${monthMap[month]}${day.padStart(2, '0')}${time.replace(/:/g, '')}.mmi.jpg`;
        }
        return (
            <motion.div
                className='fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-70'
                onClick={() => handleCloseModal()}
                key={dataDetail.Id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
                <motion.div
                    className='bg-white rounded-[15px] dark:bg-dark-mode-bg lg:max-w-[60%] shadow-lg transform transition-all duration-300 opacity-100 scale-100'
                    onClick={(e) => e.stopPropagation()}
                    variants={fadeIn("up", 0.1)}
                    initial="hidden"
                    animate={"show"}
                    viewport={{once: true, amount: 0.5}}
                    exit={"hidden"}
                >
                    <div className='flex flex-row justify-between px-5 py-[13px] items-center'>
                        <span className='dark:text-white font-bold text-sm'>Gempa Bumi {activeCategoryTitle}</span>
                        <motion.button 
                            onClick={() => handleCloseModal()}
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <IconXSVG />
                        </motion.button>
                    </div>
                    <div className='h-[1px] dark:bg-white bg-dark-mode'></div>
                    <div className='grid grid-cols-2 '>
                        <div className='px-5 py-[24px] dark:border-white border-r-[1px] border-dark-mode dark:bg-dark-mode-bg'>
                            <img src={shakeMapCreator()} className='w-full' />
                        </div>
                        <div className='p-6 dark:bg-dark-mode-v2'>
                            <MiniComponentStatusGunung status={dataDetail.Potensi ? dataDetail.Potensi : "Gempa Dirasakan"} />
                            <div className='mt-[10px] dark:text-white text-xs'>{dataDetail.Tanggal}, {dataDetail.Jam}</div>
                            <div className='mt-5 dark:text-white text-base font-bold'>{dataDetail.Wilayah}</div>
                            <div className='mt-[30px] dark:bg-dark-mode px-[15px] border dark:border-white rounded-lg'>
                                <table className=' dark:text-white w-full'>
                                    <tbody>
                                        <tr className="border-b border-white">
                                            <td className="p-3 flex items-center">
                                                <div className='flex flex-row items-center gap-[10px]'>
                                                    <IconGempaSVG color={"fill-red-custom"} />
                                                    <span className='text-base dark:text-white'>Magnitudo</span>
                                                </div>
                                            </td>
                                            <td className="px-3">:</td>
                                            <td className="p-3">{dataDetail.Magnitude}</td>
                                        </tr>
                                        <tr className="border-b border-white">
                                            <td className="p-3 flex items-center">
                                                <div className='flex flex-row items-center gap-[10px]'>
                                                    <IconPointSVG color={"fill-red-custom"} />
                                                    <span className='text-base dark:text-white'>Kedalaman</span>
                                                </div>
                                            </td>
                                            <td className="px-3">:</td>
                                            <td className="p-3">{dataDetail.Kedalaman}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 align-middle">
                                                <div className="flex items-center gap-2">
                                                    <IconPointMapSVG color={"fill-red-custom"} />
                                                    <span className='text-base dark:text-white'>Lokasi</span>
                                                </div>
                                            </td>
                                            <td className="px-3 align-middle">:</td>
                                            <td className="p-3 align-middle">{dataDetail.Lintang} - {dataDetail.Bujur}</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>

                            {activeCategory != 'M50' && (
                                <>
                                    <div className='mt-[25px] dark:text-white text-xs mb-[10px]'>Dirasakan (Skala MMI)</div>
                                    <div className='flex justify-start gap-1 flex-wrap'>
                                        {(typeof dataDetail.Dirasakan === "string" ? dataDetail.Dirasakan.split(/,\s*/) : []).map((area, idx) => {
                                            const match = area.match(/^([IVXLCDM+-]+)/);
                                            const skala = match ? match[1] : ""; // Jika ada match, ambil skala MMI
                                            console.log("ini dari gempa ", dataDetail.Dirasakan)
                                            return <SkalaMMI key={idx} skala={skala} tulisan={area} />;
                                        })}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='flex flex-row justify-between px-5 h-[50px] py-[13px] items-center border-t border-dark-mode dark:border-white'>
                        <span className='dark:text-white font-bold  text-sm'></span>
                        <button onClick={() => handleCloseModal()} className='hidden'>
                            <IconXSVG />
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )
    }

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-screen dark:text-white text-2xl">
                    <RingLoader 
                        size={60}
                        color='#33A02C'
                    />
                </div>
            ) : (
                <div className='w-full min-h-screen'>
                    <motion.div
                        variants={fadeIn("up", 0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{once: true, amount: 0.7}}
                    >
                        <div 
                            className="overflow-x-hidden overflow-hidden flex flex-col border dark:border-dark-border border-light-border rounded-[10px] ml-5 sm:mr-5 my-5 px-5 py-5  justify-center dark:bg-dark-mode-bg"
                        >
                            <div className='dark:text-white font-bold text-center text-2xl'>DASHBOARD 360</div>
                            <div className='dark:text-white font-bold text-center text-2xl uppercase'>DATA GEMPA INDONESIA {activeCategoryTitle}</div>
                            <div className='text-green-custom text-center text-base'>Informasi gempa bumi {activeCategoryDesc} di wilayah Indonesia</div>
                        </div>

                        <div 
                            className='flex flex-row items-center justify-center gap-[15px] mt-[30px]'
                            variants={fadeIn("up", 0.2)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{once: true, amount: 0.7}}
                        >
                            {categories.map((category) => {
                                return (
                                    <button
                                        key={category.id}
                                        type="button"
                                        onClick={() => {
                                            setActiveCategory(category.id)
                                            setActiveCategoryTitle(category.label)
                                            setActiveCategoryDesc(category.description)
                                            fetchData(category.id)
                                        }}
                                        className={`border-2 dark:border-white border-dark-mode w-[196px] dark:text-white focus:ring-blue-300 
                                            font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800
                                            ${activeCategory === category.id
                                                ? 'bg-blue-custom dark:bg-blue-custom text-white'
                                                : 'dark:bg-dark-mode-bg hover:bg-gray-hover dark:hover:bg-gray-hover hover:text-white transition-colors duration-300 ease-in-out'
                                            }
                                            `}
                                    >
                                        {category.label}
                                    </button>
                                )
                            })}
                        </div>

                        <CardSatuGempa />
                    
                    
                    </motion.div>

                    <motion.div
                        variants={fadeIn("up", 0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{once: true, amount: 0.7}}
                    >
                        <div className=' ml-5 sm:mr-5 flex justify-center'>
                            <div className=' w-[100%] h-[500px] relative'>
                                <div id="legend-container" className="absolute bottom-5 left-[13px] bg-white dark:text-white dark:bg-dark-mode-bg p-6 border border-gray-300 shadow-md rounded-lg z-20">
                                    <h3 className="text-lg font-bold mb-4">Kedalaman (km)</h3>
                                    <div className="flex items-center mb-2">
                                        <span className="block w-5 h-5 mr-2 rounded-full bg-[#FF0000] border-2 border-[#CC0000]"></span>
                                        <span>≤ 50</span>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        <span className="block w-5 h-5 mr-2 rounded-full bg-[#FFA500] border-2 border-[#CC8400]"></span>
                                        <span>≤ 100</span>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        <span className="block w-5 h-5 mr-2 rounded-full bg-[#FFFF00] border-2 border-[#CCCC00]"></span>
                                        <span>≤ 250</span>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        <span className="block w-5 h-5 mr-2 rounded-full bg-[#008000] border-2 border-[#006D00]"></span>
                                        <span>≤ 600</span>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        <span className="block w-5 h-5 mr-2 rounded-full bg-[#0000FF] border-2 border-[#0000CC]"></span>
                                        <span>{'>'} 600</span>
                                    </div>
                                </div>
                                <IndonesiaMap
                                    clickable={false}
                                    earthquakeData={
                                        response.Infogempa?.gempa
                                            ? Array.isArray(response.Infogempa.gempa)
                                                ? response.Infogempa.gempa
                                                : [response.Infogempa.gempa]
                                            : []
                                    }
                                    hoverable={false}
                                    onEarthquakePointClicked={onEarthquakePointClicked}
                                />
                            </div>
                        </div>
                    
                    </motion.div>
                    <div className='mx-[82px] pb-9'>
                        {activeCategory !== "TERKINI" &&
                            <div className='dark:text-white font-bold text-[32px] mt-[111px] mb-[30px]'>
                                {response.Infogempa.gempa.length} Gempa Bumi {activeCategoryTitle}
                            </div>
                        }
                        {activeCategory === "M50" &&
                            <TableForMagnitudoFive data={response.Infogempa.gempa.slice(0, 15)} handleOpenModal={handleOpenModal} />
                        }

                        {activeCategory === "DIRASAKAN" &&
                            <TableForDirasakan data={response.Infogempa.gempa.slice(0, 15)} handleOpenModal={handleOpenModal} />
                        }

                        {activeCategory === "BERPOTENSI_TSUNAMI" &&
                            <TableForBerpotensiTsunami />
                        }

                        {activeCategory === "REAL_TIME" &&
                            <TableForRealTime />
                        }
                    </div>


                        
                    <AnimatePresence mode='wait'>
                        {modalOpen && (
                            <ModalDetailGempa dataDetail={selectedDetailGempa} />
                        )}
                    </AnimatePresence>
                </div>
            )}
        </>
    )
}

export default Gempa