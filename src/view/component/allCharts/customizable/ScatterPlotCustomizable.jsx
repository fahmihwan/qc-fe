import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { formatCurrency } from "../../../../utils/generateUtil";
import { Scatter } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
const ScatterPlotCustomizable = ({
    data = [],
    labels = [],
    colors = [],
    width,
    height
}) => {

    // console.log("ini data scatter", data)
    // console.log("ini colors scatter", colors[0])
    // console.log("ini labels scatter", labels[0])
    const isDataEmpty = !data // Jika `data` null atau undefined
        || (Array.isArray(data) && data.length === 0) // Jika `data` array kosong
        || (typeof data === "object" && !Array.isArray(data) && Object.keys(data).length === 0); // Jika `data` object kosong
    

    const [xKey, yKey] = isDataEmpty ? [] : Object.keys(data[0])
    const chartData = isDataEmpty ? {} : {
        datasets: [
            {
                label: labels[0],
                data: data.map(item => ({
                    x: item[xKey],
                    y: item[yKey]
                })),
                backgroundColor: colors[0],
                pointRadius: 4,
                pointHoverRadius: 6
            }
        ]
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
                        return ` ${xKey}: ${formatCurrency(tooltipItem.raw.x)}, ${yKey}: ${formatCurrency(tooltipItem.raw.y)}`;
                    }
                }
            },
            datalabels: {
                display: false
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: xKey,
                    color: "#A3A3A3"
                },
                grid: {
                    // color: '#CCCCCC',
                    // borderColor: '#CCCCCC',
                    // drawBorder: true,
                    display: false
                },
                border:{
                    color: '#cccccc'
                }
            },
            y: {
                title: {
                    display: true,
                    text: yKey,
                    color: "#A3A3A3"
                },
                ticks: {
                    color: "#A3A3A3",
                    callback: (value) => `${formatCurrency(value)}`
                },
                grid: {
                    // color: '#CCCCCC',
                    // borderColor: '#CCCCCC',
                    // drawBorder: true
                    display: false
                },
                border:{
                    color: '#cccccc'
                }
            }
        }
    }
    return (
        <div className="flex flex-col">
            {
                isDataEmpty ? (
                    <div className="flex flex-col h-full justify-center">
                        <div className="dark:text-gray-400 text-xl mb-[10px] text-center">Data belum tersedia</div>
                    </div>
                ) : (
                    <div className="h-full w-full flex justify-center overflow-hidden">
                        <Scatter data={chartData} options={options} />
                    </div>
                )
            }
        </div>
    )
}

export default ScatterPlotCustomizable