import BarChartHorizontalCustomizable from "../allCharts/customizable/BarChartHorizontalCustomizable"
import BarChartTumpukCustomizeable from "../allCharts/customizable/BarChartTumpukCustomizable"
import CountDoughnutChartCustomizable from "../allCharts/customizable/CountDoughnutChartCustomizable"
import LineChartBarChartCustomizable from "../allCharts/customizable/LineChartBarChartCustomizabel"
import LineChartCustomizable from "../allCharts/customizable/LineChartCustomizable"
import PieChartCustomizable from "../allCharts/customizable/PieChartCustomizable"
import ScatterPlotCustomizable from "../allCharts/customizable/ScatterPlotCustomizable"
import WordCloudCustomizable from "../allCharts/customizable/WordCloudCustomizable"

const ChartRenderer = ({ 
    type ='', 
    data = {},
    labels = [],
    colors = [],
    width = 0,
    height = 0
}) => {
    switch(type){
        case "pie-chart":
            return <PieChartCustomizable 
                data={data}
                labels={labels}
                colors={colors}
            />
        case "bar-chart-tumpuk":
            return <BarChartTumpukCustomizeable 
                data={data}
                labels={labels}
                colors={colors}
            />
        case "bar-chart-horizontal":
            return <BarChartHorizontalCustomizable 
                data={data}
                labels={labels}
                colors={colors}
            />
        case "line-chart":
            return <LineChartCustomizable 
                data={data}
                labels={labels}
                colors={colors}
            />
        case "word-cloud":
            return <WordCloudCustomizable 
                data={data}
                labels={labels}
                colors={colors}
            />
        case "count-doughnut-chart":
            return <CountDoughnutChartCustomizable 
                data={data}
                labels={labels}
                colors={colors}
            />
        case "scatter-plot":
            return <ScatterPlotCustomizable 
                data={data}
                labels={labels}
                colors={colors}
            />
        case "line-chart-bar-chart-horizontal":
            return <LineChartBarChartCustomizable 
                data={data}
                labels={labels}
                colors={colors}
            />
        defult:
            return <div>Unknown chart type</div>
    }
}

export default ChartRenderer