import { useEffect, useState } from "react";
import { getChart } from "../api/foodEstate";

export const useEffectFoodEstate = (param) => {

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async (param) => {
        console.log("masuk sini", param)
        if (!param) {
            setError("params is not exists");
            return;
        }
        console.log("masukkkkk")

        try {
            console.log("masuk sini brod")
            const response = await getChart(param);
            if (response.data) {
                console.log("berhasil nich")
                setResponse(response.data); 
            } else {
                setError("Data dari API kosong!");
            }
        } catch (error) {
            console.log("ada error di use effect: ", error)
            setError(error);
        }
    }

    useEffect(() => {
        fetchData(param)
    }, [param])

    return { response, error, fetchData }
}
