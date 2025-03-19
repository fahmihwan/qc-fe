import React from 'react'

import datas from '../../data/dataSubKategoriDashboardSurvey.json';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const DashboardSurvey = () => {
    console.log(datas);

    return (
        <div className="w-full text-white px-5 lg:mr-0">
            <motion.div
                className=" flex border dark:border-dark-border border-light-border rounded-[10px] my-5 px-5 dark:bg-dark-mode-bg"
                variants={fadeIn("right", 0.3)}
                initial="hidden"
                whileInView={"show"}
                viewport={{once: true, amount: 0.5}}
            >
                <div className="grid grid-cols-3 gap-4 justify-center  lg:py-5  items-center w-full ">
                    <div className=" rounded  items-centers ">

                        <div className="flex-col justify-center block lg:hidden items-center py-6 dark:text-white">
                            <div className="text-xs lg:text-2xl  font-bold">DASHBOARD SURVEY</div>
                        </div>
                    </div>
                    <div className=" dark:text-white rounded ">
                        <div className="text-center flex-col justify-center hidden lg:block ">
                            <div className=" text-xs lg:text-2xl text-center font-bold">DASHBOARD SURVEY</div>
                        </div>
                    </div>
                </div>
            </motion.div>
            <div className="w-full">
                <div className=' px-24 '>
                    <div className="grid grid-cols-6 gap-4">
                        {/* {} */}

                        {datas.data.map((d, i) => {
                            if (i <= 11) {
                                return (
                                    <motion.div key={i}
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
                                        transition={{duration: 1, delay: i * 0.1, ease: "easeOut"}}
                                        className="col-span-1 p-4 flex justify-center">
                                            <CardSubKategori
                                                title={d.title}
                                                img={d.img}
                                                url={d?.url}
                                            />
                                    </motion.div>
                                )
                            }
                        })}

                        <div className="col-span-6 flex justify-center gap-4">
                            {datas.data.map((d, i) => {

                                if (i >= 12) {
                                    return (
                                        <motion.div key={i}
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            exit={{opacity: 0}}
                                            transition={{duration: 1, delay: i * 0.1}}
                                            className="col-span-1 p-4 w-48 flex justify-center"
                                        >
                                            <CardSubKategori
                                                title={d.title}
                                                img={d.img}
                                                url={d?.url}
                                            />
                                        </motion.div>
                                    )
                                }

                            })}
                        </div>



                    </div>

                </div>
            </div>
        </div>
    )
}

export default DashboardSurvey

const CardSubKategori = ({ title, img, url }) => {
    return (
        <motion.div
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="border-2 w-[200px] h-[220px] py-5 hover:border-white cursor-pointer flex items-center justify-center rounded-lg border-dark-border bg-gradient-to-b from-dark-mode-bg to-black"
        >
            <Link to={url} className="w-full h-full flex items-center justify-center">
                <div>
                    <div className="flex justify-center">
                        <img src={img} alt="" />
                    </div>
                    <div className="pt-3 text-center px-2">
                        <p>{title}</p>
                    </div>
                </div>
            </Link>
        </motion.div>
    )

}