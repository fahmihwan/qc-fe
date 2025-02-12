import { useEffect, useState } from "react"
import { getAllFoodEstateByProvinceIdAndYear } from "../api/foodEstate"

export const useEffectAllFoodEstateEachProvinceEachYear = (province_id, year) => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)

    const fetchData = async (province_id, year) => {
        try{
            if(!province_id && !year) return;
            const response = await getAllFoodEstateByProvinceIdAndYear(province_id, year)
            if (response.data) {
                console.log("Data yang diterima:", response);
                setResponse(response.data);
            } else {
                setError("Data dari API kosong!");
            }
        } catch (error) {
            setError(error)
        }
    }

    useEffect(() => {
        fetchData(province_id, year)
    }, [province_id, year])

    return { response, error }
}