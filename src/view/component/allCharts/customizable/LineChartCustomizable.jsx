import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";
import { formatCurrency } from "../../../../utils/generateUtil";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
const LineChartCustomizable = ({
    data = [],
    labels = [],
    colors = [],
    width = null,
    height = null
}) => {

    console.log("data yg diterima", data)
    const isDataEmpty = !data // Jika `data` null atau undefined
        || (Array.isArray(data) && data.length === 0) // Jika `data` array kosong
        || (typeof data === "object" && !Array.isArray(data) && Object.keys(data).length === 0); // Jika `data` object kosong

    console.log("isDataEmpty", isDataEmpty)
    const years = isDataEmpty ? [] : data.map((item) => item.year)
    const datasets = isDataEmpty ? [] : labels.map((label, index) => ({
        label,
        data: data.map((item) => item[label]),
        borderColor: colors[index],
        backgroundColor: colors[index],
        tension: 0.3,
        pointBorderColor: colors[index],
        pointBackgroundColor: "#ffffff",
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBorderWidth: 2
    }))

    const chartData = {
        labels: years,
        datasets
    }

    const options = {
        responsive: true,
        maintainAspecRatio: false,
        plugins:{
            legend: {
                display: false
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (tooltipItem) => {
                        const datasetIndex = tooltipItem.datasetIndex
                        const datasetLabelCustom = labels[datasetIndex]
                        return ` ${datasetLabelCustom}: ${formatCurrency(tooltipItem.raw)}`
                    },
                    labelColor: (tooltipItem) => {
                        const datasetIndex = tooltipItem.datasetIndex;
                        return {
                            borderColor: colors[datasetIndex], 
                            backgroundColor: colors[datasetIndex], 
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
                grid: {
                    color: '#CCCCCC',
                    borderColor: '#CCCCCC',
                    drawBorder: true
                },
                border:{
                    color: '#cccccc'
                }
            },
            y: {
                beginAtZero: true,
                min: 0,
                ticks: {
                    color: "#A3A3A3",
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
    }

    return (
        <div className="flex flex-col h-full">
            {
                isDataEmpty ? (
                    <div className="flex flex-col">
                        <div className="dark:text-gray-400 text-xl mb-[10px]">Data belum tersedia</div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <div >
                            <div className="ml-4 mt-4 gap-y-1 flex flex-wrap items-center justify-end rounded">
                                {labels.map((label, index) => (
                                <div key={index} className={`flex items-center align-middle gap-2 mb-1 ${index === labels.length - 1 ? "" : "mr-4"}`}>
                                    <span className="w-4 h-4" style={{ backgroundColor: colors[index] }}></span>
                                    <span className="text-xs text-gray-700 dark:text-gray-300">{label}</span>
                                </div>
                                ))}
                            </div>
                        </div>
                        <div className="h-full w-full flex justify-center overflow-hidden">
                            <Line data={chartData} options={options} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default LineChartCustomizable