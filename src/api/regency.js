// select * from provinsi p
// select * from kabupaten_kota kk   

import apiClient from "./api";

export const getProvinsi = async (payload) => {
    try {
        const response = await apiClient.get(`/provinsi`)
        return response.data
    } catch (error) {
        console.error("error fetching data: ", error)
        throw error;
    }
};

export const getKabupaten = async (provinsi_id) => {
    try {
        const response = await apiClient.get(`/kabkota/${provinsi_id}`)
        return response.data
    } catch (error) {
        console.error("error fetching data: ", error)
        throw error
    }
}


