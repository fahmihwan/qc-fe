import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { formatCurrency } from "../../../../utils/generateUtil";
import { Doughnut, Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
const CountDoughnutChartPercentageCustomizable = ({ 
    data = [],
    labels = [],
    colors = [],
    width = null,
    height = null,
    labelsPosition = "bottom-left"
 }) => {

    console.log("data yg diterima", data)
    const isDataEmpty = !data // Jika `data` null atau undefined
        || (Array.isArray(data) && data.length === 0) // Jika `data` array kosong
        || (typeof data === "object" && !Array.isArray(data) && Object.keys(data).length === 0); // Jika `data` object kosong

    const [isDarkMode, setIsDarkMode] = useState(
        document.documentElement.classList.contains("dark")
    );

    // useEffect untuk mendeteksi perubahan dark mode secara dinamis
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDarkMode(document.documentElement.classList.contains("dark"));
        });

        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

        return () => observer.disconnect();
    }, []);
    
    const totalSumData = isDataEmpty ? 0 : Object.values(data).reduce((sum, value) => sum + value, 0)
    
    const activeLabels = labels.length > 0 && typeof labels[0] === "string" 
    ? labels.map(label => ({ 
        key: label, label, 
        value: data[label] ?? 0,
        percentage: totalSumData > 0 ? ((data[label] / totalSumData) * 100).toFixed(2) : 0
    })) 
    : labels.map((label) => {
        const key = Object.keys(label)[0]; // Ambil key dari object
        return {
            key,
            label: label[key],
            value: data[key] ?? 0,
            percentage: totalSumData > 0 ? ((data[key] / totalSumData) * 100).toFixed(2) : 0
        };
    });
    
    const chartData = {
        labels: activeLabels.map(({label}) => label),
        datasets: [
            {
                data: activeLabels.map(({percentage}) => percentage), 
                backgroundColor: colors,
                borderColor: "#ffffff", 
                borderWidth: 1
            }
        ]
    }

    const options = {
        responsive: true,
        cutout: "60%",
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
                        const index = tooltipItem.dataIndex
                        const label = activeLabels[index].label
                        const jumlah = activeLabels[index].value
                        const persen = activeLabels[index].percentage
                        return [`${label}: ${persen}%`, `Jumlah responden: ${jumlah}`];
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
                color: isDarkMode ? "#fff" : "#000",
                font: {
                    size: 12
                },
                formatter: (value) => {
                    return `${value}%`
                }
            }
        }
    };


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
                                    ml-4 mt-2 w-full px-2 max-h-12 max-w-[90%] gap-y-1 flex flex-wrap overflow-y-scroll custom-scrollbar orverflow-x-hidden
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
                        <div className={`${labelsPosition.startsWith("top") ? "order-2" : "order-1"}`}>
                            <div className="text-4xl dark:text-white">{totalSumData}</div>
                            <div className="h-48 items-center flex justify-center overflow-hidden">
                                <Doughnut data={chartData} options={options}  height={50}/>
                            </div>
                        </div>
                    </div>
                    // <div className="flex flex-col gap-4">
                        // <div>
                        //     <div className="text-4xl dark:text-white">{formatCurrency(totalSumData)}</div>
                        //     <div className="h-48 items-center flex justify-center overflow-hidden">
                        //         <Doughnut data={chartData} options={options}  height={50}/>
                        //     </div>
                        // </div>
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

export default CountDoughnutChartPercentageCustomizable