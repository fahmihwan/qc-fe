import { useEffect, useState } from "react"
import { getDropdownTopik, getYears } from "../api/otherApi";

export const useEffectYears = () => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await getYears();
            if (response.data) {
                console.log("Data yang diterima:", response);
                setResponse(response.data);
            } else {
                setError("Data dari API kosong!");
            }
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { response, error };
}


export const useEffectDropdownTopik = () => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await getDropdownTopik();
            if (response.data) {
                setResponse(response.data);
            } else {
                setError("Data dari API kosong!");
            }
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { response, error };
}


