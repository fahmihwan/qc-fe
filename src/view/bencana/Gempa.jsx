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

const Gempa = () => {
    const [activeCategory, setActiveCategory] = useState("TERKINI")
    const [activeCategoryTitle, setActiveCategoryTitle] = useState("Terkini")
    const [activeCategoryDesc, setActiveCategoryDesc] = useState("terkini")
    const [selectedDetailGempa, setSelectedDetailGempa] = useState({})

    const [modalOpen, setModalOpen] = useState(false)

    const {response, loading, error, fetchData} = useEffectGempa(activeCategory)



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

    const dummyDataMagnitudoFive = {
        "Infogempa": {
          "gempa": [
            {
              "Tanggal": "08 Feb 2025",
              "Jam": "12:00:33 WIB",
              "DateTime": "2025-02-08T05:00:33+00:00",
              "Coordinates": "-6.10,103.20",
              "Lintang": "6.10 LS",
              "Bujur": "103.20 BT",
              "Magnitude": "5.2",
              "Kedalaman": "10 km",
              "Wilayah": "130 km BaratDaya PESISIRBARAT-LAMPUNG",
              "Potensi": "Tidak berpotensi tsunami"
            },
            {
              "Tanggal": "08 Feb 2025",
              "Jam": "01:32:18 WIB",
              "DateTime": "2025-02-07T18:32:18+00:00",
              "Coordinates": "-1.86,138.93",
              "Lintang": "1.86 LS",
              "Bujur": "138.93 BT",
              "Magnitude": "5.3",
              "Kedalaman": "10 km",
              "Wilayah": "20 km Tenggara SARMI-PAPUA",
              "Potensi": "Tidak berpotensi tsunami"
            },
            {
              "Tanggal": "07 Feb 2025",
              "Jam": "00:09:50 WIB",
              "DateTime": "2025-02-06T17:09:50+00:00",
              "Coordinates": "-2.52,141.95",
              "Lintang": "2.52 LS",
              "Bujur": "141.95 BT",
              "Magnitude": "5.5",
              "Kedalaman": "10 km",
              "Wilayah": "142 km TimurLaut JAYAPURA-PAPUA",
              "Potensi": "Tidak berpotensi tsunami"
            },
            {
              "Tanggal": "06 Feb 2025",
              "Jam": "23:24:53 WIB",
              "DateTime": "2025-02-06T16:24:53+00:00",
              "Coordinates": "-2.57,141.90",
              "Lintang": "2.57 LS",
              "Bujur": "141.90 BT",
              "Magnitude": "5.6",
              "Kedalaman": "10 km",
              "Wilayah": "136 km TimurLaut JAYAPURA-PAPUA",
              "Potensi": "Tidak berpotensi tsunami"
            },
          ]
        }
    }

    const dummyDataDirasakan = {
        "Infogempa": {
          "gempa": [
            {
              "Tanggal": "11 Feb 2025",
              "Jam": "04:24:05 WIB",
              "DateTime": "2025-02-10T21:24:05+00:00",
              "Coordinates": "2.91,118.46",
              "Lintang": "2.91 LU",
              "Bujur": "118.46 BT",
              "Magnitude": "3.9",
              "Kedalaman": "10 km",
              "Wilayah": "Pusat gempa berada di laut 107 km Tenggara TARAKAN",
              "Dirasakan": "II Berau , II Tanjung Selor"
            },
            {
              "Tanggal": "10 Feb 2025",
              "Jam": "22:15:06 WIB",
              "DateTime": "2025-02-10T15:15:06+00:00",
              "Coordinates": "-9.76,119.63",
              "Lintang": "9.76 LS",
              "Bujur": "119.63 BT",
              "Magnitude": "5.1",
              "Kedalaman": "39 km",
              "Wilayah": "Pusat gempa berada di laut 15 km tenggara Waibakul",
              "Dirasakan": "III Sumba Timur, III Bima"
            },
            {
              "Tanggal": "09 Feb 2025",
              "Jam": "19:37:01 WIB",
              "DateTime": "2025-02-09T12:37:01+00:00",
              "Coordinates": "-4.05,121.80",
              "Lintang": "4.05 LS",
              "Bujur": "121.80 BT",
              "Magnitude": "2.2",
              "Kedalaman": "5 km",
              "Wilayah": "Pusat gempa berada di darat 3 km timurlaut Lalolae, Kolaka Timur",
              "Dirasakan": "II Kolaka Timur"
            },
            {
              "Tanggal": "08 Feb 2025",
              "Jam": "19:13:57 WIB",
              "DateTime": "2025-02-08T12:13:57+00:00",
              "Coordinates": "-4.76,119.92",
              "Lintang": "4.76 LS",
              "Bujur": "119.92 BT",
              "Magnitude": "4.1",
              "Kedalaman": "8 km",
              "Wilayah": "Pusat gempa berada di darat 16 km barat daya Bone",
              "Dirasakan": "II-III Bone, II - III Soppeng, II Pangkep, II Maros, II Sinjai, II Makassar, II Gowa"
            },
          ]
        }
      }

    const cobaModal = {
        "Infogempa": {
          "gempa": {
            "Tanggal": "11 Feb 2025",
            "Jam": "07:37:17 WIB",
            "DateTime": "2025-02-11T00:37:17+00:00",
            "Coordinates": "-7.27,108.77",
            "Lintang": "7.27 LS",
            "Bujur": "108.77 BT",
            "Magnitude": "3.9",
            "Kedalaman": "16 km",
            "Wilayah": "Pusat gempa berada di darat, 28 km TimurLaut KOTA-BANJAR",
            "Potensi": "Gempa ini dirasakan untuk diteruskan pada masyarakat",
            "Dirasakan": "III Bantarkawung, III Wanareja, III Majenang, II-III Kota Banjar, III Bumiayu",
            "Shakemap": "20250211073717.mmi.jpg"
          }
        }
      }
      

    const handleOpenModal = (gempa) => {
        setSelectedDetailGempa(gempa)
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setSelectedDetailGempa({})
        setModalOpen(false)
    }

    const onProvinceClick = ({namaProvinsi, kodeProvinsi}) => {
        setIsProvinceClicked(true)
        console.log('Ini provinsi diklik  test');
    }

    // useEffect(() => {
    //     console.log(activeCategory)
    // }, [activeCategory])
    
    
    const MiniComponentStatusGunung = ({status}) => {
        return (
            <div className='text-sm rounded-[5px] w-fit text-green-custom bg-light-green-custom dark:bg-light-green-custom px-[10px] py-[10px]'>{status}</div>
        )
    }

    const CardSatuGempa = ({dataDetail}) => {
        return (
            <div className='dark:border-white border-2 my-[30px] mx-20 py-[15px] max-w-[90%] px-4 rounded-[15px] w-fit grid grid-cols-4 items-stretch'>
                <div className='col-span-1 border-r-[1px] dark:border-white'>
                    <div className='pr-[25px] py-[11px]'>
                        <MiniComponentStatusGunung status={dataDetail.Potensi ? dataDetail.Potensi : "Gempa Dirasakan"}/>
                        <div className='dark:text-white text-sm mt-[22px] mb-3'>{dataDetail.Tanggal}, {dataDetail.Jam}</div>
                        <div className='dark:text-white font-bold text-sm mt-[22px] mb-3'>{dataDetail.Wilayah}</div>
                    </div>
                </div>
                <div className='col-span-3 pl-[25px] grid grid-rows-4 py-[14px]'>
                    <div className='row-span-3 flex flex-row justify-between'>
                        <div className='flex flex-row items-center gap-[10px]'>
                            <IconGempaSVG color={"fill-red-custom"} />
                            <span className='text-base dark:text-white'>Magnitudo : {dataDetail.Magnitude}</span>
                        </div>
                        <div className='flex flex-row items-center gap-[10px]'>
                            <IconPointSVG />
                            <span className='text-base dark:text-white'>Kedalaman : {dataDetail.Kedalaman}</span>
                        </div>
                        <div className='flex flex-row items-center gap-[10px]'>
                            <IconPointMapSVG />
                            <span className='text-base dark:text-white'>Lokasi : {dataDetail.Lintang} - {dataDetail.Bujur}</span>
                        </div>
                    </div>

                    <button 
                        className='w-[297px] row-span-1 rounded-[5px] bg-blue-custom mx-auto text-white '
                        onClick={() => handleOpenModal(dataDetail)}
                    >
                        Lihat Detail
                    </button>
                </div>
            </div>
        )
    }

    const ModalDetailGempa = ({dataDetail}) => {
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
            <div 
                className='fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-70'
                onClick={() => handleCloseModal()}
            >
                <div 
                    className='bg-white dark:bg-dark-mode lg:max-w-[60%] shadow-lg transform transition-all duration-300 opacity-100 scale-100'
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className='flex flex-row justify-between px-5 py-[13px] items-center'>
                        <span className='dark:text-white font-bold text-sm'>Gempa Bumi {activeCategoryTitle}</span>
                        <button onClick={() => handleCloseModal()}>
                            <IconXSVG />
                        </button>
                    </div>
                    <div className='h-[1px] dark:bg-white bg-dark-mode'></div>
                    <div className='grid grid-cols-2 dark:bg-black'>
                        <div className='px-5 py-[24px] dark:border-white border-r-[1px]'>
                            <img src={shakeMapCreator()} className='w-full' />
                        </div>
                        <div className='p-6'>
                            <MiniComponentStatusGunung status={dataDetail.Potensi ? dataDetail.Potensi : "Gempa Dirasakan"}/>
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
                </div>
            </div>
        )
    }

    return (
        <LayoutAdmin>
            {loading ? (
                <div className="flex justify-center items-center h-screen dark:text-white text-2xl">
                    Loading...
                </div>
            ) : (
                <div className='w-full min-h-screen dark:bg-dark-mode'>
                    <div className="overflow-x-hidden border-y-[1px] py-6 px-[113px] dark:border-white">
                        <div className='dark:text-white font-bold text-center text-2xl'>DASHBOARD 360</div>
                        <div className='dark:text-white font-bold text-center text-2xl uppercase'>DATA GEMPA INDONESIA {activeCategoryTitle}</div>
                        <div className='dark:text-white text-center text-base'>Informasi gempa bumi {activeCategoryDesc} di wilayah Indonesia</div>
                    </div>

                    <div className='h-full border-b-[1px] dark:border-white' style={{ width: "100%", height: "541px" }}>
                        <IndonesiaMap 
                            clickable={false} 
                            earthquakeData={
                                response.Infogempa?.gempa 
                                    ? Array.isArray(response.Infogempa.gempa) 
                                        ? response.Infogempa.gempa.map(g => ({ Coordinates: g.Coordinates })) 
                                        : [{ Coordinates: response.Infogempa.gempa.Coordinates }] 
                                    : []
                            }
                        />
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
                                        fetchData(category.id)
                                    }} 
                                    className={`border-2 dark:border-white border-dark-mode w-[196px] dark:text-white focus:ring-4 focus:ring-blue-300 
                                        font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800
                                        ${
                                            activeCategory === category.id
                                            ? 'bg-blue-custom dark:bg-blue-custom text-white'
                                            : 'dark:bg-dark-mode hover:bg-gray-200 dark:hover:bg-gray-700'
                                        }
                                        `}
                                    >
                                    {category.label}
                                </button>
                            )
                        })}
                    </div>
                    
                    <CardSatuGempa dataDetail={response.Infogempa.gempa.length > 1 ? response.Infogempa.gempa[0] : response.Infogempa.gempa} />

                    <div className='mx-[82px] pb-9'>
                        {activeCategory !== "TERKINI" &&
                            <div className='dark:text-white font-bold text-[32px] mt-[111px] mb-[30px]'>
                                10 Gempa Bumi {activeCategoryTitle}
                            </div>
                        }
                        {activeCategory === "M50" &&
                            <TableForMagnitudoFive data={response.Infogempa.gempa.slice(0, 10)} handleOpenModal={handleOpenModal}/>
                        }

                        {activeCategory === "DIRASAKAN" &&
                            <TableForDirasakan data={response.Infogempa.gempa.slice(0, 10)} handleOpenModal={handleOpenModal}/>
                        }

                        {activeCategory === "BERPOTENSI_TSUNAMI" &&
                            <TableForBerpotensiTsunami />
                        }

                        {activeCategory === "REAL_TIME" &&
                            <TableForRealTime />
                        }
                    </div>

                    {modalOpen && (
                        <ModalDetailGempa dataDetail={selectedDetailGempa} />
                    )}
                </div>
            )}
        </LayoutAdmin>
    )
}

export default Gempa