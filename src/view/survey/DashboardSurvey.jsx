import React from 'react'

import datas from '../../data/dataSubKategoriDashboardSurvey.json';
import { Link } from 'react-router-dom';
const DashboardSurvey = () => {
    console.log(datas);


    return (
        <div className="w-full text-white p-5">
            <div
                className=" flex border dark:border-dark-border border-light-border rounded-[10px]  sm:mr-5 my-5 px-5 dark:bg-dark-mode-bg"
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
            </div>
            <div className="w-full">
                <div className=' px-24 '>
                    <div className="grid grid-cols-6 gap-4">
                        {/* {} */}

                        {datas.data.map((d, i) => {
                            if (i <= 11) {
                                return (<div key={i}
                                    className="col-span-1 p-4 flex justify-center"><CardSubKategori
                                        title={d.title}
                                        img={d.img}
                                        url={d?.url}
                                    /></div>)
                            }
                        })}

                        <div className="col-span-6 flex justify-center gap-4">
                            {datas.data.map((d, i) => {

                                if (i >= 12) {
                                    return (<div key={i} className="col-span-1 p-4 w-48 flex justify-center"><CardSubKategori
                                        title={d.title}
                                        img={d.img}
                                        url={d?.url}
                                    /></div>)
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
        <Link
            to={url}
            className="border-2 w-[200px] h-[220px]  py-5 hover:border-white cursor-pointer flex items-center justify-center   rounded-lg border-dark-border bg-gradient-to-b from-dark-mode-bg to-black">
            <div className="">
                <div className='flex justify-center'>
                    <img src={img} alt="" />
                </div>
                <div className='pt-3 text-center  px-2'>
                    <p>{title}</p>
                </div>
            </div>
        </Link>


    )

}