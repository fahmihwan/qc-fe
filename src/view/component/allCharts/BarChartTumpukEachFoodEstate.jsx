import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ data, options }) => {
    return <Bar data={data} options={options} height={"350px"} width={"500px"} />;
}

const BarChartTumpukEachFoodEstate = ({ title, data }) => {
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
                stacked: true,
                ticks: {
                    color: '#A3A3A3'
                },
                grid: {
                    display: false
                },
            },
            y: {
                stacked: true,
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

    const isDataEmpty = data.datasets.every(dataset => dataset.data.every(value => value === 0));

    return (
        <>
            <div className="px-[29px] py-[15px] h-[326px] flex flex-col">
                <div className="dark:text-white font-bold text-xl mb-[10px]">{title}</div>
                <div className="min-h-28 flex flex-grow items-center justify-center">
                    {isDataEmpty ? (
                        <div className="dark:text-gray-400 text-xl mb-[10px]">Data belum tersedia</div>
                    ) : (
                        <BarChart data={data} options={options} />
                    )}
                </div>
            </div>

        </>
    );
}

export default BarChartTumpukEachFoodEstate;
