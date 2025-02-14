
import mainDashboard from '../../data/mainDashboard'
import CardMainDashboard from '../component/CardMainDashboard'
import IndonesiaMap from '../component/IndonesiaMap'
import LayoutAdmin from '../layout/LayoutAdmin'
import { MapEl } from '../component/Map';
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

    // useEffect(() => {
    //     if (response) {
    //         console.log(response)
    //         setTimeout(() => {
    //             setIsLoading(false)
    //         }, 0)
    //     }
    // }, [response])

    return (
        <LayoutAdmin>
            {
                isLoading ? (<div className='text-white'>Loading...</div>) : (<div className=' min-h-screen'>
                    
                    <div className="overflow-hidden px-4 border-b dark:border-dark-mode-border py-10 flex items-center mx-auto">
                        <div className='md:w-[600px] sm:[540px] lg:w-[700px] xl:w-[1000px] 2xl:w-[1200px] items-center mx-auto'>
                            <Marquee>
                                <div className="flex gap-16 overflow-hidden">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="flex whitespace-nowrap gap-8 w-max">
                                                <span className="text-green-custom text-xl">
                                                    SELAMAT DATANG DI DASHBOARD 360
                                                </span>
                                                <span className="dark:text-white text-xl">|</span>
                                                <span className="text-red-custom text-xl">
                                                    DASHBOARD MENYAJIKAN INFORMASI SEPUTAR FOOD ESTATE & BENCANA ALAM DI INDONESIA &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                </span>
                                                <span className="dark:text-white text-xl">|</span>
                                            </div>
                                        ))}
                                    </div>
                            </Marquee>
                        </div>
                    </div>

                    <div className='w-full flex justify-center py-5'>
                        <CardMainDashboard allDataFoodEstate={response} />
                    </div>

                    {/* <div className='w-full flex justify-center '>
                        <div className='w-[800px] flex'>
                            <Slider {...settings}>
                                <div className='m-5'>
                                    <div className='bg-slate-200 m-5'>
                                        <h3>1</h3>
                                    </div>
                                </div>
                                <div className='m-5'>
                                    <div className='bg-slate-200 m-5'>
                                        <h3>2</h3>
                                    </div>
                                </div>
                                <div className='m-5'>
                                    <div className='bg-slate-200 m-5'>
                                        <h3>3</h3>
                                    </div>
                                </div>
                                <div className='m-5'>
                                    <div className='bg-slate-200 m-5'>
                                        <h3>3</h3>
                                    </div>
                                </div>
                                <div className='m-5'>
                                    <div className='bg-slate-200 m-5'>
                                        <h3>3</h3>
                                    </div>
                                </div>
                                <div className='m-5'>
                                    <div className='bg-slate-200 m-5'>
                                        <h3>3</h3>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div> */}


                    <div className='h-full p-[10px] border-t-[1px] dark:border-white' style={{ width: "100%", height: "541px" }}>
                        <IndonesiaMap onProvinceClick={onProvinceClick} earthquakeData={response?.earthquakeData || []} />
                    </div>
                </div >)
            }
        </LayoutAdmin >
    )
}

export default Dashboard