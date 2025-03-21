import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { formatCurrency } from "../../../utils/generateUtil";

const PieChart = ({ data, title }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    console.log("dari pie chart", data)

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy()
        }

        const ctx = chartRef.current.getContext("2d")

        const selectedData = title.startsWith("Luas Panen") ? data[0].luas_panen : data[0].produktivitas

        chartInstance.current = new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["Padi", "Jagung", "Kedelai", "Tebu", "Singkong"],
                datasets: [
                    {
                        data: [

                            selectedData.Padi,
                            selectedData.Jagung,
                            selectedData.Kedelai,
                            selectedData.Tebu,
                            selectedData.Singkong,
                        ],
                        backgroundColor: [
                            'rgba(227, 26, 28, 1)',  // Padi
                            'rgba(255, 127, 0, 1)',   // Jagung
                            'rgba(244, 190, 55, 1)',     // Singkong
                            'rgba(146, 255, 23, 1)',     // Kedelai
                            'rgba(33, 107, 214, 1)'    // Tebu
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 1,
                plugins: {
                    legend: {
                        display: false,
                        position: "left",
                        labels: {
                            color: "#A3A3A3",
                        },
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                let value = formatCurrency(tooltipItem.raw);
                                return `${tooltipItem.label}: ${value} ha`;
                            },
                            title: function(tooltipItem){
                                return `${title}`
                            }
                        },
                    },
                    datalabels: {
                        display: (context) => {
                            const value = context.dataset.data[context.dataIndex]; // Ambil nilai persentase
                            return value > 8; 
                        },
                        color: "#fff",
                        font: {
                            size: 10
                        },
                        anchor: "center",
                        align: "center",
                        formatter: (value) => `${formatCurrency(value)}`
                    }  
                },
            },
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy()
            }
        }
    }, [data])

    return <canvas ref={chartRef} className="w-[180px]" />
}

const PieChartAfterFilteredByProvinceAllFoodEstate = ({ title, data, year, footnote }) => {
    // const getYear = new Date(data.data.startDate).getFullYear()
    const allZeroData = data.length < 1
    console.log("data pie", data)

    const allLabels = [
        {
            "label": "Padi",
            "color": "rgba(227, 26, 28, 1)"
        },
        {
            "label": "Jagung",
            "color": "rgba(255, 127, 0, 1)"
        },
        {
            "label": "Singkong",
            "color": "rgba(244, 190, 55, 1)"
        },
        {
            "label": "Kedelai",
            "color": "rgba(146, 255, 23, 1)"
        },
        {
            "label": "Tebu",
            "color": "rgba(33, 107, 214, 1)"
        }
    ]
     
    return (
        <>
            <div className="px-[29px] py-[15px] h-[336px] flex flex-col">
                <div className="dark:text-white font-bold text-xl mb-[20px]">{title} Tahun {year}</div>
                <div className="w-full flex items-center align-middle justify-center">
                    {allZeroData ? 0 (
                        <div className="h-full dark:text-gray-400 items-center justify-center flex text-xl mb-[10px]">Data belum tersedia</div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row justify-between items-center">
                                <div className="ml-4 mt-2 w-full px-2 gap-4  max-w-[90%] gap-y-1 overflow-y-scroll custom-scrollbar orverflow-x-hidden justify-start">
                                    {allLabels.map(({label, color}, index) => (
                                    <div key={index} className="flex items-center align-middle gap-2 mb-1 mr-4">
                                        <span className="w-4 h-4" style={{ backgroundColor: color }}></span>
                                        <span className="text-xs text-gray-700 dark:text-gray-300 capitalize">{label}</span>
                                    </div>
                                    ))}
                                </div>
                                <div>
                                    <PieChart data={data.data} title={title} />
                                </div>
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
    )
}

export default PieChartAfterFilteredByProvinceAllFoodEstate