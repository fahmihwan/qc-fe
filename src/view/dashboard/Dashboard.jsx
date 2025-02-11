
import mainDashboard from '../../data/mainDashboard'
import CardMainDashboard from '../component/CardMainDashboard'
import IndonesiaMap from '../component/IndonesiaMap'
import LayoutAdmin from '../layout/LayoutAdmin'
import { MapEl } from '../component/Map';
import { useEffectDashboardCards } from '../../hook/useEffectDashboardCards';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from 'react';


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
                isLoading ? (<div className='text-white'>dsdsd</div>) : (<div className='w-full min-h-screen '>
                    <div className="overflow-x-hidden border-b dark:border-dark-mode-border py-10">
                        {/* <div className="flex w-full min-w-full gap-16 animate-marquee">
                                {[...Array(2)].map((_, i) => (
                                    <div key={i} className="flex whitespace-nowrap gap-8 w-max">
                                        <span className="text-green-custom text-xl">
                                            SELAMAT DATANG DI DASHBOARD 360
                                        </span>
                                        <span className="dark:text-white text-xl">|</span>
                                        <span className="text-red-custom text-xl">
                                            DASHBOARD MENYAJIKAN INFORMASI SEPUTAR FOOD ESTATE & BENCANA ALAM DI INDONESIA
                                        </span>
                                        <span className="dark:text-white text-xl">|</span>
                                    </div>
                                ))}
                            </div> */}
                        {/* <div className='dark:text-white'>-</div> */}
                    </div>

                    <div className='w-full flex justify-center py-5 my-5'>
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


                    <div className='h-full p-[10px] border dark:border-dark-mode-border m-5' style={{ width: "95%", height: "541px" }}>
                        <IndonesiaMap onProvinceClick={onProvinceClick} />
                    </div>
                </div >)
            }
        </LayoutAdmin >
    )
}

export default Dashboard