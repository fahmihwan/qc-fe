import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ dummyData, options }) => {
    return <Bar data={dummyData} options={options} height={"274px"} />;
}

const BarChartTumpukEachFoodEstate = ({ title, dummyData }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#A3A3A3',
                }
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw.toLocaleString()}`
                }
            }
        },
        scales: {
            x: {
                stacked: true, // Enable stacking on the x-axis
                ticks: {
                    color: '#A3A3A3'
                },
                grid: {
                    display: false
                }
            },
            y: {
                stacked: true, // Enable stacking on the y-axis
                beginAtZero: true,
                ticks: {
                    color: '#A3A3A3',
                    stepSize: 500000,
                    callback: (value) => `${value.toLocaleString()}`
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            }
        }
    };

    return (
        <div className="px-[29px] py-[15px]">
            <div className="dark:text-white font-bold text-xl mb-[10px]">{title}</div>
            <div className="h-[274px]">
                <BarChart dummyData={dummyData} options={options} />
            </div>
        </div>
    );
}

export default BarChartTumpukEachFoodEstate;
