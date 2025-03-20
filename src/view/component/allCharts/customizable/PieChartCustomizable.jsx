import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { formatCurrency } from "../../../../utils/generateUtil";
import { Pie } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
const PieChartCustomizable = ({ 
    data = [],
    labels = [],
    colors = [],
    width = null,
    height = null,
    labelsPosition = "bottom-right"
 }) => {

    console.log("data yg diterima", data)
    const isDataEmpty = !data // Jika `data` null atau undefined
        || (Array.isArray(data) && data.length === 0) // Jika `data` array kosong
        || (typeof data === "object" && !Array.isArray(data) && Object.keys(data).length === 0); // Jika `data` object kosong

    console.log("isdataempty pie chart", isDataEmpty)
    const activeLabels = isDataEmpty ? [] : labels.length > 0 && typeof labels[0] === "string" 
    ? labels.map(label => ({ key: label, label, value: data[label] ?? 0 })) 
    : labels.map((label) => {
        const key = Object.keys(label)[0]; // Ambil key dari object
        return {
            key,
            label: label[key],
            value: data[key] ?? 0
        };
    });

    console.log("ini active labels pie chart", activeLabels)
    const chartData = {
        labels: activeLabels.map(({label}) => label),
        datasets: [
            {
                data: activeLabels.map(({value}) => value), 
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
        <div className="">
            {
                isDataEmpty ? (
                    <div className="min-h-64 flex flex-col h-full justify-center">
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
                        <div className={`h-52 w-full flex justify-center overflow-hidden order-1 ${labelsPosition.startsWith("top") ? "order-2" : "order-1"}`}>
                            <Pie data={chartData} options={options} />
                        </div>
                    </div>
                    // <div className="flex flex-col gap-4">
                    //     <div className="h-52 items-center flex justify-center overflow-hidden">
                    //         <Pie data={chartData} options={options} />
                    //     </div>
                    //     <div >
                    //         <div className="ml-4 mt-2 w-full  max-h-12 max-w-[90%] gap-y-1 flex flex-wrap items-center justify-center rounded overflow-y-scroll custom-scrollbar orverflow-x-hidden">
                    //             {activeLabels.map(({label}, index) => (
                    //             <div key={index} className={`flex items-center align-middle gap-2 mb-1 ${index === labels.length - 1 ? "" : "mr-4"}`}>
                    //                 <span className="w-4 h-4" style={{ backgroundColor: colors[index] }}></span>
                    //                 <span className="text-xs text-gray-700 dark:text-gray-300">{label}</span>
                    //             </div>
                    //             ))}
                    //         </div>
                    //     </div>
                    // </div>
                )
            }
        </div>
    )
}

export default PieChartCustomizable