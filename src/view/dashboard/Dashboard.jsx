
import LayoutAdmin from '../layout/LayoutAdmin'

const Dashboard = () => {
    return (
        <LayoutAdmin>
            <div>
                <div className="h-0 dark:bg-white"></div>
                <div className="h-[621px]"></div>
                <div className="h-[2px] dark:bg-white"></div>

                <marquee className="mx-6 my-4 dark:bg-dark-mode">
                    <span className="text-red-custom text-xl">{"(UPDATE)"} </span>
                    <span className="dark:text-white text-xl font-bold">Mag: </span>
                    <span className="text-green-custom text-xl">3.3 </span>
                    <span className="dark:text-white text-xl">| 30-Jan-25 20:57:34 WIB | </span>
                    <span className="dark:text-white text-xl font-bold">Lok: </span>
                    <span className="text-green-custom text-xl">4.09 LS </span>
                    <span className="dark:text-white text-xl">, </span>
                    <span className="text-green-custom text-xl">121.80 BT </span>
                    <span className="dark:text-white text-xl">{"(Pusat Ge"} </span>
                </marquee>

                {/* <div className="mt-2dark:bg-white">
                    <span className="dark:text-white">Test</span>
                </div> */}
            </div>
        </LayoutAdmin>
    )
}

export default Dashboard