import React, { useEffect, useState } from 'react'
import LayoutAdmin from '../layout/LayoutAdmin'
import { IconGempaSVG, IconPointMapSVG, IconPointSVG } from '../component/IconSvg'
import IndonesiaMap from '../component/IndonesiaMap'

const Gempa = () => {
    const [activeCategory, setActiveCategory] = useState("TERKINI")
    const [activeCategoryTitle, setActiveCategoryTitle] = useState("Terkini")
    const [activeCategoryDesc, setActiveCategoryDesc] = useState("terkini")

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
        {
            id: "BERPOTENSI_TSUNAMI",
            label: "Berpotensi Tsunami",
            description: "berpotensi tsunami"
        },
        {
            id: "REAL_TIME",
            label: "Real-time",
            description: 'real-time'
        },
    ]

    const onProvinceClick = ({namaProvinsi, kodeProvinsi}) => {
        setIsProvinceClicked(true)
        console.log('Ini provinsi diklik  test');
    }

    useEffect(() => {
        console.log(activeCategory)
    }, [activeCategory])

    const MiniComponentStatusGunung = ({status}) => {
        return (
            <div className='text-sm rounded-[5px] w-fit text-green-custom bg-light-green-custom dark:bg-light-green-custom px-[10px] py-[10px]'>{status}</div>
        )
    }

    return (
        <LayoutAdmin>
            <div className='w-full min-h-screen dark:bg-dark-mode'>
                <div className="overflow-x-hidden border-y-[1px] py-6 px-[113px] dark:border-white">
                    <div className='dark:text-white font-bold text-center text-2xl'>DASHBOARD 360</div>
                    <div className='dark:text-white font-bold text-center text-2xl uppercase'>DATA GEMPA INDONESIA {activeCategoryTitle}</div>
                    <div className='dark:text-white text-center text-base'>Informasi gempa bumi {activeCategoryDesc} di wilayah Indonesia</div>
                </div>

                <div className='flex flex-row items-center justify-center gap-[15px] mt-[30px]'>
                    {categories.map((category) => {
                        return  (
                            <button 
                                key={category.id}
                                type="button" 
                                onClick={() => {
                                    setActiveCategory(category.id)
                                    setActiveCategoryTitle(category.label)
                                    setActiveCategoryDesc(category.description)
                                }} 
                                className={`border-2 dark:border-white border-dark-mode w-[196px] dark:text-white bg-blue-700  focus:ring-4 focus:ring-blue-300 
                                    font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800
                                    ${
                                        activeCategory === category.id
                                        ? 'bg-blue-custom dark:bg-blue-custom'
                                        : 'dark:bg-dark-mode hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }
                                    `}
                                >
                                {category.label}
                            </button>
                        )
                    })}
                </div>
                
                <div className='dark:border-white border-2 my-[30px] mx-20 py-[15px] max-w-[1180px] px-4 rounded-[15px] w-fit grid grid-cols-4 items-stretch'>
                    <div className='col-span-1 border-r-[1px] dark:border-white'>
                        <div className='pr-[25px] py-[11px]'>
                            <MiniComponentStatusGunung status={"Gempa Dirasakan"}/>
                            <div className='dark:text-white text-sm mt-[22px] mb-3'>09 Feb 2025, 19.37.01 WIB</div>
                            <div className='dark:text-white font-bold text-sm mt-[22px] mb-3'>Pusat gempa berada di darat 3 Km timur lau Lalolae, Kolaka Timur</div>
                        </div>
                    </div>
                    <div className='col-span-3 pl-[25px] grid grid-rows-4 py-[14px]'>
                        <div className='row-span-3 flex flex-row justify-between'>
                            <div className='flex flex-row items-center gap-[10px]'>
                                <IconGempaSVG color={"fill-red-custom"} />
                                <span className='text-base dark:text-white'>Magnitudo : 2,2</span>
                            </div>
                            <div className='flex flex-row items-center gap-[10px]'>
                                <IconPointSVG />
                                <span className='text-base dark:text-white'>Kedalaman : 5Km</span>
                            </div>
                            <div className='flex flex-row items-center gap-[10px]'>
                                <IconPointMapSVG />
                                <span className='text-base dark:text-white'>Lokasi : 4,05 LS-1221,80 BT</span>
                            </div>
                        </div>

                        <button className='w-[297px] row-span-1 rounded-[5px] bg-blue-custom mx-auto text-white '>
                            Lihat Detail
                        </button>
                    </div>
                </div>

                <div className='h-full p-[10px] border-t-[1px] dark:border-white' style={{ width: "100%", height: "541px" }}>
                    <IndonesiaMap clickable={false}/>
                </div>
            </div>
        </LayoutAdmin>
    )
}

export default Gempa