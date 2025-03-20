import { AnimatePresence, motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import DropdownCustomV2 from '../component/miniComponent/DropdownCustomV2';
import { useMemo } from 'react';
import IndonesiaMap from '../component/IndonesiaMap';
import { Link } from 'react-router-dom';
import { RingLoader } from 'react-spinners';

const LayoutType1Survey = ({
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
            {isLoading ? (
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
                                        {topicTitle} {selectedSubCategory.length > 0 && ":"} {selectedSubCategory} {selectedProvinceName && '-'}
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

                    <div className='w-full xl:grid lg:grid-cols-7  mt-3 '>
                        <div className=' col-span-12 lg:col-span-5 '>
                            <motion.div 
                                className='ml-5 sm:mr-5 lg:mr-0 flex justify-center z-10'
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
                                className=' grid md:grid-cols-7 gap-0 ml-5 sm:mr-5 lg:mr-0 sm:mb-5 mt-5 dark:bg-dark-mode-bg'
                                variants={fadeIn("right", 0.3)}
                                initial="hidden"
                                whileInView={"show"}
                                viewport={{once: true, amount: 0.5}}
                            >
                                <div className='col-span-4 mr-5 h-[363px] p-[15px] border rounded-[10px] dark:border-dark-border border-light-border overflow-hidden'>
                                    {/* children pertama */}
                                    {children[0]}
                                </div>
                                <div className='col-span-3 h-[363px] p-[15px] border rounded-[10px] dark:border-dark-border border-light-border overflow-hidden'>
                                    {/* children kedua */}
                                    {children[1]}
                                </div>
                            </motion.div>
                        </div>
                        
                        <div className='w-full xl:col-span-2 flex flex-col overflow-hidden'>
                            <motion.div 
                                className=' mx-5 h-[402px] mb-5 p-[15px] border rounded-[10px] dark:border-dark-border border-light-border overflow-hidden'
                                variants={fadeIn("left", 0.3)}
                                initial="hidden"
                                whileInView={"show"}
                                viewport={{once: true, amount: 0.5}}
                            >
                                {/* children ketiga */}
                                {children[2]}
                            </motion.div>

                            {
                                children[3] &&
                                <motion.div 
                                    className=' mx-5 mb-5 h-[364px] border p-[15px] rounded-[10px] dark:border-dark-border border-light-border overflow-hidden'
                                    variants={fadeIn("left", 0.3)}
                                    initial="hidden"
                                    whileInView={"show"}
                                    viewport={{once: true, amount: 0.5}}
                                >
                                    {/* children keempat */}
                                    {children[3]}
                                </motion.div>
                            }

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
            )}
        </>
    )
}

export default LayoutType1Survey