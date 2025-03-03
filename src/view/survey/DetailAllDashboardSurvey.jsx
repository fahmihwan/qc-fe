import LayoutType1Survey from "../layout/LayoutType1Survey"
import LayoutType2Survey from "../layout/LayoutType2Survey"
import LayoutType3Survey from "../layout/LayoutType3Survey"
import LayoutType4Survey from "../layout/LayoutType4Survey"
import LayoutType5Survey from "../layout/LayoutType5Survey"
import NotFoundPage from "../notFound/NotFoundPage"

import topicsConfig from "../../data/dataSubKategoriDashboardSurvey.json"
import { useParams } from "react-router-dom"
import { useState } from "react"

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
    resetSelection
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
        resetSelection
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

    const [subCategories, setSubCategories] = useState([
        "Padi",
        "Jagung",
        "Kedelai",
        "Tebu", 
        "Singkong"
    ])

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
        resetSelection
    )
}   

export default DetailAllDashboardSurvey