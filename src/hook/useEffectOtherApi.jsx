import { useEffect, useState } from "react";
import { getChart } from "../api/foodEstate";
import { getTable } from "../api/otherApi";

export const useEffectOtherApi = (param) => {

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async (param) => {
        if (!param) {
            setError("params is not exists");
            return;
        }

        try {
            const response = await getTable(param);
            if (response.data) {
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
