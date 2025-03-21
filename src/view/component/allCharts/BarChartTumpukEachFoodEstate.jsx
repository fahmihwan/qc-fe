import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { formatCurrency } from "../../../utils/generateUtil";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ data, options }) => {
    return <Bar data={data} options={options} />;
}

const BarChartTumpukEachFoodEstate = ({ title, data, footnote }) => {
    console.log("data barchart", data)
    const allLabels = data 
        ? data.datasets.map(dataset => ({
            label: dataset.label,
            color: dataset.backgroundColor  
        }))
        : {}
    console.log(allLabels)

    const maxData = Math.max(...data.datasets[0].data);
    const minData = Math.min(...data.datasets[0].data);
    
    const range = maxData - minData;

    const stepSize = title === "Luas Panen (ha)" 
        ? Math.ceil(range / 5 / 800000) * 100000 
        : Math.ceil(range / 5 / 100) * 10;

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                position: 'top',
                labels: {
                    color: '#A3A3A3',
                }
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.dataset.label}: ${formatCurrency(tooltipItem.raw)}`,
                    labelColor: (tooltipItem) => {
                        const datasetIndex = tooltipItem.dataset;
                        return {
                            borderColor: datasetIndex.backgroundColor, 
                            backgroundColor: datasetIndex.backgroundColor, 
                            borderWidth: 2,
                            borderRadius: 2
                        };
                    }
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
            <div className="  px-[29px] py-[15px] h-[355px] flex flex-col w-full">
                <div className="dark:text-white font-bold text-xl mb-[10px]">{title}</div>
                <div className="w-full min-h-28 items-center justify-center">
                    {isDataEmpty ? (
                        <div className="dark:text-gray-400 text-xl mb-[10px]">Data belum tersedia</div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <div className="ml-4 mt-2 w-full px-2 max-h-12 max-w-[90%] gap-y-1 flex flex-wrap overflow-y-scroll custom-scrollbar orverflow-x-hidden justify-center">
                                {allLabels.map(({label, color}, index) => (
                                <div key={index} className="flex items-center align-middle gap-2 mb-1 mr-4">
                                    <span className="w-4 h-4" style={{ backgroundColor: color }}></span>
                                    <span className="text-xs text-gray-700 dark:text-gray-300 capitalize">{label}</span>
                                </div>
                                ))}
                            </div>
                            <div className="justify-center w-full h-56 overflow-hidden">
                                <BarChart data={data} options={options} />
                            </div>
                            {footnote &&
                                <div className="flex flex-row gap-1">
                                    <span className="font-light italic text-sm text-light-gray-custom dark:text-dark-gray-custom">Sumber: </span>
                                    <span className="font-light italic text-sm text-light-gray-custom dark:text-dark-gray-custom hover:font-medium underline underline-offset-4"> 
                                        <a href={footnote}> {footnote}</a>
                                    </span>
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>

        </>
    );
}

export default BarChartTumpukEachFoodEstate;
