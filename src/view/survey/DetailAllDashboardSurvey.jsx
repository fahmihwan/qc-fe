import LayoutType1Survey from "../layout/LayoutType1Survey"
import LayoutType2Survey from "../layout/LayoutType2Survey"
import LayoutType3Survey from "../layout/LayoutType3Survey"
import LayoutType4Survey from "../layout/LayoutType4Survey"
import LayoutType5Survey from "../layout/LayoutType5Survey"
import NotFoundPage from "../notFound/NotFoundPage"

import topicsConfig from "../../data/dataSubKategoriDashboardSurvey.json"
import { useParams } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"
import LayoutType6Survey from "../layout/LayoutType6Survey"
import ChartRenderer from "../component/SurveyChart/ChartRenderer"
import { getDynamicChart } from "../../api/survey"

const getLayoutComponent = (
    layoutType,
    topicTitle,
    selectedSubCategory,
    setSelectedSubCategory,
    subCategories,
    onProvinceClick,
    selectedProvinceCode,
    selectedProvinceName,
    isProvinceClicked,
    resetSelection,
    children
) => {
    console.log(layoutType)

    const props = {
        topicTitle,
        selectedSubCategory,
        setSelectedSubCategory,
        subCategories,
        onProvinceClick,
        selectedProvinceCode,
        selectedProvinceName,
        isProvinceClicked,
        resetSelection,
        children
    }

    switch(layoutType) {
        case "layout1":
            return <LayoutType1Survey {...props}/>
        case "layout2":
            return <LayoutType2Survey {...props}/>
        case "layout3":
            return <LayoutType3Survey {...props}/>
        case "layout4":
            return <LayoutType4Survey {...props}/>
        case "layout5":
            return <LayoutType5Survey {...props}/>
        case "layout6":
            return <LayoutType6Survey {...props}/>
        default:
            return <div className="text-center">Test 123</div>
    }
}

const DetailAllDashboardSurvey = () => {
    const { detail } = useParams()
    
    const topicData =  topicsConfig.data.find(topic => topic.url.endsWith(detail))
    const layoutType = topicData.layoutType
    const topicTitle =  topicData.topicTitle

    const [selectedProvinceName, setSelectedProvinceName] = useState('')
    const [selectedProvinceCode, setSelectedProvinceCode] = useState(null)
    const [selectedSubCategory, setSelectedSubCategory] = useState("Padi")
    
    const [isProvinceClicked, setIsProvinceClicked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [chartData, setChartData] = useState([])

    const [subCategories, setSubCategories] = useState([
        "Padi",
        "Jagung",
        "Kedelai",
        "Tebu", 
        "Singkong",
        "Sawit"
    ])

    const titleWithNoSubCategories = [
        "Potensi Konflik di Sekitar Batas Hutan",
        "Pelestarian dan Keberlanjutan Batas Hutan"
    ]

    const onProvinceClick = async(namaProvinsi, kodeProvinsi) => {
        // setIsLoading(true)
        setIsProvinceClicked(true)
        setSelectedProvinceCode(kodeProvinsi)
        setSelectedProvinceName(namaProvinsi)
    }

    const resetSelection = async() => {
        // setIsLoading(true)
        setIsProvinceClicked(false);
        setSelectedProvinceName('');
        setSelectedProvinceCode(null);
        // await fetchDataAsync()
    };
    // console.log("ini topic data", topicData)

    const filteredPayload = useMemo(() => {
        return topicData.payload.find(item => item.sub_category === selectedSubCategory)?.payload[0] || []
    }, [selectedSubCategory, topicData])

    const fetchChartData = async(province_id = null) => {
        if(filteredPayload.length === 0) return
        setIsLoading(true)

        try{
            const response = await getDynamicChart(filteredPayload, province_id)
            console.log("ini response", response)
            setChartData(response.data)
        } catch(error) {
            console.error("Error fetching dynamic chart data: ", error)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        // console.log("Ini filteredpayload", filteredPayload)
        fetchChartData(selectedProvinceCode)
    }, [filteredPayload, selectedProvinceCode])

    useEffect(() => {
        if(titleWithNoSubCategories.includes(topicTitle)) {
            setSubCategories([])
        }
    }, [topicTitle])

    const children = chartData.map((chart, index) => {
        const specifiedTopicChart = topicData.charts[index] || {}
        const specifiedChartDetails = topicData.payload.find(item => item.sub_category === selectedSubCategory)

        const specifiedLabelsChart = specifiedChartDetails?.chart_details[index]?.labels
        const specifiedTitleChart = specifiedChartDetails?.chart_details[index]?.title
        const specifiedLabelsPosition = specifiedTopicChart["labels-position"]
        console.log("ini specifiedlabelschart", specifiedLabelsChart)

        return (
            <div key={index} className="w-full h-full flex flex-col justify-between">
                <div className="dark:text-white font-bold text-xl text-left mb-4">
                    {specifiedTitleChart}
                </div>
                <div className="">
                <ChartRenderer type={specifiedTopicChart.type} data={chart.data} labels={specifiedLabelsChart} colors={specifiedTopicChart.colors} labelsPosition={specifiedLabelsPosition}/>
                </div>
            </div>
        )
    })

    return getLayoutComponent(
        layoutType,
        topicTitle,
        selectedSubCategory,
        setSelectedSubCategory,
        subCategories,
        onProvinceClick,
        selectedProvinceCode,
        selectedProvinceName,
        isProvinceClicked,
        resetSelection,
        children,
        isLoading   
    )
}   

export default DetailAllDashboardSurvey