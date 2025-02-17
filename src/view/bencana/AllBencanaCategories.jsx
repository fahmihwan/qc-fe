
import { useState } from 'react'
import allBencana from '../../data/allBencana'
import IndonesiaMap from '../component/IndonesiaMap'
import TabelBencana from '../component/TabelBencana'
import LayoutAdmin from '../layout/LayoutAdmin'
import Marquee from 'react-fast-marquee'

const AllBencanaCategories = () => {
    const [isProvinceClicked, setIsProvinceClicked] = useState(false)
    const onProvinceClick = ({ namaProvinsi, kodeProvinsi }) => {
        setIsProvinceClicked(true)
        console.log('Ini provinsi diklik  test');
    }

    const {response} = []

    return (
        <LayoutAdmin>
            <div className='w-full '>
                <div className="overflow-hidden flex border dark:border-dark-border border-light-border rounded-[10px] ml-5 sm:mr-5 my-5 px-5 py-5  justify-center dark:bg-dark-mode-bg">
                    <div className='dark:text-white text-2xl font-bold text-center items-center'>GEOSPASIAL DATA BENCANA INDONESIA</div>
                </div>

                <div className='border rounded-[10px] ml-5 sm:mr-5 p-2 flex justify-center dark:border-dark-border border-light-border'>
                    <div className=' w-[100%] h-[500px]'>
                    <IndonesiaMap onProvinceClick={onProvinceClick} earthquakeData={response?.earthquakeData || []} />
                    </div>
                </div>

                <div className="overflow-hidden  flex border dark:border-dark-border border-light-border rounded-[10px] ml-5 sm:mr-5 my-5 px-5 dark:bg-dark-mode-bg mx-auto">
                    <div className='md:w-[700px] sm:[340px] lg:w-[800px] xl:w-[500px] 2xl:w-[1100px] 3xl:w-[1400px] items-center mx-5 py-5'>
                        <Marquee>
                            <div className="flex gap-10 overflow-hidden">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="flex whitespace-nowrap  w-max">
                                            <span className="text-red-custom text-xl">{"(UPDATE)"} </span>
                                            <span className="dark:text-white text-xl font-bold">Mag: </span>
                                            <span className="text-green-custom text-xl">3.3 </span>
                                            <span className="dark:text-white text-xl">| 30-Jan-25 20:57:34 WIB | </span>
                                            <span className="dark:text-white text-xl font-bold">Lok: </span>
                                            <span className="text-green-custom text-xl">4.09 LS </span>
                                            <span className="dark:text-white text-xl">, </span>
                                            <span className="text-green-custom text-xl">121.80 BT </span>
                                            <span className="dark:text-white text-xl">{"(Pusat gempa berada di darat"} </span>
                                        </div>
                                    ))}
                                </div>
                        </Marquee>
                    </div>
                </div>

                <TabelBencana dataBencana={allBencana} />
            </div>
        </LayoutAdmin>
    )
}

export default AllBencanaCategories