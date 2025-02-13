import { useEffect, useState } from "react";
import { getChart } from "../api/foodEstate";

export const useEffectFoodEstate = (sub_category, province_id=null) => {

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async (sub_category, province_id=null) => {
        // console.log("masuk sini", param)
        if (!sub_category) {
            setError("params is not exists");
            return;
        }
        // console.log("masukkkkk")

        try {
            console.log("masuk sini brod")
            const response = await getChart(sub_category, province_id);
            if (response.data) {
                console.log("berhasil nich")
                setResponse(response.data);
                return response.data
            } else {
                // setError("Data dari API kosong!");
            }
        } catch (error) {
            // console.log("ada error di use effect: ", error)
            setError(error);
        }
    }

    useEffect(() => {
        fetchData(sub_category, province_id)
    }, [])

    return { response, error, fetchData }
}
