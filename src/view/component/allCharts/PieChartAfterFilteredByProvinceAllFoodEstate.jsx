import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

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
                            "rgba(178, 223, 138, 1)",
                            "rgba(244, 190, 55, 1)",
                            "rgba(15, 44, 64, 1)",
                            "rgba(138, 28, 114, 1)",
                            "rgba(21, 93, 33, 1)",
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
                                let value = tooltipItem.raw.toLocaleString();
                                return `${tooltipItem.label}: ${value} ha`;
                            },
                        },
                    },
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

    return (
        <>
            <div className="px-[29px] py-[15px] h-[326px] flex flex-col">
                <div className="dark:text-white font-bold text-xl lg:-mb-4 mb-2">{title} Tahun {year}</div>
                <div className="h-[250px] flex flex-row items-center justify-center">
                    <div className="w-72 flex items-center align-middle justify-center">
                        <PieChart data={data.data} title={title} />
                    </div>
                </div>
            </div>
            <div className='h-[1px] dark:bg-white'></div>
        </>
    )
}

export default PieChartAfterFilteredByProvinceAllFoodEstate