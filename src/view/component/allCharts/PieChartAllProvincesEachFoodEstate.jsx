import { useEffect, useRef, useState } from "react"
import Chart from "chart.js/auto";

const PieChart = ({ data, title }) => {
    const chartRef = useRef(null)
    const chartInstance = useRef(null)
    const [legendItems, setLegendItems] = useState([])

    const getColorForProvince = (provinceName) => {
        let hash = 0;
        for (let i = 0; i < provinceName.length; i++) {
            hash = provinceName.charCodeAt(i) + ((hash << 5) - hash);
        }
    
        // Warna lebih tegas, tidak pastel
        const r = ((hash >> 3) & 0xff) % 130 + 70;  // Rentang 70-200
        const g = ((hash >> 5) & 0xff) % 130 + 70;
        const b = ((hash >> 7) & 0xff) % 130 + 70;
    
        return `rgb(${r}, ${g}, ${b})`;
    };    

    useEffect(() => {
        console.log("ini data", data)
        console.log("ini title", title)
        if(chartInstance.current !== null) {
            chartInstance.current.destroy()
        }

        const ctx = chartRef.current.getContext("2d")

        const selectedKey = title.includes("Luas Panen") ? "luas_panen" : "produktivitas"
        console.log("ini selected key", selectedKey)

        const formattedData = data.map((item) => ({
            nama_provinsi: item.nama_provinsi,
            value: isNaN(parseFloat(item[selectedKey])) ? 0 : parseFloat(item[selectedKey])
        }))
        // console.log("ini formatted data: ", formattedData)

        const totalValue = formattedData.reduce((sum, item) => sum + (isNaN(item.value) ? 0 : item.value), 0);
        // console.log("ini totalValue", totalValue)

        const sortedData = formattedData
            .map((item) => ({
                nama_provinsi: item.nama_provinsi,
                persentase: (item.value / totalValue) * 100
            }))
            .sort((a, b) => b.persentase - a.persentase)
        
        console.log("ini sorted data", sortedData)    

        const backgroundColors =  sortedData.map((item) => getColorForProvince(item.nama_provinsi));
        console.log("ini generateColors", backgroundColors)

        setLegendItems((prevItems) => {
            const newLegendItems = sortedData.map((item, index) => ({
                label: item.nama_provinsi,
                color: backgroundColors[index],
            }));
            
            return JSON.stringify(prevItems) !== JSON.stringify(newLegendItems) ? newLegendItems : prevItems;
        });

        chartInstance.current = new Chart(ctx, {
            type: "pie",
            data: {
                labels: sortedData.map((item) => item.nama_provinsi),
                datasets: [
                    {
                        data: sortedData.map((item) => item.persentase.toFixed(2)),
                        backgroundColor: backgroundColors,
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        // position: "bottom",
                        // labels: {
                        //     color: "#a3a3a3"
                        // }
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                let value = parseFloat(tooltipItem.raw) || 0;
                                return `${tooltipItem.label}: ${value}%`
                            }
                        }
                    }
                }
            }
        })

        return () => {
            if(chartInstance.current !== null) {
                chartInstance.current.destroy()
            }
        }
    }, [data, title])

    console.log("ini legenditems:", legendItems)

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row items-center justify-center">
                <canvas ref={chartRef} className="h-44 w-full" />
            </div>
            <div>
                <div className="ml-4 mt-4 max-h-20 w-full max-w-[90%] flex flex-wrap items-center justify-center overflow-y-scroll overflow-x-hidden p-2 rounded">
                    {legendItems.map((item, index) => (
                    <div key={index} className="flex items-center align-middle gap-2 mb-1 mr-4">
                        <span className="w-7 h-2" style={{ backgroundColor: item.color }}></span>
                        <span className="text-xs text-gray-700 dark:text-gray-300">{item.label}</span>
                    </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

const PieChartAllProvincesEachFoodEstate = ({ title, data, year }) => {
    return (
        <div className="px-[29px] py-[15px] h-96 flex flex-col">
            <div className="dark:text-white font-bold text-xl mb-4">Persentase {title} Tahun {year}</div>
            <div className="flex flex-row justify-center">
                <div className="flex items-center align-middle justify-center">
                    <PieChart data={data} title={title} />
                </div>
            </div>
        </div>
    )
}

export default PieChartAllProvincesEachFoodEstate