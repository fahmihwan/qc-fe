import apiClient from "./api"

export const getAllForDashboardCards = async() => {
    try{
        const response = await apiClient.get('/getslider')
        return response.data
    } catch (error){
        console.error("error fetching data: ", error)
        throw error;
    }
}