import { createSearchParams } from "react-router-dom";
import apiClient from "./api";

export const getChart = async (sub_kategori) => {
    try {
        const response = await apiClient.get(`/foodestate?sub_kategori=${sub_kategori}`)
        // const response = await apiClient.get(`/foodestate?sub_kategori=Jagung`)
        return response.data
    } catch (error) {
        console.error("error fetching data: ", error)
        throw error;
    }
};

export const getAllFoodEstateAllProvinces = async() => {
    try{
        const response = await apiClient.get('/foodestate?sub_kategori=All')
        return response.data
    } catch (error){
        console.error("error fetching data: ", error)
        throw error
    }
} 

export const getAllFoodEstateByProvinceIdAndYear = async(province_id, year = 2024) => {
    try{
        const response = await apiClient.get(`/getpie?year=${year}&provinsi_id=${province_id}`)
        return response.data
    } catch (error) {
        console.error("error fetching data: ", error)
        throw error
    }
}