import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { formatCurrency } from "../../../utils/generateUtil";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const BarChart = ({ data, title}) => {
    const maxData = Math.max(...data.datasets[0].data);
    const minData = Math.min(...data.datasets[0].data);
    console.log('min data', minData)

    const range = maxData - minData;
    const stepSize = title == "Luas Panen (ha)" ? Math.ceil(range / 5 / 800000) * 1000 : Math.ceil(range / 5 / 100) * 10;
    console.log('step size', stepSize)

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                position: "top",
                labels: {
                    color: "#A3A3A3",
                }
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (tooltipItem) => `${title ? title : ''}: ${formatCurrency(tooltipItem.raw)}`
                }
            },
            datalabels: {
                display: false
            }
        },
        scales: {
            x: {
                ticks: {
                    color: "#A3A3A3"
                },
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                min: 0,
                suggestedMin: minData - stepSize,
                maxData: maxData - stepSize,
                ticks: {
                    color: "#A3A3A3",
                    stepSize: stepSize,
                    callback: (value) => `${formatCurrency(value)}`
                },
                grid: {
                    color: '#CCCCCC',
                    borderColor: '#CCCCCC',
                    drawBorder: true
                },
                border:{
                    color: '#cccccc'
                }
            }
        }
    };


    return <Bar data={data} options={options} />
}

const BarChartEachFoodEstate = ({ title, data, provinceName = null, footnote}) => {
    console.log('judul yg diterima', provinceName)
    
    const allZero = data.datasets[0].data.every(item => 
        parseFloat(item ?? 0) === 0
    )
    
    return (
        <div className="px-[29px] py-[15px] flex flex-col">
            <div className="h-12 w-full mb-[10px] grid items-center">
                <div className="h-full grid items-center mb-[10px] w-full dark:text-white font-bold md:text-lg text-xl">
                    {
                        !provinceName && title === 'Produktivitas (ku/ha)' 
                        ? 'Rata-Rata '
                        : !provinceName 
                        ? 'Total '
                        : ''
                    }
                    {title} {provinceName}
                </div>
            </div>
            <div className="w-full">
                {data.datasets[0].data.length > 0 && !allZero ? (
                    <div className="flex flex-col mx-4">
                        <div className="w-full h-48 justify-center overflow-hidden">
                            <BarChart data={data} title={title}/>
                        </div>
                        {footnote &&
                            <div className="flex flex-row gap-1 mt-4">
                                <span className="font-light italic text-sm text-light-gray-custom dark:text-dark-gray-custom">Sumber: </span>
                                <span className="font-light italic text-sm text-light-gray-custom dark:text-dark-gray-custom hover:font-medium underline underline-offset-4"> 
                                    <a href={footnote}> {footnote}</a>
                                </span>
                            </div>
                        }
                    </div>
                ) : (
                    <div className="dark:text-gray-400 text-xl mb-[10px]">Data belum tersedia</div>
                )}
            </div>
        </div>
    )
}

export default BarChartEachFoodEstate