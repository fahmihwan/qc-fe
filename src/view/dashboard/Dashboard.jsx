import CardMainDashboard from '../component/CardMainDashboard'
import IndonesiaMap from '../component/IndonesiaMap'
import LayoutAdmin from '../layout/LayoutAdmin'
import { useEffectDashboardCards } from '../../hook/useEffectDashboardCards';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";


const Dashboard = () => {
    const onProvinceClick = ({ namaProvinsi, kodeProvinsi }) => {
        setIsProvinceClicked(true)
        console.log('Ini provinsi diklik  test');
    }

    const { response, error } = useEffectDashboardCards()
    const [isLoading, setIsLoading] = useState(false)



    return (
        <>
            {
                    isLoading ? (
                        <div className="flex justify-center dark:bg-dark-mode-bg items-center h-screen  text-white text-2xl">
                            Loading...
                        </div>
                    ) : (
                        <div className=' min-h-screen'>
                            <div className="overflow-hidden  flex border dark:border-dark-border border-light-border rounded-[10px] ml-5 sm:mr-5 mt-5 px-5 dark:bg-dark-mode-bg mx-auto">
                                <div className='md:w-[700px] sm:[340px] lg:w-[800px] xl:w-[500px] 2xl:w-[1100px] 3xl:w-[1400px] items-center mx-auto py-5'>
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
                                </div>
                            </div>

                            <div className="w-full flex justify-center py-5 bg-[url('/assets/img/background.png')] bg-contain">
                                <CardMainDashboard allDataFoodEstate={response} />
                            </div>

                            <div className='border rounded-[10px] ml-5 sm:mr-5 p-2 flex justify-center dark:border-dark-border border-light-border'>
                                <div className=' w-[100%] h-[500px]'>
                                    <IndonesiaMap onProvinceClick={onProvinceClick} earthquakeData={response?.earthquakeData || []} />
                                </div>
                            </div>
                        </div >)
                }
        </>
    )
}

export default Dashboard