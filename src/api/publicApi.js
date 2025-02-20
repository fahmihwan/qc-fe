import apiClient from "./api"

export const getAllBencana = async(startDate, endDate, province_id=null) => {
    try{
        const response = await apiClient.get(`/publicapi/getbencana?startDate=${startDate}&endDate=${endDate}${province_id ? `&id=${province_id}` : ''}`)
        return response.data
    } catch (error) {
        console.error("error fetching data: ", error)
        throw error
    }
}

export const getAllSummary = async(startDate, endDate, province_id=null) => {
    try{
        const response = await apiClient.get(`/publicapi/getsummary?startDate=${startDate}&endDate=${endDate}${province_id ? `&id=${province_id}` : ''}`)
        return response.data
    } catch (error) {
        console.error("error fetching data: ", error)
        throw error
    }
}

