import { Chart, DoughnutController, ArcElement } from "chart.js";
import { useEffect, useRef } from "react";

const PieChartSideBar = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    const myData = {
        labels: ["A", "B", "C", "D"],
        datasets: [
            {
                data: [12, 19, 3, 5],
                backgroundColor: [
                    "rgba(21, 93, 33, 1)",
                    "rgba(15, 44, 64, 1)",
                    "rgba(138, 28, 114, 1)",
                    "rgba(244, 190, 55, 1)",
                ],
                borderWidth: 0
            },
        ],
    }

    useEffect(() => {
        if(chartInstance.current){
            chartInstance.current.destroy()
        }

        Chart.register(DoughnutController, ArcElement);

        const ctx = chartRef.current.getContext("2d")

        chartInstance.current = new Chart(ctx, {
            type: 'doughnut',
            data: myData,
            options: {
                responsive: true,
                maintainAspectRatio: false  
            }
        })

        return () => {
            if(chartInstance.current){
                chartInstance.current.destroy()
            }
        }
    }, [])

    return (
        <section>
            <div className="w-28 h-28">
                <canvas ref={chartRef}></canvas>
            </div>
        </section>
    );
}

export default PieChartSideBar;