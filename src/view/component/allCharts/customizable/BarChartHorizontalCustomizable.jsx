import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { formatCurrency } from "../../../../utils/generateUtil";
import { Bar } from "react-chartjs-2";

const BarChartHorizontalCustomizable = ({
    data =[],
    labels = [],
    colors = [],
    width,
    height,
    labelsPosition = "bottom-right"
}) => {
    console.log("data yg diterima", data)
    const isDataEmpty = !data // Jika `data` null atau undefined
        || (Array.isArray(data) && data.length === 0) // Jika `data` array kosong
        || (typeof data === "object" && !Array.isArray(data) && Object.keys(data).length === 0); // Jika `data` object kosong

    const xKey = isDataEmpty ? "" : Object.keys(data[0])[0];
    // console.log("ini xKey: ", xKey)
    const xLabels = isDataEmpty ? [] : data.map((item) => item[xKey]);
    // console.log("ini xLabels: ", xLabels)

    const availableKeys = isDataEmpty ? [] : Object.keys(data[0]).slice(1); 
    // console.log("ini availablekeys", availableKeys)
    
    // const activeLabels = labels.length > 0 && typeof labels[0] === "string" 
    // ? labels.map(label => ({ key: label, label })) 
    // : availableKeys.map((key) => {
    //     const labelObj = labels.find(obj => obj && obj.hasOwnProperty(key)); 
    //     return {
    //         key, 
    //         label: labelObj ? labelObj[key] : key 
    //     };
    // });

    const activeLabels = labels.map(label => {
        if (typeof label === "string") {
            return { key: label, label }; 
        } else {
            const key = Object.keys(label)[0]; 
            return { key, label: label[key] };
        }
    });

// console.log("ini keyLabelMap:", keyLabelMap);


    // console.log("ini activelabels", activeLabels)
    
    const datasets = isDataEmpty ? [] : activeLabels.map(({key, label}, index) => ({
        label,
        data: data.map((item) => item[key] ?? 0),
        backgroundColor: colors[index % colors.length],
        borderColor: colors[index % colors.length],
        borderWidth: 0
    }))

    console.log("Ini datasets", datasets)

    const chartData = isDataEmpty ? {} : {
        labels: xLabels,
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
        <div className="h-full">
        {
            isDataEmpty ? (
                <div className="min-h-64 flex flex-col h-full justify-center items-center">
                        <div className="dark:text-gray-400 text-xl mb-[10px] text-center">Data belum tersedia</div>
                    </div>
            ) : (
                <div className="flex flex-col gap-4">
                    <div className={labelsPosition.startsWith("top") ? "order-1" : "order-2"}>  
                        <div className={`
                                mt-2 w-full px-2 max-h-12 max-w-[90%] gap-y-1 flex flex-wrap overflow-y-scroll custom-scrollbar orverflow-x-hidden
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
                        <Bar data={chartData} options={options} />
                    </div>
                </div>
                // <div className="flex flex-col gap-4">
                //     <div >
                //         <div className="ml-4 w-full  max-h-12 max-w-[90%] gap-y-1 flex flex-wrap items-center justify-center rounded overflow-y-scroll custom-scrollbar orverflow-x-hidden ">
                //             {activeLabels.map(({label}, index) => (
                //             <div key={index} className={`flex items-center align-middle gap-2 mb-1 ${index === labels.length - 1 ? "" : "mr-4"}`}>
                //                 <span className="w-4 h-4" style={{ backgroundColor: colors[index] }}></span>
                //                 <span className="text-xs text-gray-700 dark:text-gray-300">{label}</span>
                //             </div>
                //             ))}
                //         </div>
                //     </div>
                //     <div className="h-48 p-2 flex justify-center overflow-hidden">
                //         <Bar data={chartData} options={options} />
                //     </div>
                // </div>
            )
        }
        </div>
    )
}

export default BarChartHorizontalCustomizable