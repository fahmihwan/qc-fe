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
                // layout: {
                //     padding: {
                //         top: 0,
                //         bottom: 0,
                //         left: 0,
                //         right: 0
                //     }
                // },
                plugins: {
                    legend: {
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

    return <canvas ref={chartRef} className="h-full w-full" />
}

const PieChartAfterFilteredByProvinceAllFoodEstate = ({ title, data, year }) => {
    // const getYear = new Date(data.data.startDate).getFullYear()
    const allZeroData = data.length < 1
     
    return (
        <>
            <div className="px-[29px] py-[15px] h-[336px] flex flex-col">
                <div className="dark:text-white font-bold text-xl lg:-mb-4 mb-2">{title} Tahun {year}</div>
                <div className="h-[250px] flex flex-row items-center justify-center">
                    <div className="w-72 flex items-center align-middle justify-center">
                        {allZeroData ? 0 (
                            <div className="h-full dark:text-gray-400 items-center justify-center flex text-xl mb-[10px]">Data belum tersedia</div>
                        ) : (
                            <PieChart data={data.data} title={title} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PieChartAfterFilteredByProvinceAllFoodEstate