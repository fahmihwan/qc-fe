import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const BarChart = ({dummyData}) => {
    const maxData = Math.max(...dummyData.datasets[0].data);
    const minData = Math.min(...dummyData.datasets[0].data);

    const range = maxData - minData;
    const stepSize = Math.ceil(range / 5 / 80000) * 100000;

    const options = {
        responsive: true,
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
                    label: (tooltipItem) => `Luas Panen: ${tooltipItem.raw.toLocaleString()}`
                }
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
                suggestedMin: minData - stepSize,
                suggestedMax: maxData + stepSize,
                ticks: {
                    color: "#A3A3A3",
                    stepSize: 500000,
                    callback: (value) => `${value.toLocaleString()}`
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.1)" 
                }
            }
        }
    };
    

    return <Bar data={dummyData} options={options} height={"274px"}/>
}

const BarChartEachFoodEstate = ({title, dummyData}) => {
    return (
        <div className="px-[29px] py-[15px]">
            <div className="dark:text-white font-bold text-xl mb-[10px]">{title}</div>
            <div className="h-[274px]">
                <BarChart dummyData={dummyData}/>
            </div>
        </div>
    )
}

export default BarChartEachFoodEstate