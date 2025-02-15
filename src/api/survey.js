import apiClient from "./api";

export const storeSurveyDinamis = async (payload) => {
    try {
        const response = await apiClient.post(`/survey`, payload)
        return response.data
    } catch (error) {
        console.error("error fetching data: ", error)
        throw error;
    }
};

export const getAllSurvey = async (page, pageSize) => {
    try {
        const response = await apiClient.get(`/getallsurvey?page=${page}&limit=${pageSize}`)
        return response.data
    } catch (error) {
        console.error("error fetching data: ", error)
        throw error
    }
}

export const getDetailSurveyByResponden = async (param) => {
    try {
        const response = await apiClient.get(`/getdetail-survey-bykoderesponden?kode_responden=${param}`)
        return response.data
    } catch (error) {
        console.error("error fetching data: ", error)
        throw error
    }
}

