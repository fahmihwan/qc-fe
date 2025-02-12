import apiClient from "./api";

export const getTable = async (year) => {

    try {
        const response = await apiClient.get(`/gettable?year=${year}`)
        return response.data
    } catch (error) {
        console.error("error fetching data: ", error)
        throw error;
    }
};

export const getYears = async() => {
    try {
        const response = await apiClient.get('/getlistyear')
        return response.data
    } catch (error) {
        console.error("error fetching data: ", error)
        throw error;
    }
}