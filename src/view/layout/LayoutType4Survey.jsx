import { AnimatePresence, motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import DropdownCustomV2 from '../component/miniComponent/DropdownCustomV2';
import { useMemo } from 'react';
import IndonesiaMap from '../component/IndonesiaMap';
import { Link } from 'react-router-dom';

const LayoutType4Survey = ({
    topicTitle,
    selectedSubCategory,
    setSelectedSubCategory,
    subCategories,
    onProvinceClick,
    selectedProvinceCode,
    selectedProvinceName,
    isProvinceClicked,
    resetSelection,
    children
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

            <div className='w-full xl:grid lg:grid-cols-7  mt-3'>
                <div className='col-span-12 lg:col-span-5 '>
                    <motion.div 
                        className='ml-5 sm:mr-5 flex justify-center z-10'
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
                        className='ml-5 mb-5  mt-5 dark:bg-dark-mode-bg'
                        variants={fadeIn("right", 0.3)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{once: true, amount: 0.5}}
                    >
                        <div className='min-h-[326px]  mb-10 md:mb-0 dark:text-white p-[15px] border dark:border-dark-border border-light-border rounded-[10px] mr-5'>
                            {/* children pertama */}
                            {children[0]}
                        </div>
                    </motion.div>
                </div>
                
                <div className='w-full xl:col-span-2 flex flex-col overflow-hidden'>
                    <motion.div 
                        className=' mx-5 min-h-[364px] mb-5 p-[15px] border rounded-[10px] dark:border-dark-border border-light-border overflow-hidden'
                        variants={fadeIn("left", 0.3)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{once: true, amount: 0.5}}
                    >
                        {/* children kedua */}
                        {children[1]}
                    </motion.div>
                    <motion.div 
                        className=' mx-5 mb-5 min-h-[364px] p-[15px] border rounded-[10px] dark:border-dark-border border-light-border overflow-hidden'
                        variants={fadeIn("left", 0.3)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{once: true, amount: 0.5}}
                    >
                        {/* children ketiga */}
                        {children[2]}
                    </motion.div>

                    {isProvinceClicked &&
                        <motion.div 
                            className='mx-5 mb-5 border rounded-[10px] dark:border-dark-border border-light-border overflow-hidden'
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
                </div>
            </div>
        </div>
    )
}

export default LayoutType4Survey