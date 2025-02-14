import { useEffect, useState } from "react";
import { getAllSurvey, getDetailSurveyByResponden } from "../api/survey";

export const useEffectSurvey = () => {

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await getAllSurvey()
            setResponse(response.data);
        } catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { response, error, fetchData }
}


export const useEffectDetailSurvey = (param) => {

    const [responseD, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async (param) => {
        try {
            const response = await getDetailSurveyByResponden(param)
            setResponse(response.data);
        } catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        if (param) {
            fetchData(param)
        }
    }, [param])

    return { responseD, error, fetchData }
}


