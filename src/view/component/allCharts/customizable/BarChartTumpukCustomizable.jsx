import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { formatCurrency } from "../../../../utils/generateUtil";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const BarChartTumpukCustomizeable = ({
    data = [],
    labels = [],
    colors = [],
    width = 800,
    height
}) => {
    const isDataEmpty = !data // Jika `data` null atau undefined
        || (Array.isArray(data) && data.length === 0) // Jika `data` array kosong
        || (typeof data === "object" && !Array.isArray(data) && Object.keys(data).length === 0); // Jika `data` object kosong

    const xKey = isDataEmpty ? "" : Object.keys(data[0])[0];
    const xLabels = isDataEmpty ? [] : data.map((item) => item[xKey]);

    const availableKeys = isDataEmpty ? [] : Object.keys(data[0]).slice(1);
    
    const activeLabels = labels.length > 0 && typeof labels[0] === "string" 
    ? labels.map(label => ({ key: label, label })) 
    : availableKeys.map((key) => {
        const labelObj = labels.find(obj => obj && obj.hasOwnProperty(key)); 
        return {
            key, 
            label: labelObj ? labelObj[key] : key 
        };
    });
    
    const datasets = isDataEmpty ? [] : activeLabels.map(({key, label}, index) => ({
        label,
        data: data.map((item) => item[key] || 0),
        borderColor: colors[index],
        backgroundColor: colors[index],
    }))

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
                barPercentage: 1.0, // Pastikan batang mengisi penuh kategori
                categoryPercentage: 1.0,   
                stacked: true,
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
                stacked: true,
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
        <div className="flex flex-col w-full">
        {
            isDataEmpty ? (
                <div className="flex flex-col h-full justify-center">
                    <div className="dark:text-gray-400 text-xl mb-[10px] text-center">Data belum tersedia</div>
                </div>
            ) : (
                <div className="flex flex-col justify-start h-full w-full">
                    <div className="p-2 flex justify-center overflow-hidden">
                        <Bar data={chartData} options={options} height={"100%"}/>
                    </div>
                    <div >  
                        <div className="ml-4 mt-4 gap-y-1 flex flex-wrap items-center justify-center rounded">
                            {activeLabels.map(({label}, index) => (
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

export default BarChartTumpukCustomizeable