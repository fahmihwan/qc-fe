import { useEffect, useState } from "react"
import { getEachFoodEstateEachProvinceByYear } from "../api/foodEstate"

export const useEffectEachFoodEstateEachProvinceByYear = (year, sub_category) => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)

    const fetchData = async(year, sub_category) => {
        try{
            if(!year && !sub_category) return
            const response = await getEachFoodEstateEachProvinceByYear(year, sub_category)
            if(response.data) {
                console.log("Data yang diterima: ", response)
                setResponse(response.data)
            } else {
                setError("Data dari API kosong!")
            }
        } catch (error) {
            setError(error)
        }
    }

    useEffect(() => {
        fetchData(year, sub_category)
    }, [year, sub_category])

    return { response, error }
}