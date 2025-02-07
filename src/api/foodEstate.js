import apiClient from "./api";

export const getChart = async (sub_kategori) => {
    try {
        console.log("get chart:", sub_kategori)
        const response = await apiClient.get(`/foodestate?sub_kategori=${sub_kategori}`)
        // const response = await apiClient.get(`/foodestate?sub_kategori=Jagung`)
        return response.data
    } catch (error) {
        console.error("error fetching data: ", error)
        throw error;
    }
};