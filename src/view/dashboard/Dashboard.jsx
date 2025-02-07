
import mainDashboard from '../../data/mainDashboard'
import CardMainDashboard from '../component/CardMainDashboard'
import IndonesiaMap from '../component/IndonesiaMap'
import LayoutAdmin from '../layout/LayoutAdmin'
import { MapEl } from '../component/Map';


const Dashboard = () => {
    const onProvinceClick = ({name, code}) => {
        console.log('Ini provinsi diklik');
    } 


    return (
        <LayoutAdmin>
            <div className='w-full min-h-screen dark:bg-dark-mode'>
                <div className="overflow-x-hidden border-y-[1px] py-6 px-[113px] dark:border-white">
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
                    <div className='dark:text-white'>-</div>
                </div>


                <div className='w-full'>
                    <CardMainDashboard allDataFoodEstate={mainDashboard} />
                </div>

                <div className='h-full p-[10px] border-t-[1px] dark:border-white' style={{ width: "100%", height: "541px" }}>
                <IndonesiaMap onProvinceClick={onProvinceClick}/>
                </div>
            </div>
        </LayoutAdmin>
    )
}

export default Dashboard