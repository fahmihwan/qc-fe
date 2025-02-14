import apiClient from "./api";

export const storeSurveyDinamis = async (payload) => {
    console.log(payload);
    try {
        const response = await apiClient.post(`/survey`, payload)
        return response.data
    } catch (error) {
        console.error("error fetching data: ", error)
        throw error;
    }
};

// export const getYears = async () => {
//     try {
//         const response = await apiClient.get('/getlistyear')
//         return response.data
//     } catch (error) {
//         console.error("error fetching data: ", error)
//         throw error;
//     }
// }