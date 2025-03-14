import { AnimatePresence, motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import { useMemo } from "react"
import { Link } from 'react-router-dom';
import IndonesiaMap from "../component/IndonesiaMap"
import DropdownCustomV2 from '../component/miniComponent/DropdownCustomV2';
import { RingLoader } from 'react-spinners';

const LayoutType2Survey = ({
    topicTitle,
    selectedSubCategory,
    setSelectedSubCategory,
    subCategories,
    onProvinceClick,
    selectedProvinceCode,
    selectedProvinceName,
    isProvinceClicked,
    resetSelection,
    children,
    isLoading
}) => {

    const IndonesiaMapMemoized = useMemo(() => 
        <IndonesiaMap 
            onProvinceClick={onProvinceClick} 
            selectedProvinceCode={selectedProvinceCode} 
            isProvinceClicked={isProvinceClicked} isProvinceColored={true}
        />, 
        [isProvinceClicked, selectedProvinceCode]
    )
    return (
        <>
            {
                isLoading ? (
                    <div className="flex justify-center items-center h-screen dark:text-white text-2xl">
                        <RingLoader 
                            size={60}
                            color='#33A02C'
                        />
                    </div>
                ) : (
                    <div className='min-h-screen'>
                        {/* header */}
                        <motion.div
                            className=" flex border dark:border-dark-border border-light-border rounded-[10px] ml-5 sm:mr-5 mt-5 px-5 dark:bg-dark-mode-bg"
                            variants={fadeIn("right", 0.3)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{once: true, amount: 0.5}}
                        >
                            <div className="flex flex-row justify-between lg:py-5 h-24 items-center w-full ">
                                <div className="flex flex-row gap-4 z-40 justify-center items-center dark:text-white">
                                    {subCategories.length > 0 ? (
                                            <>
                                                <div className="text-sm flex items-center">Sub Kategori</div>
                                                <div>
                                                    <DropdownCustomV2 
                                                        listDropDown={subCategories}
                                                        selectedItem={selectedSubCategory}
                                                        setSelectedItem={setSelectedSubCategory}
                                                        title={"Pilih Sub Kategori"}
                                                        width={"220px"}
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <div></div>
                                    )}
                                </div>

                                <div className=" dark:text-white rounded ">
                                    <div className="text-center flex-col justify-center ">
                                        <div className=" text-xs lg:text-2xl text-center font-bold uppercase">
                                            {topicTitle} : {selectedSubCategory} {selectedProvinceName && '-'}
                                        </div>
                                        {selectedProvinceName &&
                                            <div className=" text-xs lg:text-2xl text-center font-bold uppercase">
                                                {selectedProvinceName}
                                            </div>
                                        }
                                    </div>
                                </div>

                                <Link
                                    to="/dashboard-hasil-survey"
                                >
                                    <motion.div
                                        className="text-white cursor-pointer bg-blue-custom hover:bg-gray-hover font-sm rounded-[5px] text-sm px-[40px] py-[10px] text-center items-center dark:focus:ring-blue-800 transition-colors duration-300 ease-in-out"
                                        variants={fadeIn("right", 0.3, true)}
                                        initial="hidden"
                                        whileInView={"show"}
                                        viewport={{once: true, amount: 0.5}}
                                    >
                                        <div className="items-center text-center w-full">
                                            Kembali
                                        </div>
                                    </motion.div>
                                </Link>
                            </div>
                        </motion.div>

                        <div className='xl:grid lg:grid-cols-7 mt-3'>
                            <motion.div 
                                className='lg:col-span-5 sm:mb-5 ml-5 sm:mr-5 flex justify-center z-10'
                                variants={fadeIn("right", 0.3)}
                                initial="hidden"
                                whileInView={"show"}
                                viewport={{once: true, amount: 0.5}}
                            >
                                <div className=' w-[100%] h-[500px]'>
                                    {IndonesiaMapMemoized}
                                </div>
                            </motion.div>

                            <motion.div 
                                className='lg:col-span-2 ml-5 sm:mr-5 mb-5  dark:bg-dark-mode-bg'
                                variants={fadeIn("right", 0.3)}
                                initial="hidden"
                                whileInView={"show"}
                                viewport={{once: true, amount: 0.5}}
                            >
                                {/* <div className=' mb-10 md:mb-0  col-span-3 dark:text-white px-6 pt-4 border dark:border-dark-border border-light-border rounded-[10px] mr-5'> */}
                                    {/* <TableForFoodEstate title={"Luas Panen (ha)"} data={dummyDataForTable} dataBe={response} titleBe={"Luas Panen"} year={selectedYear}/> */}
                                {/* </div> */}
                                <div className=' col-span-3 dark:text-white px-6 py-4 h-[402px] dark:border-dark-border border-light-border border rounded-[10px]  '>
                                    {/* children ketiga */}
                                    {children[2]}
                                </div>

                                {isProvinceClicked &&
                                    <motion.div 
                                        className='mt-5 border rounded-[10px] dark:border-dark-border border-light-border overflow-hidden'
                                    >
                                        <motion.button 
                                            className="w-full relative overflow-hidden items-center py-6 rounded-[10px] transition-all duration-300 group"
                                            style={{ transformOrigin: "center" }}
                                            onClick={resetSelection}
                                        >
                                            {/* Background animasi dengan before */}
                                            <span className="absolute inset-0 bg-blue-custom w-0 h-full transition-all duration-500 ease-in-out group-hover:w-full"></span>

                                            {/* Konten tombol */}
                                            <div className='relative z-10 items-center'>
                                                <span className="relative dark:text-white text-center text-xl z-10">Data Seluruh Indonesia</span>
                                            </div>
                                        </motion.button>
                                    </motion.div>
                                }
                            </motion.div>
                        </div>

                        <div className='col-span-12 lg:col-span-5 h-fit mb-5'>
                            <motion.div 
                                className='grid md:grid-cols-9 ml-5 sm:mr-5 dark:bg-dark-mode-bg'
                                variants={fadeIn("right", 0.3)}
                                initial="hidden"
                                whileInView={"show"}
                                viewport={{once: true, amount: 0.5}}
                            >
                                <div className='min-h-[326px] md:mb-0  col-span-4 dark:text-white p-[15px] border dark:border-dark-border border-light-border rounded-[10px] mr-5'>
                                    {/* children pertama */}
                                    {children[0]}
                                </div>
                                <div className='min-h-[200px] md:min-h-[300px] flex flex-col col-span-5  dark:text-white p-[15px] dark:border-dark-border border-light-border border rounded-[10px]  '>
                                    {/* children kedua */}
                                    {children[1]}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default LayoutType2Survey