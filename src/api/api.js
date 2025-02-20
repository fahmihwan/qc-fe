import axios from 'axios';

import Cookies from 'js-cookie';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BE_URL + '/api',
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});


apiClient.interceptors.request.use(
    async (config) => {

        const token = Cookies.get('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {

            localStorage.clear();
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            Cookies.remove('token');
            Cookies.remove('_csrf');
            Cookies.remove('user_id');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default apiClient