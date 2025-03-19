import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { formatCurrency } from "../../../../utils/generateUtil";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const BarChartTumpukColumn = ({
    data = [],
    labels = [],
    colors = [],
    width = 800,
    height,
    labelsPosition = "bottom-right"
}) => {
    const isDataEmpty = !data // Jika `data` null atau undefined
        || (Array.isArray(data) && data.length === 0) // Jika `data` array kosong
        || (typeof data === "object" && !Array.isArray(data) && Object.keys(data).length === 0); // Jika `data` object kosong

    const xKey = isDataEmpty ? "" : Object.keys(data[0])[0];
    const xLabels = isDataEmpty ? [] : data.map((item) => item[xKey]);
    
    const datasets = isDataEmpty ? [] : labels.map((label, index) => ({
        label,
        data: data.map((item) => item[label] || 0),
        borderColor: colors[index],
        backgroundColor: colors[index],
    }))

    const chartData = isDataEmpty ? {} : {
        labels: xLabels,
        datasets
    }

    const options = {
        indexAxis: 'y', // Ubah orientasi chart menjadi vertical
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
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
            x: { // Sekarang sumbu X akan menunjukkan angka
                stacked: true,
                beginAtZero: true,
                min: 0,
                ticks: {
                    color: "#A3A3A3",
                    callback: (value) => `${formatCurrency(value)}`,
                    maxRotation: 45,
                    minRotation: 45
                },
                grid: {
                    color: '#CCCCCC',
                    borderColor: '#CCCCCC',
                    drawBorder: true
                },
                border: {
                    color: '#cccccc'
                }
            },
            y: { // Sumbu Y menjadi kategori
                barPercentage: 0.8,
                categoryPercentage: 0.9,
                stacked: true,
                grid: {
                    color: '#CCCCCC',
                    borderColor: '#CCCCCC',
                    drawBorder: true,
                    offset: false,
                },
                ticks: {
                    color: "#A3A3A3",
                    align: "center"
                },
                border: {
                    color: '#cccccc'
                }
            }
        }
    }
    
    return (
        <div className="flex flex-col w-full h-full">
        {
            isDataEmpty ? (
                <div className="flex flex-col h-full justify-center items-center">
                    <div className="dark:text-gray-400 text-xl mb-[10px] text-center">Data belum tersedia</div>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    <div className={labelsPosition.startsWith("top") ? "order-1" : "order-2"}>  
                        <div className={`
                                ml-4 mt-2 w-full px-2 max-h-12 max-w-[90%] gap-y-1 flex flex-wrap overflow-y-scroll custom-scrollbar orverflow-x-hidden
                                ${labelsPosition.endsWith("right")
                                    ? "justify-end"
                                    : labelsPosition.endsWith("left")
                                    ? "justify-start"
                                    : "justify-center"
                                }
                            `}>
                            {labels.map((label, index) => (
                            <div key={index} className={`flex items-center align-middle gap-2 mb-1 ${index === labels.length - 1 ? "" : "mr-4"}`}>
                                <span className="w-4 h-4" style={{ backgroundColor: colors[index] }}></span>
                                <span className="text-xs text-gray-700 dark:text-gray-300 capitalize">{label}</span>
                            </div>
                            ))}
                        </div>
                    </div>
                    <div className={`h-72 w-full flex justify-center overflow-hidden order-1 ${labelsPosition.startsWith("top") ? "order-2" : "order-1"}`}>
                        <Bar data={chartData} options={options} height={"100%"}/>
                    </div>
                </div>
                // <div className="flex flex-col justify-start h-full w-full">
                //     <div className="h-72 p-2 flex justify-center overflow-hidden">
                //         <Bar data={chartData} options={options} height={"100%"}/>
                //     </div>
                //     <div >  
                //         <div className="ml-4 mt-2 w-full  max-h-12 max-w-[90%] gap-y-1 flex flex-wrap items-center justify-center rounded overflow-y-scroll custom-scrollbar orverflow-x-hidden">
                //             {labels.map((label, index) => (
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

export default BarChartTumpukColumn