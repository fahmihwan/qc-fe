import { useEffect, useState } from "react";
import { getAllFoodEstateAllProvinces } from "../api/foodEstate";

export const useEffectAllFoodEstate = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await getAllFoodEstateAllProvinces();
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
};