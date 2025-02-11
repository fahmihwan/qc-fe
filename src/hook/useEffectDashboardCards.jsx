import { useEffect, useState } from "react"
import { getAllForDashboardCards } from "../api/dashboard"

export const useEffectDashboardCards = () => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)

    const fetchCards = async () => {
        try {
            const response = await getAllForDashboardCards()
            if (response.data) {
                setResponse(response.data)
            } else {
                setError("Data dari API kosong!");
            }
        } catch (error) {
            // console.log("ada error di use effect: ", error)
            setError(error);
        }
    }

    useEffect(() => {
        fetchCards()
    }, [])

    return { response, error, fetchCards }
}