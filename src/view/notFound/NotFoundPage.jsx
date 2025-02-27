import { IconWarningSVG } from "../component/IconSvg";
import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const NotFoundPage = () => {
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(false)
    }, [])

    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center h-screen  text-white text-2xl">
                    <RingLoader 
                        size={60}
                        color='#33A02C'
                    />
                </div>
            ) : (
                <div className="bg-dark-mode-bg w-screen h-screen">
                    <div className="w-full h-full bg-[url('/assets/img/background.png')] bg-cover flex justify-center items-center">
                        <motion.div 
                            className="border-[3px] flex flex-col items-center border-light-border rounded-[15px] dark:bg-dark-mode-bg dark:border-dark-border py-[50px] px-[140px]"
                            variants={fadeIn("up", 0.2)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{once: true, amount: 0.7}}
                        >
                            <div className="h-[107px] w-[107px]">
                                <IconWarningSVG />
                            </div>
                            <div className="font-bold text-center text-2xl text-black dark:text-white mt-[17px] mb-[12px]">
                                404 Not Found
                            </div>
                            <div className="text-center text-2xl text-black dark:text-white mb-[25px]">
                                URL yang diminta tidak ditemukan di server ini.
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </>
    )
}

export default NotFoundPage;