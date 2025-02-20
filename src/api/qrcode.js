import apiClient from "./api";

export const storeQRcode = async (payload) => {
    console.log(payload);
    try {
        const response = await apiClient.post(`/qrcode`, payload)
        return response.data
    } catch (error) {
        console.error("error fetching data: ", error)
        throw error
    }
}


export const getAllQrcode = async (page, pageSize) => {
    try {
        const response = await apiClient.get(`/qrcodes`)
        return response.data
    } catch (error) {
        console.error("error fetching data: ", error)
        throw error
    }
}


export const deleteQrcode = async (qrcode) => {
    try {
        const response = await apiClient.delete(`/qrcode/${qrcode}`)
        return response.data
    } catch (error) {
        console.error("error fetching data: ", error)
        throw error
    }
}