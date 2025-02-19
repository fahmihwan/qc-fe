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

export const getYears = async () => {
    try {
        const response = await apiClient.get('/getlistyear')
        return response.data
    } catch (error) {
        console.error("error fetching data: ", error)
        throw error;
    }
}


export const getDropdownSubdata = async () => {
    try {
        const response = await apiClient.get('/get-dropdown-subdata')
        return response.data
    } catch (error) {
        console.error("error fetching data: ", error)
        throw error;
    }
}


export const getDropdownNamakategori = async () => {
    try {
        const response = await apiClient.get('/get-dropdown-namakategori')
        return response.data
    } catch (error) {
        console.error("error fetching data: ", error)
        throw error;
    }
}


export const getDropdownSubkatgeori = async (kategori) => {
    try {
        const response = await apiClient.get(`/get-dropdown-subkategori?kategori=${kategori}`)
        return response.data
    } catch (error) {
        console.error("error fetching data: ", error)
        throw error;
    }
}



export const getDropdownTopik = async (kategori_id) => {
    try {
        const response = await apiClient.get(`/get-dropdown-topik?kategori=${kategori_id}`)
        return response.data
    } catch (error) {
        console.error("error fetching data: ", error)
        throw error;
    }
}





