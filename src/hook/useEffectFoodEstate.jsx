import { useEffect, useState } from "react";
import { getChart } from "../api/foodEstate";

export const useEffectFoodEstate = (param) => {

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async (param) => {
        if (!param) {
            setError("params is not exists");
            return;
        }

        try {
            const response = await getChart(param);
            console.log(response.data);
            setResponse(response.data);
        } catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        fetchData(param)
    }, [param])

    return { response, error, fetchData }
}
