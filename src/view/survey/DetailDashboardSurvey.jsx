import React, { useEffect, useMemo, useState } from 'react'
import IndonesiaMap from '../component/IndonesiaMap'
// import 'survey-analytics/survey.analytics.min.css';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { getAllChartByQuestion } from '../../api/survey';


import WordCloud from 'react-d3-cloud'

import { scaleOrdinal } from 'd3-scale';

import { schemeCategory10 } from 'd3-scale-chromatic';
import { useCallback } from 'react';




const DetailDashboardSurvey = () => {

    const [response, setResponse] = useState([])

    // const [isProvinceClicked, setIsProvinceClicked] = useState(false)
    // const [isLoading, setIsLoading] = useState(true)
    // const [selectedProvinceCode, setSelectedProvinceCode] = useState(null)
    // const onProvinceClick = async (namaProvinsi, kodeProvinsi) => {
    //     console.log("dapat nama provinsi, kode prov", namaProvinsi, kodeProvinsi)

    //     console.log('Ini provinsi diklik  test');
    // }
    // const IndonesiaMapMemoized = useMemo(() => <IndonesiaMap onProvinceClick={onProvinceClick} earthquakeData={[]} selectedProvinceCode={selectedProvinceCode} isProvinceClicked={isProvinceClicked} />, [isProvinceClicked, selectedProvinceCode])


    // getAllChartByQuestion
    useEffect(() => {
        getAllChartByQuestion().then((res) => setResponse(res))
    }, [])

    const data = [
        { text: 'Kebutuan', value: 1000 },
        { text: 'Penebangan', value: 100 },
        { text: 'Industri', value: 800 },
        { text: 'Lahan', value: 100 },
        { text: 'Aktivitas', value: 190 },
        { text: 'Hutan', value: 420 },
        { text: 'Liar', value: 30 },
        { text: 'Kerusakan', value: 140 },
        { text: 'Berpindah', value: 30 },
        { text: 'Kebakaran', value: 240 },
        { text: 'Ladang', value: 140 },
    ];


    return (
        <div className="w-full text-white p-5">


            {/* <div className=" flex border dark:border-dark-border border-light-border rounded-[10px]  sm:mr-5 my-5 px-5 dark:bg-dark-mode-bg">
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
            </div> */}

            <div className="w-full flex items-center justify-between mb-5 border dark:border-dark-border border-light-border rounded-[10px]  ">
                {/* <div className='flex h-20 items-center pl-5 '>
                    <label
                        htmlFor="countries"
                        className="block   text-sm font-medium text-gray-900 dark:text-white"
                    >
                        sub kategori
                    </label>
                    <select

                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option selected="">Choose a country</option>
                        <option value="US">Padi</option>
                        <option value="CA">Singkong</option>
                        <option value="FR">Tebu</option>
                        <option value="DE">Jagung</option>
                        <option value="DE">Sawit</option>
                    </select>
                </div> */}
                <div>
                    STATISTIK LUAS PANEN : PADI
                </div>
                <div>
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Kembali</button>
                </div>
            </div>

            <div className='w-full'>
                <div className='flex mb-2 w-full'>
                    <div className='border w-9/12 rounded-[10px]  mr-2 flex justify-center dark:border-dark-border border-light-border'>
                        ini map
                        {/* {IndonesiaMapMemoized} */}
                    </div>
                    <div className='border w-3/12 rounded-[10px]  center dark:border-dark-border border-light-border'>
                        <div className='text-center py-5'>
                            <p>Status Kepemilikan Pangan</p>
                        </div>
                        <PieChartEL data={response?.pie} />
                    </div>
                </div>
                <div className='w-full flex '>
                    <div className='border w-5/12  rounded-[10px] mr-2 dark:border-dark-border border-light-border'>
                        <div className='text-center py-5'>
                            <p>Perubahan Luas Pangan dalam setahun terakhir</p>
                        </div>
                        <LineChartEL />
                    </div>
                    <div className='border w-4/12 rounded-[10px]  mr-2 dark:border-dark-border border-light-border'>
                        <div className='text-center py-5'>
                            <p>Jenis pangan yang digunakan</p>
                        </div>
                        <BarChartEL data={response?.bar} />
                    </div>
                    <div className='border w-3/12 rounded-[10px] p-5   dark:border-dark-border border-light-border'>
                        <WordCloud
                            data={data}
                            // width={500}
                            // height={500}
                            // font="Times"
                            // fontStyle="italic"
                            // fontWeight="bold"
                            fontSize={(word) => Math.log2(word.value) * 5}
                            rotate={0}
                        // spiral="rectangular"
                        // rotate={(word) => word.value % 360}
                        // padding={5}
                        // random={Math.random}
                        // fill={(d, i) => scaleOrdinal(i)}
                        // fill={useCallback((d, i) => scaleOrdinal(schemeCategory10)(i), [])}
                        // rotate={useCallback((word) => word.value % 180, [])}

                        // onWordClick={(event, d) => {
                        //     console.log(`onWordClick: ${d.text}`);
                        // }}
                        // onWordMouseOver={(event, d) => {
                        //     console.log(`onWordMouseOver: ${d.text}`);
                        // }}
                        // onWordMouseOut={(event, d) => {
                        //     console.log(`onWordMouseOut: ${d.text}`);
                        // }}
                        />
                        {/* 
                        <WordCloud
                            width={500}
                            height={500}
                            data={[
                                { text: 'Hey', value: 1000 },
                                { text: 'lol', value: 200 },
                                { text: 'first impression', value: 800 },
                                { text: 'very cool', value: 1000000 },
                                { text: 'duck', value: 10 },
                            ]} /> */}
                    </div>
                </div>
            </div>
        </div >


    )
}

