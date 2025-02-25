import React, { useMemo } from 'react'
import IndonesiaMap from '../component/IndonesiaMap'
import { useState } from 'react'
import 'survey-analytics/survey.analytics.min.css';
import { Model } from 'survey-core';
import { VisualizationPanel } from 'survey-analytics';
import { useEffect } from 'react';
import { ExampleChart } from '../component/SurveyChart/ExampleChart';


const DetailDashboardSurvey = () => {

    const [isProvinceClicked, setIsProvinceClicked] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [selectedProvinceCode, setSelectedProvinceCode] = useState(null)
    const onProvinceClick = async (namaProvinsi, kodeProvinsi) => {
        console.log("dapat nama provinsi, kode prov", namaProvinsi, kodeProvinsi)
        // setIsLoading(true)
        // await fetchDataAsync(kodeProvinsi).then(() => {
        //     setIsProvinceClicked(true)
        //     setSelectedProvinceCode(kodeProvinsi)
        //     setSelectedProvinceName(namaProvinsi)
        // })
        console.log('Ini provinsi diklik  test');
    }


    const IndonesiaMapMemoized = useMemo(() => <IndonesiaMap onProvinceClick={onProvinceClick} earthquakeData={[]} selectedProvinceCode={selectedProvinceCode} isProvinceClicked={isProvinceClicked} />, [isProvinceClicked, selectedProvinceCode])






    return (
        <div>
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

            <div
                className='border rounded-[10px] ml-5 sm:mr-5 p-2 flex justify-center dark:border-dark-border border-light-border'
            >

                <div className=' w-[100%] h-[500px]'>
                    {/* {IndonesiaMapMemoized} */}
                </div>
            </div>

            <div>
                {/*  */}
                <ExampleChart />
            </div>
        </div>


    )
}

export default DetailDashboardSurvey