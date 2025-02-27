import CardMainDashboard from '../component/CardMainDashboard'
import IndonesiaMap from '../component/IndonesiaMap'
import LayoutAdmin from '../layout/LayoutAdmin'
import { useEffectDashboardCards } from '../../hook/useEffectDashboardCards';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";
import { RingLoader } from 'react-spinners';

import { motion } from 'framer-motion';

import { fadeIn } from '../../variants';

const Dashboard = () => {
    const onProvinceClick = ({ namaProvinsi, kodeProvinsi }) => {
        setIsProvinceClicked(true)
        console.log('Ini provinsi diklik  test');
    }

    const { response, error, isLoading } = useEffectDashboardCards()

    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleResize)
        return () => window.addEventListener("resize", handleResize)
    }, [])

    const containerWidthMarquee = width < 400
        ? 240
        : width < 520
        ? 320
        : width < 750
        ? 520
        : width < 800
        ? 650
        : width < 900
        ? 750
        : width < 1150
        ? 650
        : width < 1250
        ? 850
        : width < 1300
        ? 900
        : width < 1400
        ? 1000
        : width < 1600
        ? 1150
        : width < 1800
        ? 1300
        : width < 2000
        ? 1500
        : width < 2100
        ? 1600
        : width < 2350
        ? 1800
        : 2000;

    return (
        <>
            {isLoading ? (
                <div className="flex justify-center dark:bg-dark-mode-bg items-center h-screen  text-white text-2xl">
                    <RingLoader 
                        size={60}
                        color='#33A02C'
                    />
                </div>
            ) : (
                <div className=' min-h-screen'>
                    <motion.div 
                        className="overflow-hidden  flex border dark:border-dark-border border-light-border rounded-[10px] ml-5 mr-5 mt-5 px-5 dark:bg-dark-mode-bg mx-auto"
                        variants={fadeIn("left", 0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{once: true, amount: 0.7}}
                    >
                        <motion.div 
                            className='block items-center mx-auto py-5'
                            animate={{ width: containerWidthMarquee }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            <Marquee>
                                <div className="flex gap-10 overflow-hidden">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="flex whitespace-nowrap gap-10 w-max">
                                            <span className="text-green-custom text-xl">
                                                SELAMAT DATANG DI DASHBOARD 360
                                            </span>
                                            <span className="dark:text-white text-xl">|</span>
                                            <span className="text-red-custom text-xl">
                                                DASHBOARD MENYAJIKAN INFORMASI SEPUTAR FOOD ESTATE & BENCANA ALAM DI INDONESIA
                                            </span>
                                            <span className="dark:text-white text-xl">|</span>
                                            <span className="text-green-custom text-xl">
                                                KETAHANAN PANGAN INDONESIA
                                            </span>
                                            <span className="dark:text-white text-xl">|</span>
                                            <span className="text-red-custom text-xl">
                                                DATA TERBARU TERSEDIA
                                            </span>
                                            <span className="dark:text-white text-xl">|</span>
                                            <span className="text-green-custom text-xl">
                                                WASPADA DAN SIAP SIAGA
                                            </span>
                                            <span className="dark:text-white text-xl">|</span>
                                            <span className="text-red-custom text-xl">
                                                INFORMASI PENTING DI DASHBOARD 360
                                            </span>
                                            <span className="dark:text-white text-xl">|</span>
                                        </div>
                                    ))}
                                </div>
                            </Marquee>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        className="w-full flex justify-center pt-5 pb-6 bg-[url('/assets/img/background.png')] bg-contain"
                        variants={fadeIn("right", 0.4)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{once: true, amount: 0.5}}
                    >
                        <CardMainDashboard allDataFoodEstate={response} />
                    </motion.div>

                    <motion.div 
                        className='ml-5 sm:mr-5 mb-5 flex justify-center'
                        variants={fadeIn("up", 0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{once: true, amount: 0.7}}
                    >
                        <div className=' w-[100%] h-[500px]'>
                            <IndonesiaMap onProvinceClick={onProvinceClick} earthquakeData={response?.earthquakeData || []} clickable={false} />
                        </div>
                    </motion.div>
                </div >)
            }
        </>
    )
}

export default Dashboard