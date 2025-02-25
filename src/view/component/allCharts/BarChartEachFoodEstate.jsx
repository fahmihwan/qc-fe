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


    return <Bar data={data} options={options} height={"274px"} />
}

const BarChartEachFoodEstate = ({ title, data, provinceName = null}) => {
    console.log('judul yg diterima', provinceName)
    
    const allZero = data.datasets[0].data.every(item => 
        parseFloat(item ?? 0) === 0
    )
    
    return (
        <div className="px-[29px] py-[15px] h-[326px] flex flex-col">
            <div className="dark:text-white font-bold text-xl mb-[10px]">{title} {provinceName}</div>
            <div className="min-h-28 flex flex-grow items-center justify-center">
                {data.datasets[0].data.length > 0 && !allZero ? (
                    <BarChart data={data} title={title}/>
                ) : (
                    <div className="dark:text-gray-400 text-xl mb-[10px]">Data belum tersedia</div>
                )}
            </div>

        </div>
    )
}

export default BarChartEachFoodEstate