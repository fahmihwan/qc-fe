import { useEffect, useState } from "react"
import { getAllFoodEstateByProvinceIdAndYear } from "../api/foodEstate"

export const useEffectAllFoodEstateEachProvince = (province_id, year) => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)

    const fetchData = async () => {
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
        fetchData()
    }, [])

    return { response, error }
}