import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { formatCurrency } from "../../../../utils/generateUtil";
import { Pie } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
const PieChartCustomizable = ({ 
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

    const chartData = {
        labels,
        datasets: [
            {
                data: labels.map(label => data[label]), 
                backgroundColor: colors,
                borderColor: "#ffffff", 
                borderWidth: 1
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspecRatio: false,
        layout: {
            padding: 10,
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        return ` ${formatCurrency(tooltipItem.raw)}`;
                    },
                    labelColor: (tooltipItem) => {
                        const datasetIndex = tooltipItem.dataIndex;
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
                color: "#fff",
                font: {
                    size: 12
                },
                formatter: (value, context) => {
                    const dataset = context.chart.data.datasets[0].data; 
                    const total = dataset.reduce((sum, val) => sum + val, 0); 
                    const percentage = (value / total) * 100;
                    
                    return percentage > 15 ? `${formatCurrency(value)}` : '';
                }
            }
        }
    };


    return (
        <div className="flex flex-col">
            {
                isDataEmpty ? (
                    <div className="flex flex-col h-full justify-center">
                        <div className="dark:text-gray-400 text-xl mb-[10px] text-center">Data belum tersedia</div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <div className="h-52 items-center flex justify-center overflow-hidden">
                            <Pie data={chartData} options={options} />
                        </div>
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
                    </div>
                )
            }
        </div>
    )
}

export default PieChartCustomizable