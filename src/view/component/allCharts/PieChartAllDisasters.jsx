import Chart from "chart.js/auto";
import { label } from "framer-motion/client";
import { useEffect, useRef, useState } from "react";

const DoughnutChart = ({ data }) => {
    const chartRef = useRef(null)
    const chartInstance = useRef(null)

    console.log("ini data", data)

    const kindOfBencana = [
        "Banjir", 
        "Karhutla", 
        "Cuaca Ekstrem", 
        "Tanah Longsor",
        "Gempa Bumi", 
        "Tsunami",
        "Kekeringan",
        "Erupsi Gunung Api",
        "Gelombang Pasang & Abrasi"
    ]

    const colors = [
        'rgba(127, 255, 0, 1)',
        'rgba(255, 215, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(255, 69, 0, 1)',
        'rgba(89, 35, 177, 1)',
        'rgba(50, 205, 50, 1)',
        'rgba(255, 0, 255, 1)',
        'rgba(181, 0, 255, 1)',
        'rgba(0, 157, 255, 1)',
    ]

    const legendItems = kindOfBencana.map((item, index) => ({
        label: item,
        color: colors[index] || 'rgba(192, 192, 192, 1)'
    }))
    
    useEffect(() => {
        if(chartInstance.current !== null) {
            chartInstance.current.destroy()
        }

        if(!chartRef.current) return
        const ctx = chartRef.current.getContext("2d")

        chartInstance.current = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: kindOfBencana,
                datasets: [
                    {
                        data: [
                            data.banjir,
                            data.karhutla,
                            data.angin,
                            data.longsor,
                            data.gempabumi,
                            data.tsunami,
                            data.kekeringan,
                            data.lga,
                            data.gpa
                        ],
                        backgroundColor: colors,
                        borderWidth: 1,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }, 
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem){
                                let value = parseInt(tooltipItem.raw) || 0
                                let label = tooltipItem.chart.data.labels[tooltipItem.dataIndex] || "";
                                return `${label}: ${value}`
                            },
                            title: function(){
                                return null
                            }
                        }
                    },
                    datalabels: {
                        display: (context) => {
                            const values = Object.entries(data)
                                .filter(([key, value]) => key !== 'provinsi')
                                .map(([key, value]) => Number(value))
                                .filter(value => !isNaN(value))
                            
                            const total = values.reduce((sum, num) => sum + num, 0)

                            if(total === 0) return false

                            const value = Number(context.dataset.data[context.dataIndex])
                            const percentage = (value / total) * 100
                            
                            return percentage > 10; 
                        },
                        color: "#fff",
                        font: {
                            size: 14
                        },
                        anchor: "center",
                        align: "center",
                        formatter: (value) => `${value}`
                    }
                }
            }
        })

        return  () => {
            if(chartInstance.current !== null) {
                chartInstance.current.destroy()
            }
        }
    }, [data])

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row items-center justify-center">
                <canvas ref={chartRef} className="h-56 w-full" />
            </div>
            <div>
                <div className="ml-4 mt-4 max-h-20 w-full max-w-[90%] gap-y-1 flex flex-wrap items-center justify-center overflow-y-scroll custom-scrollbar overflow-x-hidden p-2 rounded">
                    {legendItems.map((item, index) => (
                    <div key={index} className="flex items-center align-middle gap-2 mb-1 mr-4">
                        <span className="w-4 h-4" style={{ backgroundColor: item.color }}></span>
                        <span className="text-xs text-gray-700 dark:text-gray-300">{item.label}</span>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const PieChartAllDisasters = ({ dataBencana }) => {

    const isAllZero = (data) => {
        return Object.entries(data)
            .filter(([key]) => key !== "provinsi")
            .every(([, value]) => value === null || value === "0")
    }
    const allZero = isAllZero(dataBencana)

    return (
        <div className="px-[29px] py-[15px] min-h-[429px] flex flex-col">
            <div className="dark:text-white font-bold text-xl mb-4">Kejadian per Jenis Bencana</div>
            <div className="flex flex-1 items-center align-middle justify-center">
                {dataBencana.length < 1 || allZero ? (
                    <div className="h-full dark:text-gray-400 items-center justify-center flex text-xl mb-[10px]">Data tidak tersedia</div>
                ) : (
                    <DoughnutChart data={dataBencana} />
                )}
            </div>
        </div>
    )
}

export default PieChartAllDisasters