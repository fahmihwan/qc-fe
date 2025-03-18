import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";
import { formatCurrency } from "../../../../utils/generateUtil";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
const LineChartCustomizable = ({
    data = [],
    labels = [],
    colors = [],
    width = null,
    height = null,
    labelsPosition = "bottom-right"
}) => {

    console.log("data yg diterima line", data)
    const isDataEmpty = !data // Jika `data` null atau undefined
        || (Array.isArray(data) && data.length === 0) // Jika `data` array kosong
        || (typeof data === "object" && !Array.isArray(data) && Object.keys(data).length === 0) // Jika `data` object kosong
        || (Array.isArray(data) && data.every(obj => {
            if(typeof obj !== "object" || Array.isArray(obj)) return false
            const keys = Object.keys(obj)
            return keys.length > 1 && keys.slice(1).every(key => Number(obj[key]) === 0)
        }))

    console.log("isDataEmpty", isDataEmpty)
    const years = isDataEmpty ? [] : data.map((item) => item.year)

    const activeLabels = labels.length > 0 && typeof labels[0] === "string" 
    ? labels.map(label => ({ key: label, label, value: data[label] ?? 0 })) 
    : labels.map((label) => {
        const key = Object.keys(label)[0]; // Ambil key dari object
        return {
            key,
            label: label[key],
            value: data[key] ?? 0
        };
    });

    const datasets = isDataEmpty ? [] : activeLabels.map(({key, label}, index) => ({
        label,
        data: data.map((item) => item[key]),
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
                        const datasetLabelCustom = activeLabels[datasetIndex]?.label

                        const formattedLabel = datasetLabelCustom.charAt(0).toUpperCase() + datasetLabelCustom.slice(1)
                        return ` ${formattedLabel}: ${formatCurrency(tooltipItem.raw)}`
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
                    <div className="min-h-64 flex flex-col h-full justify-center items-center">
                        <div className="dark:text-gray-400 text-xl mb-[10px] text-center">Data belum tersedia</div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <div className={labelsPosition.startsWith("top") ? "order-1" : "order-2"}>  
                            <div className={`
                                    ml-4 mt-2 w-full px-2 max-h-12 max-w-[90%] gap-y-1 flex flex-wrap rounded overflow-y-scroll custom-scrollbar orverflow-x-hidden
                                    ${labelsPosition.endsWith("right")
                                        ? "justify-end"
                                        : labelsPosition.endsWith("left")
                                        ? "justify-start"
                                        : "justify-center"
                                    }
                                `}>
                                {activeLabels.map(({label}, index) => (
                                <div key={index} className={`flex items-center align-middle gap-2 mb-1 ${index === labels.length - 1 ? "" : "mr-4"}`}>
                                    <span className="w-4 h-4" style={{ backgroundColor: colors[index] }}></span>
                                    <span className="text-xs text-gray-700 dark:text-gray-300 capitalize">{label}</span>
                                </div>
                                ))}
                            </div>
                        </div>
                        <div className={`h-48 w-full flex justify-center overflow-hidden order-1 ${labelsPosition.startsWith("top") ? "order-2" : "order-1"}`}>
                            <Line data={chartData} options={options} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default LineChartCustomizable