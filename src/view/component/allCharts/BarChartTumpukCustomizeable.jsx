import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { formatCurrency } from "../../../utils/generateUtil";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ data, options, width }) => {
    return <Bar data={data} options={options} height={"350px"} width={width || "500px"} />;
}

const BarChartTumpukCustomizeable = ({ data, title, legendItems, width }) => {
    console.log("data barchart", data)
    const maxData = Math.max(...data.datasets[0].data);
    const minData = Math.min(...data.datasets[0].data);
    
    const range = maxData - minData;
    const stepSize =  Math.ceil(range / 5 / 100) * 50

    const options = {
        plugins: {
            legend: {
                display: false,
                position: 'top',
                labels: {
                    color: '#A3A3A3',
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
            <div className="  px-[29px] py-[15px]  flex flex-col" style={{ width: width }}>
                <div className="dark:text-white font-bold text-xl mb-[20px]">{title}</div>
                <div className="items-center justify-center">
                    {isDataEmpty ? (
                        <div className="dark:text-gray-400 text-xl mb-[10px]">Data belum tersedia</div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <div style={{ width: width }}>
                                <div className="ml-4 mt-4 max-h-20 max-w-[90%] gap-y-1 flex flex-wrap items-center justify-center overflow-y-scroll custom-scrollbar overflow-x-hidden p-2 rounded">
                                    {legendItems.map((item, index) => (
                                    <div key={index} className="flex items-center align-middle gap-2 mb-1 mr-4">
                                        <span className="w-4 h-4" style={{ backgroundColor: item.color }}></span>
                                        <span className="text-xs text-gray-700 dark:text-gray-300">{item.label}</span>
                                    </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full flex justify-center">
                                <BarChart data={data} options={options}width={width} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </>
    );
}

export default BarChartTumpukCustomizeable