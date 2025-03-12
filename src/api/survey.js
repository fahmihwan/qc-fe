import apiClient from "./api";

export const storeSurveyDinamis = async (payload) => {
    try {
        const response = await apiClient.post(`/survey`, payload, { timeout: 5000 })
        return response.data
    } catch (error) {
        console.error("error fetching data: ", error)
        throw error;
    }
};

export const getAllSurvey = async (page, pageSize) => {
    try {
        const response = await apiClient.get(`/getallsurvey?page=${page}&limit=${pageSize}`)
        return response.dat
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



// chart
export const getPieChartSurvey = async () => {
    try {
        const response = await apiClient.get(`/getpie-dashboard-survey`)
        return response.data
    } catch (error) {
        console.error("error fetching data: ", error)
        throw error
    }
}

export const getBarChartSurvey = async () => {
    try {
        const response = await apiClient.get(`/getbar-dashboard-survey`)
        return response.data
    } catch (error) {
        console.error("error fetching data: ", error)
        throw error
    }
}

export const getWorldCloudChartSurvey = async () => {
    try {
        const response = await apiClient.get(`/getworldcloud-dashboard-survey`)
        return response.data
    } catch (error) {
        console.error("error fetching data: ", error)
        throw error
    }
}


export const getlinechart = async () => {
    try {
        const response = await apiClient.get(`/getlinechart-dashboard-survey`)
        return response.data
    } catch (error) {
        console.error("error fetching data: ", error)
        throw error
    }
}

export const getDynamicChart = async(payload, province_id = null) => {
    try {
        // console.log("payload yg diterima: ", payload    )
        const response = await apiClient.post(
            `/get-chart-dinamis${province_id ? `?provinsi_id=${province_id}` : ''}`,
            payload
        )
        return response.data
    } catch(error) {
        console.error("error fetching data: ", error)
        throw error
    }
}




