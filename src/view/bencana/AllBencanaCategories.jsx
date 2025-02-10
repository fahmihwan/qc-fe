
import allBencana from '../../data/allBencana'
import IndonesiaMap from '../component/IndonesiaMap'
import TabelBencana from '../component/TabelBencana'
import LayoutAdmin from '../layout/LayoutAdmin'

const AllBencanaCategories = () => {
    const onProvinceClick = ({namaProvinsi, kodeProvinsi}) => {
        setIsProvinceClicked(true)
        console.log('Ini provinsi diklik  test');
    }
    
    return (
        <LayoutAdmin>
            <div className='w-full '>
                <div className="overflow-x-hidden py-4 px-[113px] border-y-[1px] dark:border-white">
                    <div className='dark:text-white text-2xl font-bold text-center'>GEOSPASIAL DATA BENCANA INDONESIA</div>
                </div>

                <div className='p-[10px] border-b-[1px]' style={{ width: "100%", height: "541px" }}>
                    <IndonesiaMap onProvinceClick={onProvinceClick} />
                </div>

                <marquee className="mx-6 my-4 dark:bg-dark-mode align-middle">
                    <span className="text-red-custom text-xl">{"(UPDATE)"} </span>
                    <span className="dark:text-white text-xl font-bold">Mag: </span>
                    <span className="text-green-custom text-xl">3.3 </span>
                    <span className="dark:text-white text-xl">| 30-Jan-25 20:57:34 WIB | </span>
                    <span className="dark:text-white text-xl font-bold">Lok: </span>
                    <span className="text-green-custom text-xl">4.09 LS </span>
                    <span className="dark:text-white text-xl">, </span>
                    <span className="text-green-custom text-xl">121.80 BT </span>
                    <span className="dark:text-white text-xl">{"(Pusat gempa berada di darat"} </span>
                </marquee>

                <TabelBencana dataBencana={allBencana} />
            </div>
        </LayoutAdmin>
    )
}

export default AllBencanaCategories