export default DetailDashboardSurvey


const PieChartEL = ({ data }) => {
    return (
        <Pie data={{
            labels: data?.labels,
            datasets: [
                {
                    label: data?.title,
                    data: data?.data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        }} />
    )
}



const BarChartEL = ({ data }) => {

    // let outputBar = {
    //     "topik": data[0]?.topik,
    //     "typChart": "bar",
    //     "title": data[0]?.title,
    //     "labels": [],
    //     "data": [],
    //     "year": []
    // }


    // console.log(outputBar);


    return (<Bar data={{
        labels: [2004, 2025], // Label sumbu X
        datasets: [
            {
                label: 'lainnya', // Label dataset
                data: [40, 120], // Data untuk setiap bulan
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Warna latar belakang bar
                borderColor: 'rgb(75, 192, 192)', // Warna border bar
                borderWidth: 1, // Ketebalan border
            },
            {
                label: 'Sawah tadah hujan', // Label dataset
                data: [20, 30, 10], // Data untuk setiap bulan
                backgroundColor: 'rgba(192, 75, 75, 0.2)', // Warna latar belakang bar
                borderColor: 'rgb(192, 75, 75)', // Warna border bar
                borderWidth: 1, // Ketebalan border
            },
            {
                label: 'Sawah irigasi teknis', // Label dataset
                data: [10, 20, 30], // Data untuk setiap bulan
                backgroundColor: 'rgba(35, 68, 168, 0.2)', // Warna latar belakang bar
                borderColor: 'rgb(49, 81, 161)', // Warna border bar
                borderWidth: 1, // Ketebalan border
            },

        ],
    }} options={{
        responsive: true,
        plugins: {
            legend: {
                position: 'top', // Posisi legend
            },
            tooltip: {
                callbacks: {
                    // Kustomisasi tooltip jika diperlukan
                    label: function (tooltipItem) {
                        return `Pendapatan: $${tooltipItem.raw}`; // Format label tooltip
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Bulan', // Judul sumbu X
                },
            },
            y: {
                beginAtZero: true, // Mulai sumbu Y dari 0
                title: {
                    display: true,
                    text: 'Pendapatan ($)', // Judul sumbu Y
                },
            },
        },
    }} />)
}

const LineChartEL = (params) => {
    return (
        <Line data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'], // Label sumbu X
            datasets: [
                {
                    label: 'naik', // Label dataset
                    data: [65, 59, 80, 81, 56, 55], // Data untuk setiap bulan
                    fill: false, // Tidak ada area yang diisi
                    borderColor: 'rgb(75, 192, 192)', // Warna garis
                    tension: 0.1, // Tension untuk kelengkungan garis
                },
                {
                    label: 'turun', // Label dataset
                    data: [65, 20, 10, 81, 29, 50], // Data untuk setiap bulan
                    fill: false, // Tidak ada area yang diisi
                    borderColor: 'rgba(255, 99, 132, 1)', // Warna garis
                    tension: 0.1, // Tension untuk kelengkungan garis
                },
            ],
        }} options={{
            responsive: true,

            plugins: {
                legend: {
                    position: 'top', // Posisi legend
                },
                tooltip: {
                    mode: 'index', // Tooltip muncul di titik data
                    intersect: false, // Tooltip tidak hanya muncul saat titik data diinterseksi
                },
            },
            scales: {
                x: {
                    ticks: {
                        autoSkip: true, // Melewatkan label jika terlalu banyak
                    },
                },
                y: {
                    beginAtZero: true, // Mulai sumbu Y dari 0
                },
            },
        }} />
    )

}
