import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { formatCurrency } from "../../../../utils/generateUtil";
import { Bar } from "react-chartjs-2";

const BarChartHorizontalCustomizable = ({
    data =[],
    labels = [],
    colors = [],
    width,
    height
}) => {
    console.log("data yg diterima", data)
    const isDataEmpty = !data || data.length < 1

    const datasets = labels.map((label, index) => ({
        label,
        data: data.map((item) => item[label]),
        backgroundColor: colors[index],
        borderColor: colors[index],
        borderWidth: 0
    }))

    const chartData = {
        labels: data.map((item) => item.year),
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
                    drawBorder: true,
                    offset: false,
                },
                ticks: {
                    color: "#A3A3A3",
                    align: "center" // Agar grid pas dengan tahun
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
                        <div className="ml-4 mt-4 gap-y-1 flex flex-wrap items-center justify-center rounded">
                            {labels.map((label, index) => (
                            <div key={index} className={`flex items-center align-middle gap-2 mb-1 ${index === labels.length - 1 ? "" : "mr-4"}`}>
                                <span className="w-4 h-4" style={{ backgroundColor: colors[index] }}></span>
                                <span className="text-xs text-gray-700 dark:text-gray-300">{label}</span>
                            </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full h-full p-2 flex justify-center overflow-hidden">
                        <Bar data={chartData} options={options} />
                    </div>
                </div>
            )
        }
        </div>
    )
}

export default BarChartHorizontalCustomizable