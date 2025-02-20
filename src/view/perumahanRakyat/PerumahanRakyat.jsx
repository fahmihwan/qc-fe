import { Link } from "react-router-dom";
import { IconWarningSVG } from "../component/IconSvg";
import LayoutAdmin from "../layout/LayoutAdmin";
// import SidebarProvider from '../../context/SidebarContext'

const PerumahanRakyat = () => {
    return (
        <>
            <div className="w-full min-h-[calc(100vh-69px)] bg-[url('/assets/img/background.png')] bg-contain flex justify-center items-center">
                <div className="border-[3px] flex flex-col items-center border-light-border rounded-[15px] dark:bg-dark-mode-bg dark:border-dark-border py-[50px] px-[140px]">
                    <div className="h-[107px] w-[107px]">
                        <IconWarningSVG />
                    </div>
                    <div className="font-bold text-center text-2xl text-black dark:text-white mt-[17px] mb-[12px]">
                        Halaman Belum Tersedia
                    </div>
                    <div className="text-center text-2xl text-black dark:text-white mb-[25px]">
                        Masih dalam proses pengembangan
                    </div>
                    <Link
                        to={'/'}
                        className="text-white  bg-blue-custom hover:bg-gray-hover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-[30px] py-4 text-center inline-flex items-center dark:focus:ring-blue-800"
                        type="button"
                    >
                        <div className="items-center text-center font-bold w-full">
                            KEMBALI KE DASHBOARD
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default PerumahanRakyat;