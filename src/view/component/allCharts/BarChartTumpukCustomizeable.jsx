import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { formatCurrency } from "../../../utils/generateUtil";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ data, options }) => {
    return <Bar data={data} options={options} height={"350px"} width={"500px"} />;
}

const BarChartTumpukCustomizeable = ({ data, title }) => {
    console.log("data barchart", data)
    const maxData = Math.max(...data.datasets[0].data);
    const minData = Math.min(...data.datasets[0].data);
    
    const range = maxData - minData;
    const stepSize =  Math.ceil(range / 5 / 100) * 50

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#A3A3A3',
                    afterFit: (legend) => {
                        legend.height += 50; // Tambah jarak antara legend dan grafik
                    }
                },
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.dataset.label}: ${formatCurrency(tooltipItem.raw)}`
                }
            },
            datalabels: {
                display: false
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
                min: 0,
                ticks: {
                    color: '#A3A3A3',
                    stepSize: stepSize,
                    callback: (value) => formatCurrency(value)
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

    const isDataEmpty = data.datasets.every(dataset => dataset.data.every(value => value === 0));
    
    return (
        <>
            <div className="  px-[29px] py-[15px] h-[326px] flex flex-col">
                <div className="dark:text-white font-bold text-xl mb-[10px]">{title}</div>
                <div className="w-96 min-h-28 flex flex-grow items-center justify-center">
                    {isDataEmpty ? (
                        <div className="dark:text-gray-400 text-xl mb-[10px]">Data belum tersedia</div>
                    ) : (
                        <div className="w-full flex justify-center">
                            <BarChart data={data} options={options} />
                        </div>
                    )}
                </div>
            </div>

        </>
    );
}

export default BarChartTumpukCustomizeable